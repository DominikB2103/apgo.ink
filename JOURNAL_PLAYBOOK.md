# APGO editorial and product playbook

This repository now treats APGO as a small publication system rather than a single landing page. The Journal is the editorial core; the Football Index and reference projects are distinct products that share APGO's design and trust standards.

## Publish a journal story

1. Choose a section: `World`, `Football`, `Books & Ideas`, or `APGO Lab`.
2. Decide the format before writing: `News`, `Analysis`, `Essay`, `Review`, `Methodology`, or `Correction`.
3. Gather primary sources first. Prefer legislation, official datasets, court decisions, governing-body documents, original research, transcripts, or the primary literary text.
4. Copy one of the existing article directories under `journal/stories/` and give it a short permanent slug.
5. Replace the metadata, headline, description, article body, image, source list, and related-story links.
6. Add the story to the Journal home page and search dialog in `journal/index.html`.
7. Test the page at desktop and mobile widths, check every source link, and read the piece once only for unsupported certainty.

Do not silently change a materially wrong published claim. Correct it and add a dated correction note near the top or bottom of the article.

## Story anatomy

Every published piece should include:

- a section and format label;
- a specific headline and factual description;
- byline, publication date, and honest reading-time estimate;
- original or properly licensed visual with useful alt text;
- body copy that separates evidence from inference;
- a source list for factual analysis;
- an article note when readers could mistake scope or certainty;
- a related APGO story or project;
- the funding disclosure and current Bitcoin address.

## Editorial standards

### Evidence

- Link to the original material whenever it is available.
- Attribute numbers in the sentence; do not make readers reverse-engineer a source list.
- Use exact dates for events that could be confused with current conditions.
- Do not promote a projection into a result.
- Label interpretation as interpretation.

### Headlines

- Promise the argument actually made by the story.
- Avoid fake urgency, unexplained superlatives, and anonymous claims of what “the internet” believes.
- Use a concrete noun and a real tension when possible.

### Images

- Use documentary photography only when identity, place, product, or event accuracy matters and the license is clear.
- Use APGO editorial illustration for conceptual analysis.
- Never generate a fake documentary image of a real event.
- Save production images under `assets/images/`, use WebP for page delivery, include dimensions, and write descriptive alt text.

## Sustainable weekly workflow

Start smaller than a newsroom homepage suggests:

- Monday: choose one lead analysis and two shorter pieces.
- Tuesday: source packet and outline.
- Wednesday: first draft and fact check.
- Thursday: edit, image, metadata, links, and mobile QA.
- Friday: publish one strong edition and distribute it.

Three pieces readers finish are more valuable than twenty empty category pages.

## Football Index roadmap

The Football Index should be presented as an **independent reference**, not an “official” ranking, unless a recognized governing body formally authorizes that description.

### Phase 1 — data and definitions

- Choose a legal, sustainable event-data source with strong league coverage.
- Define the evaluation window, minimum minutes, competition set, position groups, and treatment of injured players.
- Create a data dictionary for every metric.
- Backtest several completed seasons and look for league, club, role, age, and minutes bias.

### Phase 2 — model and review

- Calculate separate position models before producing a cross-position score.
- Adjust for opponent strength, team possession context, match state, and competition.
- Publish confidence or coverage bands; avoid false precision.
- Ask independent football analysts and data specialists to review the method.

### Phase 3 — pilot release

- Publish a top 25 rather than a top 100.
- Release the full method, data window, model version, coverage gaps, and a plain-language explanation for major placements.
- Provide a correction channel and preserve the original edition.

### Phase 4 — recurring product

- Move to quarterly releases only after the pipeline is reproducible.
- Add player pages, score histories, comparison tools, model-change notes, and downloadable tables where the data license allows it.
- Keep editorial judgment separate from the model score.

## Technical next step

The current site intentionally remains static and deployable like the existing repository. Once APGO is publishing regularly, migrate repeated headers, article templates, metadata, and story lists to a static-site generator with content collections. Astro is a strong fit: it can preserve fast static pages while turning stories into Markdown/MDX and generating section pages, feeds, sitemaps, structured data, and archives automatically.

Do that migration when repetition becomes the bottleneck—not before the editorial routine exists.
