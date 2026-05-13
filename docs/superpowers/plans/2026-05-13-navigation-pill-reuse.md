# Navigation pill reuse — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Share CSS tokens and Rails partials so the public header pill and the admin sidebar active link reuse one visual definition, with clearer admin nav data and safer unknown-controller handling.

**Architecture:** Extract `:root` nav-pill custom properties into `app/assets/stylesheets/shared/nav-pill-tokens.css`; import it from the visitors molecule and from `admin_application.css`; point admin `.nav-item.active` at those variables. Move the public pill partial to `app/views/shared/_nav_pill_link.html.erb`. Build admin sidebar from a helper-returned array of sections and `app/views/admin/shared/_nav_item.html.erb`, and make `admin_current_page` return `nil` for unmapped controllers with a development-only log line.

**Tech stack:** Rails 7+, Propshaft/CSS `@import`, Minitest, Playwright (`tests/e2e`), Turbo, existing `header-nav.js` unchanged for public pill `.active`.

---

## File map (create / modify)

| File | Role |
|------|------|
| `app/assets/stylesheets/shared/nav-pill-tokens.css` | **Create** — `:root` variables for pill gradient, border, shadows |
| `app/assets/stylesheets/visitors/molecules/nav-pill-link.css` | **Modify** — `@import` tokens; remove duplicated `:root` block |
| `app/assets/stylesheets/admin_application.css` | **Modify** — `@import url("./shared/nav-pill-tokens.css");` after `./shared/variables.css` |
| `app/assets/stylesheets/admin/layout-section-2.css` | **Modify** — `.nav-item.active` uses `var(--nav-pill-*)` where applicable; keep layout-specific rules |
| `app/views/shared/_nav_pill_link.html.erb` | **Create** — public pill `link_to` API |
| `app/views/pages/_nav_pill_link.html.erb` | **Delete** after callers updated |
| `app/views/pages/_home_header.html.erb` | **Modify** — `render "shared/nav_pill_link", ...` |
| `app/helpers/admin_helper.rb` | **Modify** — `admin_current_page`, `admin_sidebar_nav_groups`, dev warning |
| `app/views/admin/shared/_nav_item.html.erb` | **Create** — one sidebar link + optional badge |
| `app/views/admin/shared/_sidebar.html.erb` | **Modify** — loop groups; remove `data-page`; keep messages badge block inside item |
| `test/helpers/admin_helper_test.rb` | **Create** — mapping tests for `admin_current_page` |
| `test/integration/admin_sidebar_nav_test.rb` | **Create** — HTML contract for one active link |
| `tests/e2e/navigation.spec.ts` | **Modify** — assert `nav-home` gains `active` on `/` after load (desktop) |

---

### Task 1: Shared nav-pill CSS tokens

**Files:**
- Create: `app/assets/stylesheets/shared/nav-pill-tokens.css`
- Modify: `app/assets/stylesheets/visitors/molecules/nav-pill-link.css`

- [ ] **Step 1: Create the tokens file**

Create `app/assets/stylesheets/shared/nav-pill-tokens.css`:

```css
/**
 * Shared tokens for public header nav-pill and admin sidebar active surface.
 * Imported by visitors molecule and admin bundle.
 */
:root {
	--nav-pill-gold: rgb(234, 178, 27);
	--nav-pill-bronze: rgb(165, 130, 65);
	--nav-pill-gradient: linear-gradient(
		135deg,
		var(--nav-pill-bronze) 0%,
		var(--nav-pill-bronze) 28%,
		var(--nav-pill-gold) 50%,
		var(--nav-pill-bronze) 72%,
		var(--nav-pill-bronze) 100%
	);
	--nav-pill-border: 1px solid var(--nav-pill-gold);
	--nav-pill-shadow-link: 0 4px 18px rgba(234, 178, 27, 0.34);
	--nav-pill-shadow-link-hover: 0 8px 24px rgba(234, 178, 27, 0.42);
	--nav-pill-shadow-mobile: 0 8px 24px rgba(234, 178, 27, 0.28);
	--nav-pill-shadow-indicator: 0 6px 22px rgba(234, 178, 27, 0.34),
		0 0 0 1px rgba(234, 178, 27, 0.14);
	--nav-pill-shadow-indicator-hover: 0 10px 30px rgba(234, 178, 27, 0.46),
		0 0 0 1px rgba(234, 178, 27, 0.24);
}
```

- [ ] **Step 2: Wire the molecule to the tokens**

At the **top** of `app/assets/stylesheets/visitors/molecules/nav-pill-link.css` (before the doc comment or immediately after it), add:

