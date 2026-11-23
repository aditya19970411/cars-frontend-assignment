# Notes

## What I completed

### Required items
- **List the cars**: Built the inventory view fetching cars via Apollo Client and the `GetCars` GraphQL query.
- **Responsive images**: Built `<CarImage>` using the native HTML5 `<picture>` element with `<source>` elements matching the exact breakpoints:
  - Mobile (≤639px): fallback `<img>` with mobile asset
  - Tablet (640–1023px): `<source media="(min-width: 640px)">`
  - Desktop (≥1024px): `<source media="(min-width: 1024px)">`
- **Material UI presentation**: Implemented UI components using MUI (Cards, Chips, responsive Grid, Dialog, TextField, Select, Breadcrumbs, Skeletons, and Alerts). Full handling of loading (skeletons), error (alert with retry), empty states, and validation failures.
- **Create a car**: Added a modal form (`<CreateCarDialog>`) that submits via the `CreateCar` mutation.
- **Apollo cache updates**: After mutation, the Apollo cache is updated directly with `cache.writeFragment` and `cache.modify`, so the new car appears immediately in the UI without requiring a reload.
- **Validation**: Form validates client-side (required make, model, year, color) and handles server-side `BAD_USER_INPUT` errors gracefully.
- **Search and sort**: Search by model and sort by 5 orders (Year: Newest first, Year: Oldest first, Model: A to Z, Model: Z to A, Make: A to Z).
- **`useCars()` hook**: Encapsulated all `GetCars` data-fetching logic inside `useCars({ variables })`, keeping components clean and purely presentational.
- **Tests**: Replaced example tests with comprehensive unit and integration tests (23 passing tests across 7 test suites).

### Optional items ("If you have time")
- **Server-side filtering**: Filtering variables (`model`, `year`) are passed directly to `GetCars` instead of filtering client-side.
- **Year filter**: Added year filter dropdown and combined all filter/sort logic into a reusable `useCarFilters()` hook.
- **Debounced search input**: Added `useDebounce()` to debounce search text (300ms) while keeping input responsive.
- **Car detail route**: Added route `/cars/:id` utilizing the `GetCar` query, displaying full specs, breadcrumbs, back navigation, and not-found states.
- **Accessibility**: Keyboard navigable (Escape to close dialog, Enter to submit, proper tab order), labeled controls (`aria-label`, `htmlFor`), live regions (`aria-live="polite"` for result counts), and semantic HTML landmarks (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`).

---

## What I left out, and why

- **Pagination & infinite scrolling**: With 6 seed cars (and modest additions in mock memory), client-side rendering with responsive grid is optimal and introduces no pagination overhead. If the database grew, cursor-based pagination would be added.
- **Filter persistence in URL search params**: Kept filter state in `useCarFilters` to keep the hook focused and avoid syncing quirks during rapid debounced typing.
- **Custom file upload**: The mock environment uses local SVGs in `public/images/`. Added preset selection for newly created cars to guarantee valid responsive SVG assets.

---

## Decisions and trade-offs

- **Architecture (Bulletproof React)**: Feature-scoped code lives under `src/features/cars/` (`api/`, `components/`, `hooks/`, `types/`). Shared agnostic components live in `src/components/ui/`, and shared hooks in `src/hooks/`.
- **Apollo Cache Strategy**:
  - Direct cache update via `cache.modify` and `cache.writeFragment` ensures immediate optimistic-like UI feedback.
  - Added `refetchQueries: ["GetCars"]` to ensure active server-filtered queries reconcile with the mock DB.
- **Server vs Client Filtering & Sorting**:
  - Filter parameters (`model`, `year`) are sent to the GraphQL query (`GetCars`) as supported by `docs/schema.graphql` and `handlers.ts`.
  - Sorting is applied on the client as the schema does not define a sort argument.
- **Responsive Images**:
  - Used native `<picture>` over CSS background images or JS window resize listeners. This leverages browser engine optimizations, avoids layout shifts, supports `loading="lazy"`, and guarantees accessibility via standard `alt` attributes.
- **Testing Approach**:
  - Unit tests verify pure logic and isolated component contracts (`useDebounce`, `useCarFilters`, `CarImage`, `CreateCarDialog`).
  - Integration tests run against the MSW mock server and real Apollo Client (`cars.integration.test.tsx` and `car-detail.integration.test.tsx`), verifying user flows, network errors, cache updates, and edge cases.
- **Defensive Event & Parameter Handling**:
  - Wrapped `refetch()` invocations in parameterless handlers (`() => { void refetch(); }`) so React synthetic click events (`HTMLButtonElement`) are never passed as GraphQL variables, avoiding circular JSON serialization errors during retries.

---

## If I had another day

1. **URL search params**: Sync filter and sort state with URL query parameters (`/cars?model=...&year=...`) for bookmarkable and shareable links.
2. **Edit and delete mutations**: Add `updateCar` and `deleteCar` operations to support full CRUD lifecycle with optimistic UI updates.
3. **Dark / Light theme switcher**: Add toggle in the header leveraging MUI's theme palette.
4. **End-to-end testing**: Add Playwright test suite for cross-browser testing across actual viewport widths to visually confirm breakpoint shifts.

---

## Anything you should know to run it

- No extra dependencies or deviations from standard setup:
  - `npm install`
  - `npm run dev` (starts on port 3000)
  - `npm run verify` (runs lint, typecheck, test, and build)
- Routes:
  - `/`: Main vehicle inventory with search, filters, sorting, responsive cards, and add car modal.
  - `/cars/:id`: Vehicle specification and detail view.
  - `/brief`: The original assessment brief and health check.
