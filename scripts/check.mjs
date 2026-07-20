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
  if (!url || /^(https?:|mailto:|tel:|data:|javascript:|#)/.test(url)) return;
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
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) fail(file, "missing title");
  else if (titles.has(title)) fail(file, `duplicate title also used by ${path.relative(root, titles.get(title))}`);
  else titles.set(title, file);

  if (!/<meta name="description" content="[^"]+">/.test(html)) fail(file, "missing description");
  if (!/<link rel="canonical" href="https:\/\/apgo\.ink\/[^"]*">/.test(html)) fail(file, "missing or invalid canonical URL");
  if (!/<main id="main"/.test(html)) fail(file, "missing main landmark");
  if (!/<h1(?:\s|>)/.test(html)) fail(file, "missing h1");

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

const articles = JSON.parse(await readFile(path.join(root, "content", "articles.json"), "utf8"));
if (articles.length !== 8) failures.push(`content/articles.json: expected 8 articles, found ${articles.length}`);
if (articles.filter((article) => article.product === "football").length !== 2) failures.push("content/articles.json: expected exactly 2 Football articles");
if (articles.filter((article) => article.product === "journal").length !== 6) failures.push("content/articles.json: expected exactly 6 Journal articles");

for (const article of articles) {
  if (article.sources.length < 6) failures.push(`content/articles.json: ${article.slug} has fewer than 6 sources`);
  const body = await readFile(path.join(root, article.bodyFile), "utf8");
  const words = body.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  if (words < 800) failures.push(`${article.bodyFile}: expected at least 800 words, found ${words}`);
  if ((body.match(/<h2\b/g) || []).length < 2) failures.push(`${article.bodyFile}: expected at least two section headings`);
  await verifyInternalReference(path.join(root, article.bodyFile), article.image);
}

const support = await readFile(path.join(root, "support.html"), "utf8");
const bitcoin = "bc1q2wqpdzhgc90jn0r797yxv62pcnr06d2s0nlv8h";
if ((support.match(new RegExp(bitcoin, "g")) || []).length < 2) failures.push("support.html: Bitcoin address missing from visible or copyable UI");

for (const required of ["CNAME", ".nojekyll", "feed.xml", "sitemap.xml", "robots.txt", "404.html"]) {
  try { await access(path.join(root, required)); } catch { failures.push(`${required}: missing required deployment file`); }
}

if (failures.length) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} pages, ${articles.length} articles and all local references.`);
