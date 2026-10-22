# Codrington International LLC

A React website for Codrington International LLC and its business divisions. Official tagline: “Serving with purpose, leading with integrity.”

The three divisions represented are Veteran Warrior Believer; Faith-Based Apparel, including Facebeat Apparel as a distinct unisex apparel brand; and Books & Publishing. The current site provides company and division information, navigation, catalog empty states, and a contact form UI. Product purchasing and contact delivery depend on integrations that are not configured in this project.

## Technology

Versions below are the ranges recorded in `package.json`; use `package-lock.json` for the resolved dependency tree.

- Vite `^8.3.4`; `@vitejs/plugin-react` `^6.1.2`
- React and React DOM `^19.3.1`
- TypeScript `~6.0.3`
- React Router DOM `^7.18.4`
- Tailwind CSS `^4.3.3`, with `@tailwindcss/vite` `^4.3.3`
- Framer Motion `^14.5.0`
- Lucide React `^1.61.0` (installed but currently not imported by application source; evaluate separately before removing the direct dependency)
- ESLint `^10.13.0`, `typescript-eslint` `^8.71.2`

Use Node.js 20.19+ or 22.12+ for Vite 8. The lockfile is npm lockfile version 3. The local environment used Node 24.12.0 and npm 11.6.2 during project verification; those are observations, not additional project constraints.

## Install and Run

From the project root:

```sh
npm install
npm run dev
```

`npm install` installs dependencies and reconciles the lockfile. For reproducible CI or deployment installs, use `npm ci` to install exactly from `package-lock.json`. The Vite development server prints its local URL when ready.

## Build and Validation

```sh
npm run build
npm run lint
npm test
npm run test:e2e
npm run preview
```

- `npm run build` runs TypeScript project builds (`tsc -b`) followed by `vite build`.
- `npm run lint` runs ESLint over the project.
- `npm test` runs the focused Vitest unit tests in `tests/` using jsdom.
- `npm run test:e2e` runs Playwright browser tests in installed Chrome. It starts the Vite dev server on port 4173 and uses a synthetic contact endpoint intercepted by the tests; no real messages are sent.
- `npm run preview` serves the already-built production output locally. Run `npm run build` first.
- Vite's current output directory is `dist/` (default; no `build.outDir` override is set in `vite.config.ts`).

Playwright uses the locally installed Chrome executable at `C:/Program Files/Google/Chrome/Application/chrome.exe`; update `playwright.config.ts` if the browser is installed elsewhere. The E2E viewport checks cover the homepage, contact, Facebeat, and books pages at 320, 375, 430, 768, 1024, 1280, 1440, and 1920 pixels. These tests are not a substitute for cross-browser, production-host, or manual visual/accessibility review.

## Project Structure

- `index.html`: document language, base title/description, theme color, and favicon reference.
- `public/`: copied static files, including `favicon.svg`, `icons.svg`, and empty image-category folders under `images/`.
- `src/main.tsx`, `src/App.tsx`: React entry point and app/router integration.
- `src/app/router.tsx`: React Router route definitions.
- `src/components/layout/`: shared `SiteLayout`, `SiteHeader`, `SiteFooter`, and navigation data.
- `src/components/shared/`: reusable `ActionLink`, `DivisionDirectory`, `DivisionHero`, and `SectionHeading`.
- `src/components/ui/`: reserved directory; no implemented shared UI component is currently present.
- `src/data/divisions.ts`: division names, summaries, destinations, and actions.
- `src/features/`: page implementations organized by about, apparel, books, contact, divisions, home, shared not-found, and veteran sections. Apparel and books have reusable grid components; contact has service, validation, and form modules.
- `src/index.css`: Tailwind import, theme tokens, global styles, layout/component styles, responsive breakpoints, and `.route-frame` styles used by the not-found page.
- `vite.config.ts`: React and Tailwind Vite plugins. No provider-specific deploy configuration or path base is set.
- `package.json` and `package-lock.json`: scripts, declared dependency ranges, and npm resolution.
- `tsconfig*.json` and `eslint.config.js`: TypeScript and lint configuration.

Some directories contain only `.gitkeep` placeholders. `src/assets/hero.png`, `src/assets/react.svg`, and `src/assets/vite.svg` are present but are not referenced by application source. The division hero photos are external Unsplash URLs in the relevant page components; they are not currently local assets under `public/images/`.

## Routes

Routes are defined in `src/app/router.tsx`. All application pages render inside the shared `SiteLayout`; an unknown path renders `NotFoundPage`.

