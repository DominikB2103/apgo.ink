import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const outputRoot = path.resolve(outIndex >= 0 ? args[outIndex + 1] : ".");
const projectRoot = path.resolve(".");
const bitcoin = "bc1q2wqpdzhgc90jn0r797yxv62pcnr06d2s0nlv8h";
const publishedDate = "2026-07-20";
const displayDate = "20 July 2026";

const templateNames = [
  "document",
  "header",
  "football-header",
  "footer",
  "article",
  "home",
  "journal",
  "football",
  "policy",
  "support",
  "404"
];

const templates = {};
for (const name of templateNames) {
  templates[name] = await readFile(path.join(projectRoot, "templates", name + ".html"), "utf8");
}

const articles = JSON.parse(await readFile(path.join(projectRoot, "content", "articles.json"), "utf8"));
for (const article of articles) {
  article.body = await readFile(path.join(projectRoot, article.bodyFile), "utf8");
}

function render(template, values) {
  let output = template;
  for (const [key, value] of Object.entries(values)) {
    output = output.replaceAll("{{" + key + "}}", String(value));
  }
  return output;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function routeFor(article) {
  return article.product === "football"
    ? "/football/articles/" + article.slug + "/"
    : "/articles/" + article.slug + "/";
}

function sectionKey(article) {
  return article.section.toLowerCase().replaceAll("&", "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function head(meta) {
  const lines = [
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="description" content="' + escapeHtml(meta.description) + '">',
    '  <meta name="theme-color" content="' + (meta.product === "football" ? "#0d1713" : "#ffffff") + '">',
    '  <title>' + escapeHtml(meta.title) + '</title>',
    '  <link rel="canonical" href="' + meta.canonical + '">',
    '  <link rel="alternate" type="application/rss+xml" title="APGO Journal" href="/feed.xml">',
    '  <meta property="og:title" content="' + escapeHtml(meta.title) + '">',
    '  <meta property="og:description" content="' + escapeHtml(meta.description) + '">',
    '  <meta property="og:type" content="' + (meta.article ? "article" : "website") + '">',
    '  <meta property="og:url" content="' + meta.canonical + '">',
    '  <meta property="og:image" content="' + (meta.image || "https://apgo.ink/assets/images/social-card.webp") + '">',
    '  <meta name="twitter:card" content="summary_large_image">',
    '  <link rel="preconnect" href="https://fonts.googleapis.com">',
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&display=swap" rel="stylesheet">',
    '  <link rel="stylesheet" href="/assets/css/site.css">'
  ];

  if (meta.article) {
    lines.push('  <meta property="article:published_time" content="' + meta.article.date + '">');
    lines.push('  <meta property="article:section" content="' + escapeHtml(meta.article.section) + '">');
    const structured = {
      "@context": "https://schema.org",
      "@type": meta.article.schemaType || "Article",
      headline: meta.article.headline,
      description: meta.article.dek,
      datePublished: meta.article.date,
      dateModified: meta.article.updatedDate || meta.article.date,
      author: { "@type": "Organization", name: meta.article.author },
      publisher: { "@type": "Organization", name: "APGO", url: "https://apgo.ink/" },
      image: ["https://apgo.ink" + meta.article.image],
      mainEntityOfPage: meta.canonical,
      articleSection: meta.article.section
    };
    lines.push('  <script type="application/ld+json">' + JSON.stringify(structured) + '</script>');
  }
  return lines.join("\n");
}

function headerFor(product) {
  return product === "football" ? templates["football-header"] : templates.header;
}

function documentPage(meta, body, product) {
  return render(templates.document, {
    HEAD: head(meta),
    PRODUCT: product || "journal",
    PROGRESS: meta.article ? '  <span class="reading-progress" data-reading-progress aria-hidden="true"></span>' : "",
    HEADER: headerFor(product),
    BODY: body,
    FOOTER: templates.footer
  });
}

function sourceList(article) {
  return article.sources.map(function (source) {
    const note = source.note ? " — " + escapeHtml(source.note) : "";
    return '<li><a href="' + source.url + '" rel="noopener">' + escapeHtml(source.name) + "</a>" + note + "</li>";
  }).join("");
}

function card(article, options = {}) {
  const url = routeFor(article);
  const image = options.image === false ? "" :
    '<a class="story-card__image" href="' + url + '" tabindex="-1" aria-hidden="true"><img src="' + article.image + '" width="768" height="432" loading="lazy" alt=""></a>';
  const footballClass = article.product === "football" ? " kicker--football" : "";
  return '<article class="story-card" data-story-card data-section="' + sectionKey(article) + '">' +
    image +
    '<span class="kicker' + footballClass + '">' + escapeHtml(article.section) + " · " + escapeHtml(article.type) + "</span>" +
    '<h3 class="headline story-card__headline"><a href="' + url + '">' + escapeHtml(article.headline) + "</a></h3>" +
    '<p class="dek story-card__dek">' + escapeHtml(article.dek) + "</p>" +
    '<p class="meta story-card__meta">' + escapeHtml(article.author) + " · " + escapeHtml(article.readTime) + "</p>" +
    "</article>";
}

function lead(article) {
  return '<article class="lead-story">' +
    '<a class="lead-story__image" href="' + routeFor(article) + '"><img src="' + article.image + '" width="1536" height="864" alt="' + escapeHtml(article.imageAlt) + '" fetchpriority="high"></a>' +
    '<span class="kicker">' + escapeHtml(article.section) + " · " + escapeHtml(article.type) + "</span>" +
    '<h1 class="headline lead-story__headline"><a href="' + routeFor(article) + '">' + escapeHtml(article.headline) + "</a></h1>" +
    '<p class="dek lead-story__dek">' + escapeHtml(article.dek) + "</p>" +
    '<p class="meta lead-story__meta">' + escapeHtml(article.author) + " · " + escapeHtml(article.readTime) + " · " + displayDate + "</p>" +
    "</article>";
}

function compactCard(article) {
  const footballClass = article.product === "football" ? " kicker--football" : "";
  return '<article class="story-card"><span class="kicker' + footballClass + '">' + escapeHtml(article.section) + "</span>" +
    '<h2 class="headline story-card__headline"><a href="' + routeFor(article) + '">' + escapeHtml(article.headline) + "</a></h2>" +
    '<p class="dek story-card__dek">' + escapeHtml(article.dek) + "</p>" +
    '<p class="meta story-card__meta">' + escapeHtml(article.readTime) + "</p></article>";
}

function briefingItem(article) {
  return '<article class="briefing-item"><span class="briefing-item__section">' + escapeHtml(article.section) + '</span><h3 class="briefing-item__headline"><a href="' + routeFor(article) + '">' + escapeHtml(article.headline) + "</a></h3></article>";
}

function relatedArticles(article) {
  const pool = articles.filter(function (item) {
    return item.slug !== article.slug && item.product === article.product;
  });
  return pool.slice(0, 3).map(function (item) { return card(item, { image: false }); }).join("");
}

async function write(relativePath, content) {
  const target = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
}

for (const article of articles) {
  const articleBody = render(templates.article, {
    KICKER_CLASS: article.product === "football" ? "kicker--football" : "",
    SECTION: escapeHtml(article.section),
    TYPE: escapeHtml(article.type),
    HEADLINE: escapeHtml(article.headline),
    DEK: escapeHtml(article.dek),
    AUTHOR: escapeHtml(article.author),
    DATE: article.date,
    DISPLAY_DATE: escapeHtml(article.displayDate),
    READ_TIME: escapeHtml(article.readTime),
    UPDATED: escapeHtml(article.updated),
    IMAGE: article.image,
    IMAGE_ALT: escapeHtml(article.imageAlt),
    IMAGE_CAPTION: escapeHtml(article.imageCaption),
    IMAGE_CREDIT: escapeHtml(article.imageCredit),
    ARTICLE_BODY: article.body,
    SOURCES: sourceList(article),
    RELATED: relatedArticles(article)
  });
  const route = routeFor(article);
  const outputPath = route.replace(/^\//, "") + "index.html";
  const canonical = "https://apgo.ink" + route;
  await write(outputPath, documentPage({
    title: article.headline + " — APGO",
    description: article.dek,
    canonical,
    image: "https://apgo.ink" + article.image,
    article,
    product: article.product
  }, articleBody, article.product));
}

const journalArticles = articles.filter(function (article) { return article.product === "journal"; });
const footballArticles = articles.filter(function (article) { return article.product === "football"; });
const ordered = [...articles].sort(function (a, b) { return a.featureRank - b.featureRank; });
const leadArticle = ordered.find(function (article) { return article.product === "journal"; });
const topStack = ordered.filter(function (article) { return article.slug !== leadArticle.slug && article.product === "journal"; }).slice(0, 3);
const editionGrid = ordered.filter(function (article) { return article.product === "journal" && article.slug !== leadArticle.slug; }).slice(0, 6);

const homeBody = render(templates.home, {
  LATEST_URL: routeFor(leadArticle),
  LATEST_HEADLINE: escapeHtml(leadArticle.headline),
  LEAD: lead(leadArticle),
  TOP_STACK: topStack.map(compactCard).join(""),
  EDITION_GRID: editionGrid.map(card).join(""),
  BRIEFING: journalArticles.map(briefingItem).join(""),
  RAIL: ordered.slice(0, 6).map(function (article) { return '<li><a href="' + routeFor(article) + '">' + escapeHtml(article.headline) + "</a></li>"; }).join(""),
  FOOTBALL_GRID: footballArticles.map(card).join("")
});

await write("index.html", documentPage({
  title: "APGO — World affairs, economics, technology and ideas",
  description: "APGO is an independent modern journal covering geopolitics, economics, technology, history and ideas, with a separate football analysis and rankings product.",
  canonical: "https://apgo.ink/",
  image: "https://apgo.ink" + leadArticle.image
}, homeBody, "journal"));

const sections = [...new Set(journalArticles.map(function (article) { return article.section; }))];
const filters = ['<button class="filter-button" type="button" data-section-filter="all" aria-pressed="true">All</button>']
  .concat(sections.map(function (section) {
    return '<button class="filter-button" type="button" data-section-filter="' + section.toLowerCase().replaceAll("&", "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + '" aria-pressed="false">' + escapeHtml(section) + "</button>";
  })).join("");

await write("journal/index.html", documentPage({
  title: "APGO Journal — Latest analysis",
  description: "The latest APGO analysis across world affairs, economics, technology, history and ideas.",
  canonical: "https://apgo.ink/journal/",
  image: "https://apgo.ink" + leadArticle.image
}, render(templates.journal, {
  FILTERS: filters,
  STORIES: journalArticles.map(card).join("")
}), "journal"));

await write("football/index.html", documentPage({
  title: "APGO Football — World Cup analysis and transparent player rankings",
  description: "A separate APGO product for World Cup analysis, player evaluation and a transparent global player ranking model.",
  canonical: "https://apgo.ink/football/",
  image: "https://apgo.ink" + footballArticles[0].image,
  product: "football"
}, render(templates.football, {
  FOOTBALL_STORIES: footballArticles.map(card).join("")
}), "football"));

const policies = [
  {
    file: "about.html",
    eyebrow: "About APGO",
    title: "A publication built around evidence, not posture.",
    intro: "APGO covers power, markets, technology, history and football with a clear line between verified fact and analysis.",
    body: '<p>APGO is an independent, early-stage publication. The Journal covers world affairs, economics, technology, history and ideas. APGO Football is a separate product for tournament analysis, player evaluation and a transparent ranking model.</p><h2>What we publish</h2><p>Edition 002 contains eight sourced articles. We prioritize primary documents, official statistics, archival material and research papers. Analysis is labelled and uncertainty remains visible.</p><h2>What we do not claim</h2><p>APGO is not yet a full newsroom. It does not operate subscriber accounts, a confidential tip system or a live player ranking. Those services will only be announced after they actually exist and have been tested.</p><h2>Funding</h2><p>Reader support pays for research, data, design and infrastructure. It does not buy coverage, removal, access to drafts or a preferred ranking.</p>'
  },
  {
    file: "standards.html",
    eyebrow: "Editorial standards",
    title: "Facts first. Methods visible.",
    intro: "Professionalism is a repeatable process: label the work, show the evidence, correct the record and disclose the limits.",
    body: '<h2>Labels</h2><p>Reporting, analysis, evidence notes, essays and methodology are different forms. Every article states what kind of work it is.</p><h2>Sources</h2><p>APGO links directly to primary documents, official data, research papers and original texts whenever practical. Government and belligerent claims are attributed as claims; they are not treated as independent verification.</p><h2>Corrections</h2><p>Material factual errors are corrected in the article and recorded on the <a href="/corrections.html">corrections page</a>. Method changes receive a new version and an explanation.</p><h2>Images and generative tools</h2><p>APGO may use art-directed visuals created or substantially assisted by generative tools. They are labelled as editorial visuals, never presented as documentary photographs and never used as evidence of an event. Documentary imagery, when used, requires provenance and an accurate caption.</p><h2>Conflicts and funding</h2><p>Relevant financial or institutional conflicts are disclosed with the work. Reader funding creates no editorial right.</p>'
  },
  {
    file: "corrections.html",
    eyebrow: "Corrections",
    title: "The record should show what changed.",
    intro: "Material corrections remain visible. Silent fixes are reserved for typography and formatting.",
    body: '<p>As of <time datetime="2026-07-20">20 July 2026</time>, Edition 002 has no logged material corrections.</p><h2>Report an error</h2><p>Open a public issue in the <a href="https://github.com/DominikB2103/apgo.ink/issues">APGO repository</a>. Include the article URL, disputed passage and strongest available source.</p><h2>Review process</h2><p>APGO distinguishes factual error from disagreement over interpretation, checks the original material and adds a dated note when a substantive change is required.</p>'
  },
  {
    file: "contact.html",
    eyebrow: "Contact",
    title: "Use a channel that actually exists.",
    intro: "APGO currently handles corrections, technical reports and project contributions in public.",
    body: '<h2>Corrections and site issues</h2><p>Use <a href="https://github.com/DominikB2103/apgo.ink/issues">GitHub Issues</a> and include the relevant URL and evidence.</p><h2>Football methodology</h2><p>Analysts, data specialists and researchers can use the same repository to critique the ranking proposal and its assumptions.</p><h2>No secure tip channel</h2><p>APGO does not currently operate a secure source channel. Do not submit confidential or identifying material through GitHub. A secure option will only be published after it is configured and tested.</p>'
  },
  {
    file: "privacy.html",
    eyebrow: "Privacy",
    title: "A static site with a limited data footprint.",
    intro: "APGO does not operate advertising, reader accounts, comments, payments or newsletter storage on this site.",
    body: '<h2>Browser storage</h2><p>The theme control stores a light-or-dark preference in your browser using localStorage. Copy buttons use the clipboard only when activated.</p><h2>Hosting and fonts</h2><p>The site is delivered through GitHub Pages and related network infrastructure, which may process routine request logs under their own policies. Pages request typefaces from Google Fonts.</p><h2>Bitcoin</h2><p>Bitcoin transactions are public. APGO does not request donor identity here, but a transfer may be linkable through a wallet or exchange.</p><h2>Changes</h2><p>This notice will be updated before APGO launches any feature that collects personal information. Last reviewed 20 July 2026.</p>'
  }
];

for (const policy of policies) {
  const body = render(templates.policy, {
    EYEBROW: policy.eyebrow,
    TITLE: policy.title,
    INTRO: policy.intro,
    POLICY_BODY: policy.body
  });
  await write(policy.file, documentPage({
    title: policy.title + " — APGO",
    description: policy.intro,
    canonical: "https://apgo.ink/" + policy.file
  }, body, "journal"));
}

await write("support.html", documentPage({
  title: "Support APGO — Reader funding",
  description: "Support APGO's independent reporting, research and public-interest products with Bitcoin.",
  canonical: "https://apgo.ink/support.html"
}, render(templates.support, { BITCOIN: bitcoin }), "journal"));

await write("404.html", documentPage({
  title: "Page not found — APGO",
  description: "The requested page was not found.",
  canonical: "https://apgo.ink/404.html"
}, templates["404"], "journal"));

const feedItems = articles.map(function (article) {
  const url = "https://apgo.ink" + routeFor(article);
  return [
    "    <item>",
    "      <title>" + escapeHtml(article.headline) + "</title>",
    "      <link>" + url + "</link>",
    "      <guid isPermaLink=\"true\">" + url + "</guid>",
    "      <pubDate>Mon, 20 Jul 2026 00:00:00 GMT</pubDate>",
    "      <category>" + escapeHtml(article.section) + "</category>",
    "      <description>" + escapeHtml(article.dek) + "</description>",
    "    </item>"
  ].join("\n");
}).join("\n");

const feed = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  "  <channel>",
  "    <title>APGO Journal</title>",
  "    <link>https://apgo.ink/</link>",
  "    <description>World affairs, economics, technology, history, ideas and football analysis.</description>",
  "    <language>en</language>",
  "    <lastBuildDate>Mon, 20 Jul 2026 00:00:00 GMT</lastBuildDate>",
  '    <atom:link href="https://apgo.ink/feed.xml" rel="self" type="application/rss+xml"/>',
  feedItems,
  "  </channel>",
  "</rss>",
  ""
].join("\n");
await write("feed.xml", feed);

const sitemapRoutes = [
  "/",
  "/journal/",
  "/football/",
  "/about.html",
  "/standards.html",
  "/corrections.html",
  "/contact.html",
  "/privacy.html",
  "/support.html"
].concat(articles.map(routeFor));

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapRoutes.map(function (route) {
    return "  <url><loc>https://apgo.ink" + route + "</loc><lastmod>" + publishedDate + "</lastmod></url>";
  }).join("\n"),
  "</urlset>",
  ""
].join("\n");
await write("sitemap.xml", sitemap);
await write("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: https://apgo.ink/sitemap.xml\n");
await write("CNAME", "apgo.ink\n");
await write(".nojekyll", "");

console.log("Built " + articles.length + " articles and core APGO pages in " + outputRoot);
