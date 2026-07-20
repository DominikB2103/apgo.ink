import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

function fail(file, message) {
  failures.push(`${path.relative(root, file)}: ${message}`);
}

function stripQueryAndHash(url) {
  return url.split("#", 1)[0].split("?", 1)[0];
}

async function verifyInternalReference(file, url) {
  if (!url || /^(https?:|mailto:|tel:|bitcoin:|data:|javascript:|#)/.test(url)) return;
  const cleaned = stripQueryAndHash(url);
  if (!cleaned) return;
  const relative = cleaned.startsWith("/") ? cleaned.slice(1) : path.join(path.relative(root, path.dirname(file)), cleaned);
  const target = path.join(root, relative);
  const resolved = cleaned.endsWith("/") ? path.join(target, "index.html") : target;
  try {
    await access(resolved);
  } catch {
    fail(file, `broken internal reference ${url}`);
  }
}

const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html") && !file.includes(`${path.sep}templates${path.sep}`) && !file.includes(`${path.sep}content${path.sep}`));
const titles = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const redirectPage = /<meta http-equiv="refresh"/i.test(html);
  if (redirectPage) {
    if (!/<link rel="canonical" href="https:\/\/apgo\.ink\/journal\/">/.test(html)) fail(file, "legacy redirect has the wrong canonical URL");
    continue;
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) fail(file, "missing title");
  else if (titles.has(title)) fail(file, `duplicate title also used by ${path.relative(root, titles.get(title))}`);
  else titles.set(title, file);

  if (!/<meta name="description" content="[^"]+">/.test(html)) fail(file, "missing description");
  if (!/<link rel="canonical" href="https:\/\/apgo\.ink\/[^"]*">/.test(html)) fail(file, "missing or invalid canonical URL");
  if (!/<main id="main"/.test(html)) fail(file, "missing main landmark");
  if (!/<h1(?:\s|>)/.test(html)) fail(file, "missing h1");
  if (/\{\{[A-Z0-9_]+\}\}/.test(html)) fail(file, "contains an unresolved template token");

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) fail(file, `duplicate ids: ${[...new Set(duplicateIds)].join(", ")}`);

  for (const image of html.matchAll(/<img\b([^>]+)>/g)) {
    if (!/\salt="[^"]*"/.test(image[1])) fail(file, "image missing alt attribute");
    const src = image[1].match(/\ssrc="([^"]+)"/)?.[1];
    if (src) await verifyInternalReference(file, src);
  }

  for (const match of html.matchAll(/<(?:a|link|script)\b[^>]+(?:href|src)="([^"]+)"/g)) {
    await verifyInternalReference(file, match[1]);
  }

  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(block[1]); } catch { fail(file, "invalid JSON-LD"); }
  }

  const lowered = html.toLowerCase();
  for (const banned of ["lorem ipsum", "meridian", "subscribe now", "sign in"]) {
    if (lowered.includes(banned)) fail(file, `contains banned legacy or placeholder phrase: ${banned}`);
  }
}

const site = JSON.parse(await readFile(path.join(root, "content", "site.json"), "utf8"));
for (const field of ["edition", "publishedDate", "displayDate", "rssDate", "copyrightYear"]) {
  if (typeof site[field] !== "string" || !site[field].trim()) failures.push(`content/site.json: missing ${field}`);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(site.publishedDate || "")) failures.push("content/site.json: publishedDate must use YYYY-MM-DD");
if (!/^\d{3}$/.test(site.edition || "")) failures.push("content/site.json: edition must be a three-digit string");

const articleData = JSON.parse(await readFile(path.join(root, "content", "articles.json"), "utf8"));
const articles = Array.isArray(articleData) ? articleData : [];
const supportedProducts = new Set(["journal", "football"]);
const supportedStatuses = new Set(["draft", "published"]);
const supportedSchemaTypes = new Set(["Article", "NewsArticle"]);
const requiredStringFields = [
  "slug", "product", "status", "edition", "section", "type", "headline", "dek", "author", "date", "displayDate",
  "readTime", "schemaType", "image", "imageAlt", "imageCaption", "imageCredit", "bodyFile"
];
const seenSlugs = new Set();
const publishedArticles = articles.filter((article) => article && article.status === "published");
const currentEditionArticles = publishedArticles.filter((article) => article.edition === site.edition);

