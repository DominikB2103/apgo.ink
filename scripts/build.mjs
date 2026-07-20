import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const outputRoot = path.resolve(outIndex >= 0 ? args[outIndex + 1] : ".");
const projectRoot = path.resolve(".");
const bitcoin = "bc1q2wqpdzhgc90jn0r797yxv62pcnr06d2s0nlv8h";
const site = JSON.parse(await readFile(path.join(projectRoot, "content", "site.json"), "utf8"));
const publishedDate = site.publishedDate;
const displayDate = site.displayDate;

const templateNames = [
  "document",
  "header",
  "football-header",
  "footer",
  "article",
  "home",
  "journal",
  "football",
  "projects",
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

const publishedArticles = articles.filter(function (article) { return article.status === "published"; });
const currentEditionArticles = publishedArticles.filter(function (article) { return article.edition === site.edition; });
const journalArticleCount = currentEditionArticles.filter(function (article) { return article.product === "journal"; }).length;
const footballArticleCount = currentEditionArticles.filter(function (article) { return article.product === "football"; }).length;

if (!journalArticleCount) throw new Error("The current edition requires at least one published Journal article.");
if (!publishedArticles.some(function (article) { return article.product === "football"; })) {
  throw new Error("APGO Football requires at least one published article.");
}

const globalValues = {
  EDITION: site.edition,
  PUBLISHED_DATE: site.publishedDate,
  DISPLAY_DATE: site.displayDate,
  COPYRIGHT_YEAR: site.copyrightYear,
  ARTICLE_COUNT: currentEditionArticles.length,
  JOURNAL_COUNT: journalArticleCount,
  FOOTBALL_COUNT: footballArticleCount
};

function render(template, values = {}) {
  let output = template;
  for (const [key, value] of Object.entries(values)) {
    output = output.replaceAll("{{" + key + "}}", String(value));
  }
  for (const [key, value] of Object.entries(globalValues)) {
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

function normalizedHttpsUrl(value, label) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(label + " must be a valid URL.");
  }
  if (url.protocol !== "https:") throw new Error(label + " must use HTTPS.");
  return url.href;
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
    '  <meta name="robots" content="' + escapeHtml(meta.robots || "index,follow,max-image-preview:large") + '">',
    '  <meta name="theme-color" content="' + (meta.product === "football" ? "#0d1713" : "#ffffff") + '">',
    '  <meta name="color-scheme" content="light dark">',
    '  <title>' + escapeHtml(meta.title) + '</title>',
    '  <link rel="canonical" href="' + meta.canonical + '">',
    '  <link rel="alternate" type="application/rss+xml" title="APGO" href="/feed.xml">',
    '  <meta property="og:title" content="' + escapeHtml(meta.socialTitle || meta.title) + '">',
    '  <meta property="og:description" content="' + escapeHtml(meta.description) + '">',
    '  <meta property="og:type" content="' + (meta.article ? "article" : "website") + '">',
    '  <meta property="og:locale" content="en_GB">',
    '  <meta property="og:url" content="' + meta.canonical + '">',
    '  <meta property="og:image" content="' + (meta.image || "https://apgo.ink/assets/images/social-card.webp") + '">',
    '  <meta name="twitter:card" content="summary_large_image">',
    '  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">',
    '  <script>(function(){try{var t=localStorage.getItem("apgo-theme");if(t){document.documentElement.dataset.theme=t}}catch(e){}}())</script>',
    '  <link rel="preconnect" href="https://fonts.googleapis.com">',
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&display=swap" rel="stylesheet">',
    '  <link rel="stylesheet" href="/assets/css/site.css">'
  ];

  if (meta.article) {
    lines.push('  <meta name="author" content="' + escapeHtml(meta.article.author) + '">');
    lines.push('  <meta property="article:published_time" content="' + meta.article.date + '">');
    lines.push('  <meta property="article:modified_time" content="' + (meta.article.updatedDate || meta.article.date) + '">');
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
    FOOTER: templates.footer,
    SEARCH: searchDialog()
  });
}

function searchDialog() {
  return '<dialog class="search-dialog" id="search-dialog" data-search-dialog aria-labelledby="search-title">' +
    '<div class="search-dialog__panel"><div class="search-dialog__head"><div><span class="kicker">APGO archive</span><h2 id="search-title">Search APGO</h2></div><button class="search-dialog__close" type="button" data-search-close aria-label="Close search">Close</button></div>' +
    '<label class="search-dialog__field"><span class="visually-hidden">Search articles</span><input type="search" placeholder="Search by topic, section or headline" autocomplete="off" aria-controls="search-results" aria-describedby="search-status" data-global-search></label>' +
    '<div class="search-dialog__results" id="search-results" data-search-results></div><p class="filter-empty" id="search-status" role="status" aria-live="polite" data-search-status>Loading the archive…</p></div></dialog>';
}

