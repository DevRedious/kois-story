import { expect, test } from "@playwright/test";

import { loginAsAdmin } from "./helpers/auth";

test.describe("@smoke critical journeys", () => {
	test("public homepage and catalogue path", async ({ page }, testInfo) => {
		await page.goto("/");

		if (testInfo.project.name.includes("Mobile")) {
			await page.getByTestId("nav-burger").click();
			await page.getByTestId("public-nav").getByTestId("nav-kois").click();
		} else {
			await page.getByTestId("nav-kois").click();
		}

		await expect(page).toHaveURL(/\/kois$/);
		await expect(page.getByRole("heading", { name: "Nos Koïs" })).toBeVisible();
	});

	test("public about page path", async ({ page }, testInfo) => {
		await page.goto("/");

		if (testInfo.project.name.includes("Mobile")) {
			await page.getByTestId("nav-burger").click();
			await page.getByTestId("public-nav").getByTestId("nav-a-propos").click();
		} else {
			await page.getByTestId("nav-a-propos").click();
		}

		await expect(page).toHaveURL(/\/a-propos$/);
		await expect(
			page.getByRole("heading", { name: "En conception" }),
		).toBeVisible();
	});

	test("admin login reaches dashboard", async ({ page }) => {
		await loginAsAdmin(page);

		await expect(page.getByTestId("admin-dashboard-hero")).toBeVisible();
		await expect(page.getByTestId("admin-quick-actions")).toBeVisible();
	});
});
