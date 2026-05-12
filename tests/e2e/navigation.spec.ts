import { expect, test } from "@playwright/test";

test.describe("public navigation", () => {
	test("desktop nav exposes the main entries and about page", async ({
		page,
	}, testInfo) => {
		test.skip(
			testInfo.project.name.includes("Mobile"),
			"Desktop nav check only",
		);

		await page.goto("/");

		const nav = page.getByTestId("public-nav");

		await expect(nav).toBeVisible();
		await expect(page.getByTestId("nav-home")).toBeVisible();
		await expect(page.getByTestId("nav-decouvrir")).toBeVisible();
		await expect(page.getByTestId("nav-kois")).toBeVisible();
		await expect(page.getByTestId("nav-products-toggle")).toBeVisible();
		await expect(page.getByTestId("nav-azukari")).toBeVisible();
		await expect(page.getByTestId("nav-a-propos")).toBeVisible();
	});

	test("products dropdown leads to matériel", async ({ page }, testInfo) => {
		test.skip(
			testInfo.project.name.includes("Mobile"),
			"Desktop nav check only",
		);

		await page.goto("/");

		const nav = page.getByTestId("public-nav");

		await page.getByTestId("nav-products-toggle").click();
		await nav.getByTestId("nav-products-materiel").click();

		await expect(page).toHaveURL(/\/materiel$/);
		await expect(page.getByRole("heading", { name: "Matériel" })).toBeVisible();
	});

	test("about page is reachable from the navbar", async ({
		page,
	}, testInfo) => {
		test.skip(
			testInfo.project.name.includes("Mobile"),
			"Desktop nav check only",
		);

		await page.goto("/");

		await page.getByTestId("nav-a-propos").click();

		await expect(page).toHaveURL(/\/a-propos$/);
		await expect(
			page.getByRole("heading", { name: "En conception" }),
		).toBeVisible();
	});

	test("mobile burger opens the menu and reaches about page", async ({
		page,
	}, testInfo) => {
		test.skip(
			!testInfo.project.name.includes("Mobile"),
			"Mobile nav check only",
		);

		await page.goto("/");

		await page.getByTestId("nav-burger").click();
		await expect(page.getByTestId("public-nav")).toHaveClass(/open/);
		await page.getByTestId("public-nav").getByTestId("nav-a-propos").click();

		await expect(page).toHaveURL(/\/a-propos$/);
		await expect(
			page.getByRole("heading", { name: "En conception" }),
		).toBeVisible();
	});

	test("mobile products menu reaches matériel", async ({ page }, testInfo) => {
		test.skip(
			!testInfo.project.name.includes("Mobile"),
			"Mobile nav check only",
		);

		await page.goto("/");

		await page.getByTestId("nav-burger").click();
		await page.getByTestId("nav-products-toggle").click();
		await page.getByTestId("nav-products-materiel").click();

		await expect(page).toHaveURL(/\/materiel$/);
		await expect(page.getByRole("heading", { name: "Matériel" })).toBeVisible();
	});
});
