import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "laptop", width: 1200, height: 900 },
  { name: "layout edge", width: 1000, height: 900 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const criticalPages = [
  { name: "home", path: "/" },
  { name: "journal", path: "/journal/" },
  { name: "football", path: "/football/" },
  { name: "projects", path: "/projects/" },
  { name: "support", path: "/support.html" },
  { name: "article", path: "/articles/ceasefire-broke-at-sea/" },
];

for (const viewport of viewports) {
  test.describe(`${viewport.name} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const pageInfo of criticalPages) {
      test(`${pageInfo.name} has no horizontal overflow`, async ({ page }) => {
        await page.goto(pageInfo.path, { waitUntil: "domcontentloaded" });
        await page.locator("body").waitFor();

        const geometry = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          page: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          offenders: [...document.body.querySelectorAll("*")]
            .filter((node) => {
              if (node.matches(".visually-hidden, .skip-link")) return false;
              const box = node.getBoundingClientRect();
              return box.width && (box.left < -1 || box.right > innerWidth + 1);
            })
            .slice(0, 8)
            .map((node) => {
              const box = node.getBoundingClientRect();
              return {
                node: `${node.tagName.toLowerCase()}.${node.className}`,
                left: box.left,
                right: box.right,
                width: box.width,
              };
            }),
        }));

        const context = `Likely offenders: ${JSON.stringify(geometry.offenders)}`;
        expect(geometry.page, context).toBeLessThanOrEqual(geometry.viewport + 1);
        expect(geometry.body, context).toBeLessThanOrEqual(geometry.viewport + 1);
      });
    }

    test("article preserves the editorial hierarchy", async ({ page }) => {
      await page.goto("/articles/ceasefire-broke-at-sea/", { waitUntil: "domcontentloaded" });

      const headline = page.locator(".article-head__headline");
      const deck = page.locator(".article-head__dek");
      const meta = page.locator(".article-head__meta");
      const hero = page.locator(".article-hero__frame");
      const heroImage = page.locator(".article-hero img");
      const body = page.locator(".article-body");
      const rail = page.locator(".article-aside");
      const caption = page.locator(".image-caption");
      const mobileTools = page.locator(".article-mobile-tools");

      await expect(headline).toBeVisible();
      await expect(deck).toBeVisible();
      await expect(meta).toContainText("Published");
      await expect(hero).toBeVisible();
      await expect.poll(() => heroImage.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
      await expect(caption).toBeVisible();
      await expect(caption).not.toBeEmpty();
      await expect(body).toBeVisible();
      await expect(rail).toBeVisible();
      await expect(page.locator('link[href*="/assets/css/article.css?v="]')).toHaveCount(1);

      const headlineSize = Number.parseFloat(await headline.evaluate((node) => getComputedStyle(node).fontSize));
      const gridAreas = await page.locator(".article-layout").evaluate((node) => getComputedStyle(node).gridTemplateAreas);
      const headlineBox = await headline.boundingBox();
      const heroBox = await hero.boundingBox();
      const bodyBox = await body.boundingBox();
      const railBox = await rail.boundingBox();

      expect(headlineSize).toBeLessThanOrEqual(48.5);
      expect(gridAreas).toContain("body");
      expect(gridAreas).toContain("rail");
      expect(headlineBox).not.toBeNull();
      expect(heroBox).not.toBeNull();
      expect(bodyBox).not.toBeNull();
      expect(railBox).not.toBeNull();
      expect(heroBox.y).toBeGreaterThan(headlineBox.y + headlineBox.height);
      expect(heroBox.y).toBeLessThan(viewport.height);
      expect(heroBox.width / heroBox.height).toBeGreaterThan(1.75);
      expect(heroBox.width / heroBox.height).toBeLessThan(1.8);
      expect(bodyBox.y).toBeGreaterThan(heroBox.y);

      if (viewport.width > 1000) {
        expect(bodyBox.width).toBeGreaterThanOrEqual(640);
        expect(bodyBox.width).toBeLessThanOrEqual(680);
        expect(railBox.width).toBeGreaterThanOrEqual(220);
        expect(railBox.width).toBeLessThanOrEqual(260);
        expect(railBox.x).toBeGreaterThan(bodyBox.x + bodyBox.width);
        expect(Math.abs(railBox.y - bodyBox.y)).toBeLessThanOrEqual(2);
        await expect(mobileTools).toBeHidden();
      } else {
        const minimumBodyWidth = viewport.width >= 768 ? 640 : viewport.width - 80;
        expect(bodyBox.width).toBeGreaterThan(minimumBodyWidth);
        if (viewport.width >= 768) expect(bodyBox.width).toBeLessThanOrEqual(730);
        expect(railBox.y).toBeGreaterThanOrEqual(bodyBox.y + bodyBox.height - 2);
        await expect(rail).toHaveCSS("position", "static");
        await expect(mobileTools).toBeVisible();
      }
    });

    test("home lead uses a landscape image and no duplicate ticker", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const image = page.locator(".lead-story__image");
      const leadImage = page.locator(".lead-story__image img");
      const headline = page.locator(".lead-story__headline");
      await expect.poll(() => leadImage.evaluate((node) => node.naturalWidth)).toBeGreaterThan(0);
      const imageBox = await image.boundingBox();
      const headlineBox = await headline.boundingBox();
      const headlineSize = Number.parseFloat(await headline.evaluate((node) => getComputedStyle(node).fontSize));

      expect(imageBox).not.toBeNull();
      expect(headlineBox).not.toBeNull();
      expect(imageBox.width / imageBox.height).toBeGreaterThan(1.75);
      expect(imageBox.width / imageBox.height).toBeLessThan(1.8);
      expect(headlineBox.y).toBeGreaterThanOrEqual(imageBox.y + imageBox.height - 2);
      expect(headlineSize).toBeLessThanOrEqual(48.5);
      await expect(page.locator(".edition-line")).toHaveCount(0);
    });
  });
}

test.describe("short laptop", () => {
  test.use({ viewport: { width: 1200, height: 700 } });

  test("article rail does not trap content in a short viewport", async ({ page }) => {
    await page.goto("/articles/ceasefire-broke-at-sea/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".article-aside")).toHaveCSS("position", "static");

    const boxes = await page.evaluate(() => {
      const body = document.querySelector(".article-body").getBoundingClientRect();
      const rail = document.querySelector(".article-aside").getBoundingClientRect();
      return {
        body: { x: body.x, width: body.width },
        rail: { x: rail.x, width: rail.width },
      };
    });

    expect(boxes.body.width).toBeGreaterThanOrEqual(620);
    expect(boxes.rail.width).toBeGreaterThanOrEqual(220);
    expect(boxes.rail.x).toBeGreaterThan(boxes.body.x + boxes.body.width);
  });
});

test.describe("search and Journal semantics", () => {
  test("global search opens as a quiet utility and waits for a query", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("[data-search-open]").click();

    await expect(page.locator("[data-search-dialog]")).toBeVisible();
    await expect(page.locator("[data-search-dialog] .kicker")).toHaveText("Site search");
    await expect(page.locator("[data-search-results] a")).toHaveCount(0);
    await expect(page.locator("[data-search-status]")).toContainText("Search Journal and Football");

    await page.locator("[data-global-search]").fill("world");
    await expect(page.locator("[data-search-results] a").first()).toBeVisible();
    expect(await page.locator("[data-search-results] a").count()).toBeLessThanOrEqual(8);
  });

  test("Journal distinguishes edition filtering from site search", async ({ page }) => {
    await page.goto("/journal/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "All stories" })).toBeVisible();
    await expect(page.locator("[data-story-filter]")).toHaveAttribute("placeholder", "Filter headlines and topics");
    await expect(page.getByText("APGO archive", { exact: true })).toHaveCount(0);
  });
});
