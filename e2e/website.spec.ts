import { expect, test } from "@playwright/test";

const pageRoutes = [
  { path: "/", heading: "Codrington International LLC" },
  { path: "/about", heading: "About Us" },
  { path: "/apparel/facebeat", heading: "Facebeat Apparel" },
  { path: "/apparel/shop", heading: "Apparel Catalog" },
  { path: "/books-publishing", heading: "Books & Publishing" },
  { path: "/divisions", heading: "Our Divisions" },
  { path: "/contact", heading: "Contact Us" },
  { path: "/veteran-warrior-believer", heading: "Veteran Warrior Believer" },
];

const viewportWidths = [320, 375, 430, 768, 1024, 1280, 1440, 1920];

test("all registered pages load directly with shared layout and metadata", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  const failedLocalRequests: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("requestfailed", (request) => {
    if (request.url().startsWith("http://127.0.0.1:4173/")) {
      failedLocalRequests.push(request.url());
    }
  });

  for (const route of pageRoutes) {
    const response = await page.goto(route.path);
    expect(response?.status(), route.path).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      route.heading,
    );
    await expect(
      page.getByRole("link", { name: /Codrington International LLC home/ }),
    ).toBeVisible();
    await expect(page.getByRole("contentinfo")).toContainText(
      "Serving with purpose, leading with integrity.",
    );
    await expect(page).toHaveTitle(/Codrington International LLC/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
  }

  expect(runtimeErrors).toEqual([]);
  expect(failedLocalRequests).toEqual([]);
});

test("unknown route renders the not-found page and recovery link", async ({
  page,
}) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { name: "This page is unavailable" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Return Home" })).toHaveAttribute(
    "href",
    "/",
  );
});

test("division cards and primary calls to action lead to their pages", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Explore Our Divisions" }).click();
  await expect(page).toHaveURL(/\/divisions$/);

  await page
    .getByRole("link", { name: "Learn About Veteran Warrior Believer" })
    .click();
  await expect(page).toHaveURL(/\/veteran-warrior-believer$/);

  await page.goto("/divisions");
  await page.getByRole("link", { name: "Discover Facebeat Apparel" }).click();
  await expect(page).toHaveURL(/\/apparel\/facebeat$/);
  await expect(
    page.getByRole("heading", { name: "Facebeat Apparel" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "View Apparel Catalog" }).click();
  await expect(page).toHaveURL(/\/apparel\/shop$/);
  await expect(
    page.getByText(
      /This catalog is for Codrington International LLC's Faith-Based Apparel division/,
    ),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Facebeat Apparel is a distinct brand within that division.",
    ),
  ).toBeVisible();

  await page.goto("/divisions");
  await page.getByRole("link", { name: "Explore Books & Publishing" }).click();
  await expect(page).toHaveURL(/\/books-publishing$/);
});

test("mobile menu opens, closes with Escape, and closes after navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await menuButton.click();
  await expect(
    page.getByRole("button", { name: "Close navigation menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation menu" }),
  ).toHaveAttribute("aria-expanded", "false");

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Facebeat Apparel" })
    .click();
  await expect(page).toHaveURL(/\/apparel\/facebeat$/);
  await expect(
    page.getByRole("button", { name: "Open navigation menu" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("key pages have no horizontal overflow at required viewport widths", async ({
  page,
}) => {
  test.setTimeout(120_000);

  for (const path of [
    "/",
    "/contact",
    "/apparel/facebeat",
    "/apparel/shop",
    "/books-publishing",
  ]) {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
      }));

      expect(dimensions.document, `${path} at ${width}px`).toBeLessThanOrEqual(
        dimensions.viewport,
      );
    }
  }
});

test("contact form reports required and invalid email input without a network request", async ({
  page,
}) => {
  let submissionCount = 0;
  await page.route("https://contact.test/api/messages", async (route) => {
    submissionCount += 1;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.goto("/contact");

  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await expect(page.getByText("Enter your email address.")).toBeVisible();
  await expect(page.getByText("Enter a subject.")).toBeVisible();
  await expect(page.getByText("Enter a message.")).toBeVisible();
  expect(submissionCount).toBe(0);

  await page.getByLabel("Full name").fill("Test Visitor");
  await page.getByLabel("Email address").fill("not-an-email");
  await page.getByLabel("Subject").fill("Question");
  await page.getByLabel("Message").fill("Synthetic browser test only.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  expect(submissionCount).toBe(0);
});

test("contact form shows delivery states for mocked service responses only", async ({
  page,
}) => {
  let shouldFail = true;
  await page.route("https://contact.test/api/messages", async (route) => {
    if (shouldFail) {
      await route.fulfill({ status: 503, body: "Unavailable" });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });

  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Synthetic Test");
  await page.getByLabel("Email address").fill("qa@example.test");
  await page.getByLabel("Subject").fill("Mocked test");
  await page.getByLabel("Message").fill("No real message is sent.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "Your message could not be sent.",
  );

  shouldFail = false;
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your message was sent successfully.",
  );
});