function sourceList(article) {
  return article.sources.map(function (source, index) {
    const href = normalizedHttpsUrl(source.url, article.slug + " source " + (index + 1));
    const note = source.note ? " — " + escapeHtml(source.note) : "";
    return '<li><a href="' + escapeHtml(href) + '" rel="noopener">' + escapeHtml(source.name) + "</a>" + note + "</li>";
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
    '<span class="kicker">' + escapeHtml(article.section) + " · " + escapeHtml(article.type) + "</span>" +
    '<h1 class="headline lead-story__headline"><a href="' + routeFor(article) + '">' + escapeHtml(article.headline) + "</a></h1>" +
    '<p class="dek lead-story__dek">' + escapeHtml(article.dek) + "</p>" +
    '<p class="meta lead-story__meta">' + escapeHtml(article.author) + " · " + escapeHtml(article.readTime) + " · " + displayDate + "</p>" +
    '<div class="lead-story__image"><img src="' + article.image + '" width="1536" height="864" alt="' + escapeHtml(article.imageAlt) + '" fetchpriority="high"></div>' +
    "</article>";
}

function compactCard(article) {
  const footballClass = article.product === "football" ? " kicker--football" : "";
  return '<article class="story-card"><span class="kicker' + footballClass + '">' + escapeHtml(article.section) + "</span>" +
    '<h2 class="headline story-card__headline"><a href="' + routeFor(article) + '">' + escapeHtml(article.headline) + "</a></h2>" +
    '<p class="dek story-card__dek">' + escapeHtml(article.dek) + "</p>" +
    '<p class="meta story-card__meta">' + escapeHtml(article.readTime) + "</p></article>";
}

function relatedArticles(article) {
  const pool = publishedArticles.filter(function (item) {
    return item.slug !== article.slug && item.product === article.product;
  });
  pool.sort(function (a, b) {
    const sectionDifference = Number(b.section === article.section) - Number(a.section === article.section);
    return sectionDifference || a.featureRank - b.featureRank;
  });
  return pool.slice(0, 3).map(function (item) { return card(item, { image: false }); }).join("");
}

async function write(relativePath, content) {
  const target = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
}

for (const article of publishedArticles) {
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
    UPDATED_META: article.updatedDate && article.updatedDate !== article.date
      ? '<span>Updated <time datetime="' + escapeHtml(article.updatedDate) + '">' + escapeHtml(article.updated || article.updatedDate) + "</time></span>"
      : "",
    REPORTING_BASIS: escapeHtml(article.basis || "The public sources and documents listed below form the basis of this article. APGO conducted no original interviews or on-location reporting."),
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
    title: (article.seoTitle || article.headline) + " — APGO",
    socialTitle: article.headline,
    description: article.dek,
    canonical,
    image: "https://apgo.ink" + article.image,
    article,
    product: article.product
  }, articleBody, article.product));
}

const journalArticles = currentEditionArticles.filter(function (article) { return article.product === "journal"; });
const footballArticles = publishedArticles.filter(function (article) { return article.product === "football"; });
const homepageFootballArticles = currentEditionArticles.filter(function (article) { return article.product === "football"; });
const ordered = [...currentEditionArticles].sort(function (a, b) { return a.featureRank - b.featureRank; });
const leadArticle = ordered.find(function (article) { return article.product === "journal"; });
const topStack = ordered.filter(function (article) { return article.slug !== leadArticle.slug && article.product === "journal"; }).slice(0, 3);
const topStackSlugs = new Set(topStack.map(function (article) { return article.slug; }));
const editionGrid = ordered.filter(function (article) {
  return article.product === "journal" && article.slug !== leadArticle.slug && !topStackSlugs.has(article.slug);
});
const homepageJournalSlugs = [leadArticle, ...topStack, ...editionGrid].map(function (article) { return article.slug; });
if (new Set(homepageJournalSlugs).size !== homepageJournalSlugs.length) {
  throw new Error("Homepage Journal placements must be unique across lead, top stack and edition grid.");
}

const homeBody = render(templates.home, {
  LATEST_URL: routeFor(leadArticle),
  LATEST_HEADLINE: escapeHtml(leadArticle.headline),
  LEAD: lead(leadArticle),
  TOP_STACK: topStack.map(compactCard).join(""),
  EDITION_GRID: editionGrid.map(card).join(""),
  FOOTBALL_GRID: homepageFootballArticles.map(card).join("")
});

