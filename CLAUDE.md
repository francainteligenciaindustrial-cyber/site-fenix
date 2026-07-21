# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static, single-page marketing site for **Academia Fênix BBU**, a gym in Barra do Bugres/MT, Brazil. Plain HTML/CSS/JS — no framework, no build step, no package manager, no test suite.

## Development

There is no build/lint/test tooling. To work on the site:

- Open `index.html` directly in a browser, or serve the folder with any static server (e.g. `npx serve .` / VS Code Live Server) if you need clean relative-path behavior.
- Changes to `css/style.css` or `js/main.js` take effect on a page reload — no compilation step.
- There is no linter or test runner configured; verify changes by opening the page and checking the affected section/breakpoint in a browser.

## Architecture

The whole site is one page (`index.html`) built from stacked `<section>` blocks in this order: Header/nav → Hero → Sobre (About) → Modalidades → Diferenciais → Planos → Horários → Contato → Footer, plus a floating WhatsApp button. Navigation is anchor-based (`#sobre`, `#modalidades`, etc.) — there are no separate routes/pages.

- `index.html` — all markup and content for every section.
- `css/style.css` — all styling, organized as one block per section matching the HTML order, driven by CSS custom properties defined at the top of the file (`:root`).
- `js/main.js` — small vanilla-JS behaviors, no dependencies: header scroll state + scroll progress bar, mobile nav (hamburger) toggle, and scroll-triggered reveal animations via `IntersectionObserver` (elements tagged with the `.reveal` class).
- `assets/img/` — image assets referenced by the page (logo, hero background, about-section photo). Reference these by their existing names (`logo.jpg`, `fenix-fogo.jpg`, `foto-casal.jpg`) rather than introducing new ones unless replacing content.

### Design system

Colors, fonts, and spacing tokens live as CSS custom properties in `css/style.css` (`:root`): a black/near-black base (`--black`, `--black-soft`, `--charcoal`) plus a flame gradient (`--red` → `--orange` → `--yellow`, combined into `--flame-gradient` / `--flame-gradient-soft`) pulled from the gym's logo. Headings use `Bebas Neue`; body text uses `Poppins` (both loaded from Google Fonts in `index.html`). Reuse these variables and the existing `.gradient-text`, `.btn--primary` / `.btn--ghost`, and card component classes instead of introducing new one-off colors or button styles.

### Content notes

- Contact info (address, phone/WhatsApp number, Instagram handle, operating hours) is hardcoded inline across the Hero CTA, Contato section, and footer — if one changes, grep for the phone number (`556596233084` / `65-99623-3084`) and address string to update all occurrences consistently.
- The WhatsApp links use `wa.me` URLs with pre-filled `text=` query params per CTA context (e.g. different message per plan card) — keep new CTAs consistent with this pattern.
- Pricing plans (Mensal/Trimestral/Anual) intentionally show no prices — cards link to WhatsApp ("Falar com a equipe") instead, since real pricing wasn't available when built. Don't invent price numbers; keep the CTA-only pattern unless the user supplies real values.