if (!Array.isArray(articleData)) failures.push("content/articles.json: top-level value must be an array");
if (articles.length < 1) failures.push("content/articles.json: expected at least one article");
for (const product of supportedProducts) {
  if (!publishedArticles.some((article) => article.product === product)) failures.push(`content/articles.json: expected at least one published ${product} article`);
}
if (!currentEditionArticles.some((article) => article.product === "journal")) failures.push(`content/articles.json: edition ${site.edition} requires a published Journal article`);

function plainText(value) {
  return String(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function lintManufacturedProse(label, value) {
  const text = plainText(value);
  if (/\bnot\s+(?:just|simply|merely|only)\b/i.test(text)) {
    failures.push(`${label}: contains a manufactured contrast ("not just/simply/merely/only")`);
  }
  if (/\bnot\b(?:(?![.!?]).){1,80}\bbut\b/i.test(text)) {
    failures.push(`${label}: contains a "not … but …" contrast`);
  }
  if (/\b(?:it|this|that)\s+(?:is|was)\s+not\b(?:(?![.!?]).){1,80}[;—:]\s*(?:it|this|that)\s+(?:is|was)\b/i.test(text)) {
    failures.push(`${label}: contains an “it is not …; it is …” contrast`);
  }
  if (/\bAPGO\b[^.!?\n]{0,40}\bDesk\b/i.test(text)) {
    failures.push(`${label}: uses an unsupported APGO desk byline`);
  }
  if (/\bToday['’]s lead\b/i.test(text)) {
    failures.push(`${label}: contains the stale phrase “Today’s lead”`);
  }
}

for (const article of articles) {
  if (!article || typeof article !== "object" || Array.isArray(article)) {
    failures.push("content/articles.json: every article must be an object");
    continue;
  }
  const label = `content/articles.json: ${article.slug || "article with no slug"}`;
  for (const field of requiredStringFields) {
    if (typeof article[field] !== "string" || !article[field].trim()) failures.push(`${label} is missing ${field}`);
  }
  if (!/^[-a-z0-9]+$/.test(article.slug || "")) failures.push(`${label} has an invalid slug`);
  if (seenSlugs.has(article.slug)) failures.push(`${label} duplicates an existing slug`);
  seenSlugs.add(article.slug);
  if (!supportedProducts.has(article.product)) failures.push(`${label} has unsupported product ${article.product}`);
  if (!supportedStatuses.has(article.status)) failures.push(`${label} has unsupported status ${article.status}`);
  if (!/^\d{3}$/.test(article.edition || "")) failures.push(`${label} edition must be a three-digit string`);
  if (!supportedSchemaTypes.has(article.schemaType)) failures.push(`${label} has unsupported schemaType ${article.schemaType}`);
  if (!Number.isInteger(article.featureRank) || article.featureRank < 1) failures.push(`${label} requires a positive integer featureRank`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.date || "")) failures.push(`${label} date must use YYYY-MM-DD`);
  if (article.updatedDate && !/^\d{4}-\d{2}-\d{2}$/.test(article.updatedDate)) failures.push(`${label} updatedDate must use YYYY-MM-DD`);
  if (!Array.isArray(article.sources) || article.sources.length < 2) failures.push(`${label} requires at least two public sources`);
  for (const [index, source] of (Array.isArray(article.sources) ? article.sources : []).entries()) {
    if (!source || typeof source !== "object") {
      failures.push(`${label} source ${index + 1} must be an object`);
      continue;
    }
    if (typeof source.name !== "string" || !source.name.trim()) failures.push(`${label} source ${index + 1} is missing a name`);
    if (typeof source.url !== "string") {
      failures.push(`${label} source ${index + 1} requires an HTTPS URL`);
    } else {
      try {
        const sourceUrl = new URL(source.url);
        if (sourceUrl.protocol !== "https:") failures.push(`${label} source ${index + 1} requires an HTTPS URL`);
      } catch {
        failures.push(`${label} source ${index + 1} has an invalid URL`);
      }
    }
  }

  lintManufacturedProse(`${label} headline`, article.headline || "");
  lintManufacturedProse(`${label} dek`, article.dek || "");
  const summaryDashes = ((article.headline || "").match(/—/g) || []).length + ((article.dek || "").match(/—/g) || []).length;
  if (summaryDashes > 1) failures.push(`${label} headline and dek use ${summaryDashes} em dashes; maximum is 1`);

  if (typeof article.bodyFile !== "string" || !article.bodyFile) continue;
  let body;
  try {
    body = await readFile(path.join(root, article.bodyFile), "utf8");
  } catch {
    failures.push(`${label} references a missing body file: ${article.bodyFile}`);
    continue;
  }
  const bodyText = plainText(body);
  const words = bodyText.split(/\s+/).filter(Boolean).length;
  if (words < 650) failures.push(`${article.bodyFile}: expected at least 650 words, found ${words}`);
  if ((body.match(/<h2\b/g) || []).length < 2) failures.push(`${article.bodyFile}: expected at least two section headings`);
  lintManufacturedProse(article.bodyFile, bodyText);
  const bodyDashes = (bodyText.match(/—/g) || []).length;
  const allowedBodyDashes = Math.max(2, Math.ceil(words / 400));
  if (bodyDashes > allowedBodyDashes) failures.push(`${article.bodyFile}: uses ${bodyDashes} em dashes; maximum for this length is ${allowedBodyDashes}`);
  await verifyInternalReference(path.join(root, article.bodyFile), article.image);
}

function publicRouteFor(article) {
  return article.product === "football"
    ? `/football/articles/${article.slug}/`
    : `/articles/${article.slug}/`;
}

function generatedPathFor(article) {
  return article.product === "football"
    ? path.resolve(root, "football", "articles", article.slug, "index.html")
    : path.resolve(root, "articles", article.slug, "index.html");
}

const expectedArticlePages = new Set(publishedArticles.map(generatedPathFor));
const journalOutputRoot = path.resolve(root, "articles") + path.sep;
const footballOutputRoot = path.resolve(root, "football", "articles") + path.sep;
const generatedArticlePages = htmlFiles.filter((file) => file.startsWith(journalOutputRoot) || file.startsWith(footballOutputRoot));

for (const file of generatedArticlePages) {
  if (!expectedArticlePages.has(path.resolve(file))) fail(file, "orphan generated article page; remove it or restore its published registry entry");
}
for (const file of expectedArticlePages) {
  try {
    await access(file);
  } catch {
    fail(file, "missing generated page for a published article");
  }
}

const searchIndexFile = path.join(root, "search-index.json");
try {
  const searchIndex = JSON.parse(await readFile(searchIndexFile, "utf8"));
  if (!Array.isArray(searchIndex)) {
    fail(searchIndexFile, "top-level value must be an array");
  } else {
    const expectedRoutes = new Set(publishedArticles.map(publicRouteFor));
    const indexedRoutes = new Set();
    for (const [index, item] of searchIndex.entries()) {
      if (!item || typeof item !== "object") {
        fail(searchIndexFile, `entry ${index + 1} must be an object`);
        continue;
      }
      for (const field of ["url", "section", "type", "headline", "dek"]) {
        if (typeof item[field] !== "string" || !item[field].trim()) fail(searchIndexFile, `entry ${index + 1} is missing ${field}`);
      }
      if (indexedRoutes.has(item.url)) fail(searchIndexFile, `duplicate route ${item.url}`);
      indexedRoutes.add(item.url);
    }
    for (const route of expectedRoutes) {
      if (!indexedRoutes.has(route)) fail(searchIndexFile, `missing published article ${route}`);
    }
    for (const route of indexedRoutes) {
      if (!expectedRoutes.has(route)) fail(searchIndexFile, `contains unpublished or unknown article ${route}`);
    }
  }
} catch {
  fail(searchIndexFile, "missing or invalid generated search index");
}

const editorialSourceFiles = files.filter((file) =>
  file.endsWith(".html") && file.includes(`${path.sep}templates${path.sep}`)
).concat(path.join(root, "scripts", "build.mjs"));
for (const file of editorialSourceFiles) {
  const source = await readFile(file, "utf8");
  if (/\bToday['’]s lead\b/i.test(source)) fail(file, "contains the stale phrase “Today’s lead”");
  lintManufacturedProse(path.relative(root, file), source);
}

const support = await readFile(path.join(root, "support.html"), "utf8");
const bitcoin = "bc1q2wqpdzhgc90jn0r797yxv62pcnr06d2s0nlv8h";
if ((support.match(new RegExp(bitcoin, "g")) || []).length < 2) failures.push("support.html: Bitcoin address missing from visible or copyable UI");

for (const required of ["CNAME", ".nojekyll", "feed.xml", "search-index.json", "sitemap.xml", "robots.txt", "404.html", "projects/index.html", "assets/favicon.svg", "assets/images/bitcoin-donation-qr.svg"]) {
  try { await access(path.join(root, required)); } catch { failures.push(`${required}: missing required deployment file`); }
}

if (failures.length) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} pages, ${publishedArticles.length} published articles and all local references.`);
