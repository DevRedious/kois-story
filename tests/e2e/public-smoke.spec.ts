import { expect, test } from "@playwright/test";

const publicPages = [
	{ path: "/decouvrir", heading: "Nous découvrir" },
	{ path: "/kois", heading: "Nos Koïs" },
	{ path: "/materiel", heading: "Matériel" },
	{ path: "/nourriture", heading: "Nourriture" },
	{ path: "/soins", heading: "Soins" },
	{ path: "/azukari", heading: "Service Azukari" },
	{ path: "/a-propos", heading: "En conception" },
	{ path: "/mentions-legales", heading: "Mentions légales" },
	{ path: "/cgv", heading: "Conditions generales de vente" },
	{
		path: "/politique-de-confidentialite",
		heading: "Politique de confidentialite",
	},
];

test.describe("public smoke pages", () => {
	for (const pageSpec of publicPages) {
		const title = ["/kois", "/azukari", "/a-propos"].includes(pageSpec.path)
			? `@smoke loads ${pageSpec.path}`
			: `loads ${pageSpec.path}`;

		test(title, async ({ page }) => {
			await page.goto(pageSpec.path);

			await expect(page).toHaveURL(
				new RegExp(`${pageSpec.path.replace(/\//g, "\\/")}$`),
			);
			await expect(
				page.getByRole("heading", { name: pageSpec.heading }).first(),
			).toBeVisible();
			await expect(page.locator("#site-header")).toBeVisible();
		});
	}

	test("@smoke opens a koi detail page from the catalogue", async ({
		page,
	}) => {
		await page.goto("/kois");

		const firstCard = page.locator(".koi-grid a").first();
		await expect(firstCard).toBeVisible();

		await firstCard.click();

		await expect(page).toHaveURL(/\/kois\/\d+$/);
		await expect(page.locator(".product")).toBeVisible();
	});
});