| Path                        | Page component               | Purpose / current state                                                                                                                             |
| --------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                         | `HomePage`                   | Company introduction, tagline, division directory, contact call to action.                                                                          |
| `/about`                    | `AboutUsPage`                | Company overview and division directory.                                                                                                            |
| `/apparel/facebeat`         | `FacebeatApparelPage`        | Facebeat brand introduction and apparel catalog empty state. This is the navigation's “Facebeat Apparel” destination; there is no `/apparel` route. |
| `/apparel/shop`             | `ShopApparelPage`            | Apparel catalog status page with an empty-state message. No products or purchasing integration are present.                                         |
| `/books-publishing`         | `BooksPublishingPage`        | Division introduction and verified-book catalog empty state.                                                                                        |
| `/divisions`                | `DivisionsPage`              | Directory of the three business divisions.                                                                                                          |
| `/contact`                  | `ContactUsPage`              | Contact information context and form. Message delivery requires an external service.                                                                |
| `/veteran-warrior-believer` | `VeteranWarriorBelieverPage` | Division introduction and verified-content empty state.                                                                                             |

`SiteLayout.tsx` also contains per-route titles and descriptions updated on client-side navigation. The not-found route is registered with `*` and has a not-found page; the host still needs an SPA fallback for direct navigation to application routes.

## Shared Components

- `SiteHeader`: company lockup, desktop links, responsive menu toggle, Escape-key dismissal, and menu-link dismissal.
- `SiteFooter`: company and division navigation plus current-year copyright.
- `siteNavigation.ts`: primary and apparel navigation destinations.
- `ActionLink`: shared React Router link styled in primary, secondary, light, and outline-light variants.
- `DivisionDirectory`: maps the shared division data into linked summaries.
- `DivisionHero`: reusable division hero image/copy/action layout, with a Framer Motion entrance that respects reduced-motion preference.
- `SectionHeading`: repeated section hierarchy styling.
- `ContactForm`: required-field/email validation, pending state, and success/error feedback. Its success state is shown only after the configured endpoint responds successfully.
- `ProductGrid` and `BookGrid`: render typed entries when data is provided; currently render explicit empty states.

There are no modal/dialog components in the current implementation. The not-found page is `src/features/shared/NotFoundPage.tsx`; it uses route-frame styles from `src/index.css` and is not a reusable `RouteFrame` component.

## Design System

The existing source of truth is `src/index.css`; do not add another token system. It defines Tailwind theme entries and matching root custom properties:

- Burgundy `#6A1B3B` (`--color-burgundy`)
- Gold `#C8A24A` (`--color-gold`)
- White `#FFFFFF` (`--color-white`)
- Black `#171717` (`--color-black`)
- Silver `#C0C0C0` (`--color-silver`)

The site uses Aptos/Segoe UI sans-serif fallbacks and an Iowan Old Style/Palatino/Georgia display stack. Global spacing and width tokens include `--page-gutter` and `--content-width` (76rem); `.site-container` applies the shared centered width. Shared link/button appearances are implemented in the stylesheet alongside component selectors such as `.action-link`.

Responsive breakpoints in `src/index.css` are 68rem, 58rem, 44rem, 42rem, and 22rem, plus `prefers-reduced-motion: reduce`. The root document has a 20rem minimum width. Preserve these existing breakpoints unless a measured layout problem warrants a focused adjustment. The source currently uses the required brand colors and tagline, though supporting neutrals may also appear in component styling.

## Content Update Workflow

Most page copy is in the corresponding page component under `src/features/`; division directory content is centralized in `src/data/divisions.ts`.

- Company descriptions and homepage copy: edit `src/features/about/AboutUsPage.tsx` or `src/features/home/HomePage.tsx` respectively, using owner-approved text.
- Division descriptions and links: update `src/data/divisions.ts`; keep route destinations synchronized with `src/app/router.tsx`.
- Navigation labels and destinations: update `src/components/layout/siteNavigation.ts`. Check both header and footer after changes.
- Page title/description: update the matching entry in `pageMetadata` in `src/components/layout/SiteLayout.tsx`; keep the base metadata in `index.html` accurate for the initial document load.
- Apparel: add only owner-verified entries to `ProductGrid` data/props. The current `public/images/apparel` folder has no product photographs; the generic remote hero image is not a product asset. Before the catalog is complete, supply an authorized primary photograph for each real product, a stable product identifier, approved name and description, brand/category assignment, and meaningful alt text. Supply price/currency, sizes/colors, and availability only when verified; provide a product-detail URL only after that route exists. Names/options/prices alone do not implement checkout; add a purchasing integration only after its requirements and provider are approved.
- Books: add only verified title/author details and approved covers to `BookGrid` data/props. Do not infer publication information.
- Images/logo: use approved files in the appropriate `public/images/apparel`, `books`, `branding`, or `veteran` folder, then reference them by public-root path. Check alt text, crop, loading priority, and image rights. Replace the text lockup only when the official logo asset and usage guidance are supplied. The current favicon is an initial mark, not evidence of an official logo.
- Contact details: update `ContactUsPage.tsx` only from information supplied and verified by the business. Review privacy wording if personal data collection or a service changes.

