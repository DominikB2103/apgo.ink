# APGO editorial and product playbook

APGO is organised as a publication system, not an endless feed. The Journal is the editorial core. Football and future public-reference projects are separate products that share the same obligations: label the work, show the evidence, disclose the limit and preserve revisions.

## A sustainable publishing rhythm

Start with one coherent edition rather than pretending to operate a 24-hour newsroom.

- Monday: choose one lead analysis, one secondary analysis and one essay or review.
- Tuesday: build a source packet from primary documents and write the claim outline.
- Wednesday: draft; flag every sentence that still depends on memory, inference or a secondary summary.
- Thursday: edit, verify numbers and dates, add the visual, metadata, links and reporting-basis note.
- Friday: build, run checks, review desktop/mobile layouts and publish the edition.

Three finished pieces readers trust are more valuable than twenty empty category pages.

## Publish an article

1. Choose a product: `journal` or `football`.
2. Choose a format before drafting: `News`, `Analysis`, `Data`, `Essay`, `Review`, `Methodology` or `Correction`.
3. Add the semantic article body to `content/articles/`.
4. Add metadata, a permanent slug, image provenance and primary sources to `content/articles.json`.
5. Add a 16:9 WebP visual to `assets/images/`. Generated work must be labelled as an editorial illustration and must not imitate documentary evidence.
6. Run `npm run build && npm run check`.
7. Review the front page, Journal archive, article page, RSS and mobile navigation before merging.

Do not hand-edit generated files under `articles/` or `football/articles/`; change the content source or template and rebuild.

## Story anatomy

Every published piece includes:

- section and content-type label;
- specific headline and one-sentence deck;
- accountable desk/byline, publication date, update date and reading time;
- a plain reporting-basis note stating whether interviews or on-location reporting were conducted;
- a useful visual with alt text, caption, provenance and AI disclosure when applicable;
- primary sources or the original literary text;
- article tools, corrections route and related work;
- a quiet support prompt with the current funding disclosure.

## Editorial rules

### Evidence

- Link to original material wherever it is available.
- Attribute numbers in the sentence. A source list is not a substitute for clear attribution.
- Use exact dates for conditions that can change.
- Treat official, corporate, governing-body and belligerent statements as attributed claims, not independent verification.
- State what is inference. Do not upgrade a projection, allegation or scenario into a result.

### Headlines

- Promise the argument the article actually makes.
- Avoid unexplained superlatives, anonymous claims about what “everyone” thinks and urgency unsupported by the article.
- Prefer a concrete noun and a real tension.

### Images

- Use documentary imagery only when identity, place or event accuracy matters and provenance/rights are clear.
- Use APGO editorial illustration for conceptual analysis.
- Never generate a fake documentary image of a real person or event.
- Store production visuals under `assets/images/`, use WebP for page delivery and write useful alt text.

### Corrections

Material changes receive a dated correction note and an entry in the corrections log. Typography and broken-link fixes may be made silently only when meaning does not change.

## World Player Index roadmap

APGO can build a serious **independent** player ranking. It cannot call the ranking official in the governing-body sense unless a recognised authority formally authorises it.

### Phase 1 — data and definitions

- Obtain a lawful, sustainable event-data source with declared competition coverage.
- Publish the evaluation window, minimum minutes, role groups, competition set and data dictionary.
- Establish role groups: goalkeeper, centre-back, full-back/wing-back, defensive midfield, central midfield, attacking midfield/wing and striker.
- Backtest completed seasons for league, club, role, age, possession and minutes bias.

### Phase 2 — model and review

- Create player-match scores from context-adjusted role metrics rather than raw per-90 totals.
- Apply a public recency curve, opponent-strength factor and capped match-importance multiplier.
- Shrink small samples toward the midpoint and publish confidence/coverage bands.
- Ask independent football analysts and data specialists to challenge the definitions and results.

### Phase 3 — pilot

- Release a top 25 rather than a top 100.
- Publish the complete method, score components, eligible minutes, uncertainty and plain-language placement notes.
- Show role tables alongside the overall list.
- Preserve the first edition and provide a correction/challenge route.

### Phase 4 — recurring reference

- Move to quarterly releases only after the pipeline is reproducible.
- Add player pages, score histories, comparisons, model-change notes and downloadable outputs where licensing permits.
- Keep the numerical model separate from any editorial list or fan vote.

## Product expansion rule

Add a new project only when APGO can answer five questions in public:

1. What reader problem does it solve?
2. What evidence or data does it use?
3. Who is accountable for the output?
4. How is it corrected and versioned?
5. What will APGO explicitly not claim?