await write("index.html", documentPage({
  title: "APGO — World affairs, economics, technology and ideas",
  description: "APGO publishes source-linked analysis and essays on world affairs, economics, technology, history, books and football.",
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
  title: "APGO Football — World Cup analysis and player-index research",
  description: "APGO Football publishes World Cup analysis and documents the research plan for a position-aware global player index.",
  canonical: "https://apgo.ink/football/",
  image: "https://apgo.ink" + footballArticles[0].image,
  product: "football"
}, render(templates.football, {
  FOOTBALL_STORIES: footballArticles.map(card).join("")
}), "football"));

await write("projects/index.html", documentPage({
  title: "APGO Projects — Research products in development",
  description: "Current status and release plans for the APGO World Player Index, Open Reference and Systems Atlas.",
  canonical: "https://apgo.ink/projects/",
  image: "https://apgo.ink/assets/images/player-index.webp"
}, templates.projects, "journal"));

const policies = [
  {
    file: "about.html",
    eyebrow: "About APGO",
    title: "About APGO",
    intro: "APGO publishes source-linked analysis and essays on world affairs, economics, technology, history, books and football.",
    body: '<p>APGO is an independent publication and project studio based in Zurich. The Journal covers world affairs, economics, technology, history and books. APGO Football publishes tournament analysis and documents the development of a global player index.</p><h2>Current edition</h2><p>Edition {{EDITION}} includes {{ARTICLE_COUNT}} source-linked articles across the Journal and Football. Articles link to public documents, official statistics, archival material, research papers and original texts. Each article is labelled by form and carries a source note.</p><h2>Current status</h2><p>APGO is at an early stage. Subscriber accounts, confidential submissions and a live player ranking remain in development. Project pages record the status and next milestone for each proposed product.</p><h2>Organisation</h2><p>The Journal is the editorial core. Rankings and reference projects have their own methods, version histories and correction routes. The <a href="/projects/">project page</a> tracks this work.</p><h2>Funding</h2><p>Reader support pays for research, data, design and infrastructure. Contributors receive no role in coverage, drafts, corrections or ranking decisions.</p>'
  },
  {
    file: "standards.html",
    eyebrow: "Editorial standards",
    title: "Editorial standards",
    intro: "These standards govern sourcing, article labels, corrections, images, conflicts and review dates.",
    body: '<h2>Article labels</h2><p>Analysis, evidence notes, essays and methodology are distinct forms. Every article identifies its form and includes a source note describing the material used.</p><h2>Sources</h2><p>APGO links directly to public documents, official data, research papers and original texts whenever practical. Claims from governments, governing bodies and parties to a conflict retain clear attribution.</p><h2>Corrections</h2><p>Material factual errors are corrected in the article and recorded on the <a href="/corrections.html">corrections page</a>. Method changes receive a new version and an explanation.</p><h2>Images and generative tools</h2><p>Images created or substantially assisted by generative tools carry an editorial-illustration label. They provide visual interpretation; the cited material provides the evidence for an article. Documentary images require provenance, appropriate rights and an accurate caption.</p><h2>Conflicts and funding</h2><p>Relevant financial or institutional conflicts are disclosed with the work. Reader contributions confer no editorial role. Any future ranking sponsor will have no access to model weights, inputs or publication decisions.</p><h2>Publication and review dates</h2><p>Time-sensitive analysis carries a publication date. A separate update date appears after a substantive revision. Readers should consult the linked source for current operational information.</p>'
  },
  {
    file: "corrections.html",
    eyebrow: "Corrections",
    title: "Corrections",
    intro: "This page records material corrections to APGO articles and project releases.",
    body: '<p>As of <time datetime="{{PUBLISHED_DATE}}">{{DISPLAY_DATE}}</time>, Edition {{EDITION}} has no logged material corrections.</p><h2>Report an error</h2><p>Open a public issue in the <a href="https://github.com/DominikB2103/apgo.ink/issues">APGO repository</a>. Include the article URL, disputed passage and strongest available source.</p><h2>Review process</h2><p>APGO checks the cited material and records a dated note when a factual correction changes the published article. Typographic and formatting fixes may be made without a correction note.</p>'
  },
  {
    file: "contact.html",
    eyebrow: "Contact",
    title: "Contact APGO",
    intro: "APGO accepts corrections, technical reports and project feedback through its public repository.",
    body: '<h2>Corrections and site issues</h2><p>Use <a href="https://github.com/DominikB2103/apgo.ink/issues">GitHub Issues</a> and include the relevant URL and supporting evidence.</p><h2>Football methodology</h2><p>Analysts, data specialists and researchers can use the same repository to review the ranking proposal and its assumptions.</p><h2>Confidential material</h2><p>No secure source channel is currently available. GitHub is public and is unsuitable for confidential or identifying material. APGO will publish secure contact details after that system has been configured and tested.</p>'
  },
  {
    file: "privacy.html",
    eyebrow: "Privacy",
    title: "Privacy",
    intro: "This notice describes the limited data processing associated with the APGO website.",
    body: '<h2>Services on this site</h2><p>The website currently has no advertising, reader accounts, comments, card payments or newsletter database.</p><h2>Browser storage</h2><p>The theme control stores a light-or-dark preference in the browser using localStorage. Copy buttons use the clipboard when activated.</p><h2>Hosting and fonts</h2><p>GitHub Pages and related network infrastructure deliver the site and may process routine request logs under their own policies. Pages request typefaces from Google Fonts.</p><h2>Bitcoin</h2><p>Bitcoin transactions are public. APGO requests no donor identity on this site, although a transfer may be linkable through a wallet or exchange.</p><h2>Changes</h2><p>This notice will be updated before APGO launches a feature that collects personal information. Last reviewed {{DISPLAY_DATE}}.</p>'
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
    title: policy.title.endsWith("APGO") ? policy.title : policy.title + " — APGO",
    description: policy.intro,
    canonical: "https://apgo.ink/" + policy.file
  }, body, "journal"));
}