Do not create prices, testimonials, catalog details, contact channels, or company claims to fill empty sections.

## Environment and External Services

The code reads `VITE_CONTACT_ENDPOINT` in `src/features/contact/contactService.ts`. It must be an absolute HTTPS URL for a service that accepts the form's JSON POST request and allows the deployed origin through CORS. The client rejects non-HTTPS URLs and URLs containing embedded credentials. This variable is public configuration, not a secret: Vite exposes `VITE_*` values in client bundles. No endpoint value is configured in this workspace, so message delivery is unavailable and the form reports an error.

When configured and submitted, the form sends the visitor's full name, email address, subject, and message to that endpoint. The endpoint/service operator receives this data. This frontend validates required fields and basic email shape only; it cannot enforce authoritative validation, spam/rate limiting, storage limits, access controls, retention, or deletion. Those controls and the privacy notice/data-handling terms must be supplied by the service operator and approved by the business before accepting real inquiries. Never put mail-provider credentials or private tokens in frontend variables.

The division pages reference Unsplash-hosted images. Loading them sends a request to Unsplash, which can receive ordinary connection metadata such as the visitor's IP address and request headers. No analytics, product checkout, CMS, or other server integration is configured. No provider environment variable names are confirmed beyond `VITE_CONTACT_ENDPOINT`.

## Deployment

No hosting platform, production URL, custom domain, or deployment process is confirmed in this project. Do not assume a provider. Once selected, configure the provider to run `npm run build`, publish `dist/`, and rewrite unknown application paths to `/index.html` for React Router. Configure HTTPS and review provider-supported security headers, including HSTS after HTTPS is active, `X-Content-Type-Options: nosniff`, a suitable `Referrer-Policy`, a restrictive `Permissions-Policy`, and a CSP compatible with the site's scripts, styles, and Unsplash images. These headers are not set by this Vite project and are not verified as deployed. Set only approved public build variables and test direct route loads and refreshes after deployment. There are no provider-specific deployment files in this repository.

## Safe Development and Release Workflow

1. Inspect the working tree and current branch before editing. This workspace snapshot did not include Git metadata; use Git status when working from the actual repository clone.
2. When Git is available, create a separate task branch and preserve existing user changes.
3. Make a focused change using the current feature/component/data ownership.
4. Run relevant checks, then `npm run build` and `npm run lint`.
5. Review changed files and the final diff; do not commit, push, or deploy unless explicitly intended and authorized.
6. Test affected routes, links, forms, and representative responsive widths in a browser.
7. Review `dist/` and use `npm run preview` to check the production bundle locally.
8. Deploy only using the confirmed provider process and approved production settings.
9. Verify the live routes, assets, form integration, HTTPS, and runtime behavior after deployment.
10. Keep the previous known-good release or provider rollback option available; confirm the host's actual rollback capabilities rather than assuming them.

## Known Limitations and Handover

**Confirmed current limitations**

- Contact submission requires `VITE_CONTACT_ENDPOINT`; no value/service is configured here, so actual message delivery is unavailable and unverified.
- Apparel products, prices, options, and purchasing details have not been supplied; no checkout integration exists.
- Verified publication titles, authors, and cover assets have not been supplied.
- Approved official company logo and local division photography have not been identified. The hero photos are external Unsplash resources; check approval and availability before public launch.
- No hosting provider, production URL, domain, analytics, `robots.txt`, sitemap, canonical URL, or social sharing metadata is configured/confirmed.
- No automated project test suite is present. A previous local preview check covered route HTTP responses, not a live deployment or cross-browser certification.
- Git metadata was unavailable in the inspected workspace, so no status/history/remote details can be documented.

**Recommendations, not confirmed failures**

- After the business supplies a real domain, evaluate canonical/social metadata and whether to publish a sitemap and indexing policy.
- Add automated route/form tests and cross-browser checks if they fit the team's release process.
- Prefer approved optimized local images where appropriate, with owner-confirmed rights and descriptive alt text.
- Establish a provider-backed release/rollback procedure after the hosting provider is selected.
