import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { formatterFactory, HtmlValidate } from "html-validate";
import { SaxesParser } from "saxes";

const root = path.resolve(".");
const excludedDirectories = new Set([".git", "content", "node_modules", "templates"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

function increment(map, key) {
  map.set(key, (map.get(key) || 0) + 1);
}

async function inspectXml(relativeFile) {
  const source = await readFile(path.join(root, relativeFile), "utf8");
  const errors = [];
  const paths = new Map();
  const stack = [];
  let rootElement;

  const parser = new SaxesParser({ xmlns: true, fileName: relativeFile });
  parser.on("error", (error) => errors.push(error.message));
  parser.on("opentag", (tag) => {
    if (!rootElement) rootElement = { local: tag.local, uri: tag.uri };
    stack.push(tag.name);
    increment(paths, stack.join("/"));
  });
  parser.on("closetag", () => stack.pop());

  try {
    parser.write(source).close();
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  return { errors, paths, rootElement };
}

function count(document, elementPath) {
  return document.paths.get(elementPath) || 0;
}

function requireCount(document, relativeFile, elementPath, expected, errors) {
  const actual = count(document, elementPath);
  if (actual !== expected) {
    errors.push(`${relativeFile}: expected ${expected} <${elementPath.split("/").at(-1)}> element(s), found ${actual}`);
  }
}

async function validateXml() {
  const errors = [];
  const feed = await inspectXml("feed.xml");
  errors.push(...feed.errors.map((error) => `feed.xml: ${error}`));
  if (feed.rootElement?.local !== "rss") errors.push("feed.xml: root element must be <rss>");
  requireCount(feed, "feed.xml", "rss/channel", 1, errors);
  for (const element of ["title", "link", "description", "language", "lastBuildDate"]) {
    requireCount(feed, "feed.xml", `rss/channel/${element}`, 1, errors);
  }
  const itemCount = count(feed, "rss/channel/item");
  if (itemCount < 1) errors.push("feed.xml: expected at least one <item>");
  for (const element of ["title", "link", "guid", "pubDate", "description"]) {
    requireCount(feed, "feed.xml", `rss/channel/item/${element}`, itemCount, errors);
  }

  const sitemap = await inspectXml("sitemap.xml");
  errors.push(...sitemap.errors.map((error) => `sitemap.xml: ${error}`));
  if (sitemap.rootElement?.local !== "urlset") errors.push("sitemap.xml: root element must be <urlset>");
  if (sitemap.rootElement?.uri !== "http://www.sitemaps.org/schemas/sitemap/0.9") {
    errors.push("sitemap.xml: <urlset> must use the sitemap 0.9 namespace");
  }
  const urlCount = count(sitemap, "urlset/url");
  if (urlCount < 1) errors.push("sitemap.xml: expected at least one <url>");
  requireCount(sitemap, "sitemap.xml", "urlset/url/loc", urlCount, errors);
  requireCount(sitemap, "sitemap.xml", "urlset/url/lastmod", urlCount, errors);

  return errors;
}

const files = await walk(root);
const htmlFiles = [];
for (const file of files.filter((candidate) => candidate.endsWith(".html"))) {
  const source = await readFile(file, "utf8");
  if (!/<meta\b[^>]*http-equiv=["']refresh["']/i.test(source)) {
    htmlFiles.push(path.relative(root, file));
  }
}

if (htmlFiles.length === 0) throw new Error("No generated, non-redirect HTML files found");

const config = JSON.parse(await readFile(path.join(root, ".htmlvalidate.json"), "utf8"));
const validator = new HtmlValidate(config);
const report = await validator.validateMultipleFiles(htmlFiles);
const xmlErrors = await validateXml();

if (!report.valid) {
  const formatter = formatterFactory("stylish");
  process.stderr.write(formatter(report.results));
}
if (xmlErrors.length) {
  process.stderr.write(`${xmlErrors.join("\n")}\n`);
}
if (!report.valid || xmlErrors.length) process.exit(1);

console.log(`Validated ${htmlFiles.length} generated HTML pages, feed.xml and sitemap.xml.`);