```css
@import url("../../shared/nav-pill-tokens.css");
```

Remove the entire `:root { ... }` block that duplicates the variables (lines that defined `--nav-pill-gold` through `--nav-pill-shadow-indicator-hover`).

- [ ] **Step 3: Sanity check**

Run: `npx biome check app/assets/stylesheets/shared/nav-pill-tokens.css app/assets/stylesheets/visitors/molecules/nav-pill-link.css`

Expected: no new errors (or fix reported issues).

- [ ] **Step 4: Commit**

```bash
git add app/assets/stylesheets/shared/nav-pill-tokens.css app/assets/stylesheets/visitors/molecules/nav-pill-link.css
git commit -m "feat: extract shared nav-pill CSS tokens"
```

---

### Task 2: Admin bundle imports tokens + active nav uses variables

**Files:**
- Modify: `app/assets/stylesheets/admin_application.css`
- Modify: `app/assets/stylesheets/admin/layout-section-2.css`

- [ ] **Step 1: Import tokens in admin manifest**

In `app/assets/stylesheets/admin_application.css`, immediately after:

```css
@import url("./shared/variables.css");
```

add:

```css
@import url("./shared/nav-pill-tokens.css");
```

- [ ] **Step 2: Point `.nav-item.active` at shared gradient**

In `app/assets/stylesheets/admin/layout-section-2.css`, locate `.nav-item.active` and replace the `background: linear-gradient(...)` value with:

```css
background: var(--nav-pill-gradient);
```

Keep `background-size`, `background-position`, `border-left-color`, `color`, `font-weight`, and transitions as they are unless they conflict; if the previous rule used `90deg` gradient, switching to `var(--nav-pill-gradient)` is intentional per design spec (single visual source).

- [ ] **Step 3: Run Biome on touched files**

Run: `npx biome check app/assets/stylesheets/admin_application.css app/assets/stylesheets/admin/layout-section-2.css`

- [ ] **Step 4: Commit**

```bash
git add app/assets/stylesheets/admin_application.css app/assets/stylesheets/admin/layout-section-2.css
git commit -m "feat: reuse nav-pill tokens for admin sidebar active state"
```

---

### Task 3: Public partial under `shared/`

**Files:**
- Create: `app/views/shared/_nav_pill_link.html.erb`
- Modify: `app/views/pages/_home_header.html.erb`
- Delete: `app/views/pages/_nav_pill_link.html.erb`

- [ ] **Step 1: Add shared partial**

Create `app/views/shared/_nav_pill_link.html.erb`:

```erb
<%# locals: label, url, testid: (optional) %>
<%= link_to label, url, class: "nav-pill", data: { testid: local_assigns[:testid] }.compact %>
```

(Optional later: `active` from server — out of scope for first pass; JS remains source for `.active` on public pills.)

- [ ] **Step 2: Update header renders**

In `app/views/pages/_home_header.html.erb`, replace every `render "pages/nav_pill_link"` with `render "shared/nav_pill_link"` (same locals).

- [ ] **Step 3: Delete old partial**

Delete `app/views/pages/_nav_pill_link.html.erb`.

- [ ] **Step 4: Commit**

```bash
git add app/views/shared/_nav_pill_link.html.erb app/views/pages/_home_header.html.erb
git rm app/views/pages/_nav_pill_link.html.erb
git commit -m "refactor: move nav pill partial to shared"
```

---

### Task 4: `admin_current_page` — `nil` for unknown + dev warning

**Files:**
- Modify: `app/helpers/admin_helper.rb`

- [ ] **Step 1: Write failing helper tests**

Create `test/helpers/admin_helper_test.rb`:

```ruby
require "test_helper"

class AdminHelperTest < ActionView::TestCase
  include AdminHelper
  include Rails.application.routes.url_helpers

  test "admin_current_page returns mapped symbol for known controllers" do
    stubs(controller_path: "admin/kois", action_name: "index")
    assert_equal :kois, admin_current_page
  end

  test "admin_current_page returns nil for unknown admin controller" do
    stubs(controller_path: "admin/unknown_feature", action_name: "index")
    assert_nil admin_current_page
  end
end
```

- [ ] **Step 2: Run tests (expect failure)**

Run: `ruby -Itest test/helpers/admin_helper_test.rb`

Expected: FAIL — `else` branch still returns `:dashboard` or `assert_nil` fails.

- [ ] **Step 3: Implement helper change**

In `app/helpers/admin_helper.rb`, inside `admin_current_page`, replace the final `else` branch:

```ruby
    else
      if Rails.env.development?
        Rails.logger.warn(
          "[AdminHelper] Unmapped admin controller_path=#{controller_path.inspect} — no sidebar item will be marked active.",
        )
      end
      nil
    end
```

Ensure every `when` branch still returns the correct symbol; only the default changes from `:dashboard` to `nil`.

- [ ] **Step 4: Run tests (expect pass)**

Run: `ruby -Itest test/helpers/admin_helper_test.rb`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/helpers/admin_helper.rb test/helpers/admin_helper_test.rb
git commit -m "fix: do not mark dashboard active for unknown admin controllers"
```

---

### Task 5: Admin sidebar — data-driven items + `_nav_item` partial

**Files:**
- Modify: `app/helpers/admin_helper.rb`
- Create: `app/views/admin/shared/_nav_item.html.erb`
- Modify: `app/views/admin/shared/_sidebar.html.erb`

- [ ] **Step 1: Add `admin_sidebar_nav_groups` in helper**

Append to `app/helpers/admin_helper.rb` (adjust only if class/module name differs) a method that returns an array of groups. Each group: `{ section: String, section_spaced: Boolean, items: Array<Hash> }`. Each item hash keys: `:key` (symbol matching `admin_current_page`, or `nil` for external links), `:path` (symbol for route helper, e.g. `:admin_kois_path`) **or** `:href` for absolute URLs, plus `:label`, `:title`, `:testid`, `:icon`.

Example structure (implement fully in code, not truncated):

```ruby
def admin_sidebar_nav_groups
  [
    {
      section: "Tableau de bord",
      section_spaced: false,
      items: [
        {
          key: :dashboard,
          path: :admin_root_path,
          label: "Tableau de bord",
          title: "Tableau de bord",
          testid: "admin-nav-dashboard",
          icon: :dashboard,
        },
      ],
    },
    {
      section: "Catalogue",
      section_spaced: true,
      items: [
        {
          key: :kois,
          path: :admin_kois_path,
          label: "Catalogue koi",
          title: "Catalogue koi",
          testid: "admin-nav-kois",
          icon: :kois,
        },
        {
          key: :products,
          path: :admin_products_path,
          label: "Materiel et produits",
          title: "Materiel et produits",
          testid: "admin-nav-products",
          icon: :products,
        },
      ],
    },
    {
      section: "Commandes",
      section_spaced: true,
      items: [
        {
          key: :orders,
          path: :admin_orders_path,
          label: "Commandes",
          title: "Commandes",
          testid: "admin-nav-orders",
          icon: :orders,
        },
        {
          key: :payments,
          path: :admin_payments_path,
          label: "Paiements",
          title: "Paiements",
          testid: "admin-nav-payments",
          icon: :payments,
        },
        {
          key: :clients,
          path: :admin_clients_path,
          label: "Clients",
          title: "Clients",
          testid: "admin-nav-clients",
          icon: :clients,
        },
      ],
    },
    {
      section: "Relation client",
      section_spaced: true,
      items: [
        {
          key: :messages,
          path: :admin_messages_path,
          label: "Messages clients",
          title: "Messages clients",
          testid: "admin-nav-messages",
          icon: :messages,
        },
        {
          key: :newsletter,
          path: :admin_newsletter_path,
          label: "Newsletter",
          title: "Newsletter",
          testid: "admin-nav-newsletter",
          icon: :newsletter,
        },
      ],
    },
    {
      section: "Site",
      section_spaced: true,
      items: [
        {
          key: nil,
          href: public_site_url,
          label: "Site public",
          title: "Site public",
          testid: "admin-nav-public-site",
          icon: :public_site,
        },
      ],
    },

def admin_nav_href(path_name)
  send(path_name)
end
```

The partial must use `item[:href]` when `item[:path]` is absent and must never mark the Site public row `active` (`key` is `nil`).

- [ ] **Step 2: Create `_nav_item.html.erb`**

Create `app/views/admin/shared/_nav_item.html.erb` expecting locals: `item` (Hash), `current` (symbol or nil). Implementation sketch:

```erb
<% active = item[:key].present? && current == item[:key] %>
<% href = item[:href].presence || admin_nav_href(item.fetch(:path)) %>
<%= link_to href,
      class: "nav-item#{' active' if active}",
      data: { testid: item[:testid] },
      title: item[:title],
      aria: ({ current: ("page" if active) }.compact) do %>
  <span class="nav-icon" aria-hidden="true">
    <%= render "admin/shared/nav_item_icon", name: item[:icon] %>
  </span>
  <span class="nav-label"><%= item[:label] %></span>
  <%= yield if block_given? %>
<% end %>
```

- [ ] **Step 3: Create icon partial**

Create `app/views/admin/shared/_nav_item_icon.html.erb` with `<% case local_assigns[:name] %>` and one `when` per icon, pasting the **exact** SVG markup from the current `_sidebar.html.erb` for each name (`:dashboard`, `:kois`, `:products`, `:orders`, `:payments`, `:clients`, `:messages`, `:newsletter`, `:public_site`). Keep file under 200 lines; if over, split into `nav_item_icon/_dashboard.html.erb` etc. in a follow-up micro-task.

- [ ] **Step 4: Rewrite `_sidebar.html.erb`**

Replace repeated `link_to` blocks with:

```erb
<% admin_sidebar_nav_groups.each do |group| %>
  <div class="nav-section<%= ' nav-section--spaced' if group[:section_spaced] %>"><%= group[:section] %></div>
  <% group[:items].each do |item| %>
    <% if item[:key] == :messages %>
      <%= render "admin/shared/nav_item", item: item, current: admin_current_page do %>
        <% if admin_unread_messages_count.positive? %>
          <span class="nav-badge" id="msg-count"><%= admin_unread_messages_count %></span>
        <% end %>
      <% end %>
    <% else %>
      <%= render "admin/shared/nav_item", item: item, current: admin_current_page %>
    <% end %>
  <% end %>
<% end %>
```

Remove all `data: { page: ... }` attributes.

- [ ] **Step 5: Manual smoke**

Boot app, visit `/admin` (signed in), `/admin/kois` — confirm sidebar labels, icons, and **one** `.nav-item.active` on the correct row.

- [ ] **Step 6: Commit**

```bash
git add app/helpers/admin_helper.rb app/views/admin/shared/_nav_item.html.erb app/views/admin/shared/_nav_item_icon.html.erb app/views/admin/shared/_sidebar.html.erb
git commit -m "refactor: data-driven admin sidebar nav items"
```

---

### Task 6: Integration test — sidebar active class

**Files:**
- Create: `test/integration/admin_sidebar_nav_test.rb`

- [ ] **Step 1: Write failing integration test**

Create `test/integration/admin_sidebar_nav_test.rb`:

```ruby
require "test_helper"

class AdminSidebarNavTest < ActionDispatch::IntegrationTest
  setup { sign_in users(:one) }

  test "kois index marks only catalogue koi nav item active" do
    get admin_kois_url
    assert_response :success
    assert_select %{a.nav-item.active[data-testid="admin-nav-kois"]}, count: 1
    assert_select "a.nav-item.active", count: 1
  end
end
```

- [ ] **Step 2: Run test**

Run: `ruby -Itest test/integration/admin_sidebar_nav_test.rb`

Expected: PASS after Task 5.

- [ ] **Step 3: Commit**

```bash
git add test/integration/admin_sidebar_nav_test.rb
git commit -m "test: assert single active admin sidebar link on kois index"
```

---

### Task 7: Playwright — public home pill shows `active` on load

**Files:**
- Modify: `tests/e2e/navigation.spec.ts`

- [ ] **Step 1: Add assertion in desktop suite**

Inside the first test `desktop nav exposes the main entries`, after `await expect(page.getByTestId("nav-home")).toBeVisible();`, add:

```ts
await expect(page.getByTestId("nav-home")).toHaveClass(/active/);
```

This documents that `header-nav.js` marks the home pill on `/`.

- [ ] **Step 2: Run Playwright for this file**

Run: `npx playwright test tests/e2e/navigation.spec.ts --project=chromium`

(Adjust project name to match `playwright.config` if different.)

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/navigation.spec.ts
git commit -m "test(e2e): expect nav-home active class on home page"
```

---

## Spec coverage checklist (self-review)

| Spec section | Task |
|--------------|------|
| Shared tokens module | Task 1 |
| Visitors molecule imports tokens | Task 1 |
| Admin consumes tokens for active surface | Task 2 |
| Public partial reusable / shared path | Task 3 |
| Admin sidebar loop + partial | Task 5 |
| `admin_current_page` unknown → nil + dev warn | Task 4 |
| Remove misleading `data-page` | Task 5 |
| Public test / E2E for nav | Task 7 |
| Admin mapping / HTML test | Tasks 4, 6 |
| Turbo permanent compatibility | No HTML structure change to `#site-header` in this plan |
| File length ≤ 200 lines | Split `_nav_item_icon` if needed before merge |

---

## Plan complete and saved to `docs/superpowers/plans/2026-05-13-navigation-pill-reuse.md`. Two execution options:

**1. Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