await write("support.html", documentPage({
  title: "Support APGO — Reader funding",
  description: "Support APGO research, publishing and public-interest projects with Bitcoin.",
  canonical: "https://apgo.ink/support.html"
}, render(templates.support, { BITCOIN: bitcoin, BITCOIN_URI: "bitcoin:" + bitcoin }), "journal"));

await write("404.html", documentPage({
  title: "Page not found — APGO",
  description: "The requested page was not found.",
  canonical: "https://apgo.ink/404.html",
  robots: "noindex,follow"
}, templates["404"], "journal"));

const redirectHead = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=/journal/"><link rel="canonical" href="https://apgo.ink/journal/"><title>Moved to APGO Journal</title></head><body><main id="main"><h1>This page has moved</h1><p><a href="/journal/">Continue to APGO Journal</a>.</p></main></body></html>\n';
await write("news/index.html", redirectHead);
for (const legacy of ["ledger-they-buried.html", "ceasefire-border-towns.html", "face-recognition-no-vote.html", "lobbyists-writing-the-bill.html", "pharma-price-ladder.html", "study-funders-retraction.html", "aid-camps-satellite.html", "moderation-algorithm.html", "banned-books-tally.html", "who-owns-the-water.html", "subscribe.html", "tips.html"]) {
  await write(legacy, redirectHead);
}

const searchIndex = [...publishedArticles]
  .sort(function (a, b) {
    return b.date.localeCompare(a.date) || a.featureRank - b.featureRank;
  })
  .map(function (article) {
    return {
      url: routeFor(article),
      section: article.section,
      type: article.type,
      headline: article.headline,
      dek: article.dek
    };
  });
await write("search-index.json", JSON.stringify(searchIndex, null, 2) + "\n");

const feedArticles = [...publishedArticles]
  .sort(function (a, b) { return b.date.localeCompare(a.date) || a.featureRank - b.featureRank; })
  .slice(0, 50);

const feedItems = feedArticles.map(function (article) {
  const url = "https://apgo.ink" + routeFor(article);
  const publicationDate = new Date(article.date + "T00:00:00Z").toUTCString();
  return [
    "    <item>",
    "      <title>" + escapeHtml(article.headline) + "</title>",
    "      <link>" + url + "</link>",
    "      <guid isPermaLink=\"true\">" + url + "</guid>",
    "      <pubDate>" + publicationDate + "</pubDate>",
    "      <category>" + escapeHtml(article.section) + "</category>",
    "      <description>" + escapeHtml(article.dek) + "</description>",
    "    </item>"
  ].join("\n");
}).join("\n");

const feed = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  "  <channel>",
  "    <title>APGO</title>",
  "    <link>https://apgo.ink/</link>",
  "    <description>World affairs, economics, technology, history, ideas and football analysis.</description>",
  "    <language>en</language>",
  "    <lastBuildDate>" + site.rssDate + "</lastBuildDate>",
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
  "/projects/",
  "/about.html",
  "/standards.html",
  "/corrections.html",
  "/contact.html",
  "/privacy.html",
  "/support.html"
].concat(publishedArticles.map(routeFor));

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

console.log("Built " + publishedArticles.length + " published articles and core APGO pages in " + outputRoot);
