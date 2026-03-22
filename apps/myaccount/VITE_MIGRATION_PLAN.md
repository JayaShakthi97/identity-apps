# My Account Vite Migration Plan (Based on Console Lessons)

## Summary
Migrate `apps/myaccount` from webpack to Vite while preserving current deployable structures for both:
1. Default JSP/Tomcat mode (`/myaccount`)
2. Static + preauth mode (`SERVER_TYPE=static`, `PRE_AUTH_CHECK=true`, `APP_BASE_PATH=app`)

Create this plan as: `apps/myaccount/VITE_MIGRATION_PLAN.md`.

## Implementation Changes
1. Baseline capture before changes
- Capture webpack build output trees for default mode and static+preauth mode (`find apps/myaccount/build/myaccount -maxdepth 2 -mindepth 1 | sort`).
- Capture key artifact expectations: `WEB-INF`, JSP/HTML shells, `resources/i18n`, `libs/themes`, `static/js`, `static/media`, `auth-spa` and compressed siblings.
- Capture runtime route behavior baseline for dev and deployed modes (`/myaccount`, tenant-aware paths, static `/app`).

2. Vite build scaffolding
- Add `apps/myaccount/vite.config.ts` modeled on console migration patterns.
- Add `apps/myaccount/src/init/vite-entry.ts` as Vite entry bridge (polyfills/shims first, then app init imports).
- Add `apps/myaccount/scripts/build/resolve-build-mode.js` for mode resolution from env (`SERVER_TYPE`, `PRE_AUTH_CHECK`, `APP_BASE_PATH`).
- Add `apps/myaccount/scripts/build/assemble-vite-build.js` to assemble final deployable structure around Vite output.
- Update `apps/myaccount/project.json` targets:
  - `build-base`: `vite build` + `assemble-vite-build.js`
  - `serve-base`: Vite dev server command
- Keep `build-prepare` and existing `prebuild` flow unchanged initially.

3. Vite config behavior parity
- Build output paths:
  - JS chunks/entries into `static/js`
  - assets into `static/media`
  - worker naming parity (`[hash].worker.js`)
- Dev server parity:
  - HTTPS enabled
  - base-path and tenant-aware rewrites (`/myaccount`, `/t/<tenant>/myaccount`, `/o/<org>/myaccount`, combined variants)
  - deep-link fallback handling
  - root redirect to app base path
- Template/runtime compatibility plugins:
  - SVG `ReactComponent` import compatibility
  - legacy worker import compatibility
  - `global`/Buffer/browser polyfill compatibility for packages expecting webpack-like globals
- Dev static middleware parity:
  - serve `/resources/i18n/**` from module bundle + local meta
  - serve `/libs/**` from theme dist and app login layout sources
- Dev HTML shell parity:
  - load `update.config.js`, `config.js`, `startup-config.js`
  - include LTR and RTL theme stylesheet references
  - include extension stylesheet/head script
  - inject Vite module entry

4. Build assembly parity (production artifacts)
- Copy and filter assets equivalent to webpack behavior:
  - `modules/theme/dist/lib` to `build/myaccount/.../libs` with image filter parity
  - `src/public` with static-mode exclusion of Java EE folders (`WEB-INF`)
  - `modules/i18n/dist/bundle` and local `meta.*.json` to `resources/i18n`
  - login layout assets and any myaccount-specific copied resources
  - preserve current `auth.jsp` handling used by myaccount build (copied from console source path)
- Render shell templates:
  - default mode: render `index.jsp` + `home.jsp`
  - static+preauth: render root preauth `index.html` + app shell `app/index.html`
- Replace legacy template namespace in myaccount sources from `htmlWebpackPlugin.options.*` to neutral `buildOptions.*`.
- Implement strict fail-fast guard: fail build if unresolved `buildOptions.` tokens remain in emitted shells.
- Inject Vite entry tags from manifest into rendered shells with `type="module"` scripts.
- Generate gzip and brotli artifacts using same threshold/ratio contract used in console migration.
- Copy selected root compatibility artifacts required by existing deploy contracts (worker, key banner/auth assets if referenced by root-level paths).
- Rewrite emitted `deployment.config.json` for static+preauth (`appBaseName`).

5. Webpack removal in myaccount (after parity)
- Remove `webpack.config.ts` usage from Nx targets.
- Remove webpack-only myaccount dependencies and types (`@types/webpack-env`, webpack-only plugins/loaders no longer needed).
- Update `tsconfig.json` to remove webpack env types.
- Remove webpack-specific wording and placeholder references from comments/docs.
- Add migration summary doc for myaccount similar to console runtime summary.

## Test Plan
1. Build verification matrix
- Default mode build: `pnpm nx run myaccount:build`
- Static+preauth build with env settings (including `APP_BASE_PATH=app`)
- Compare build trees against webpack baseline for both modes.

2. Runtime verification matrix
- Dev mode:
  - `pnpm nx run myaccount:serve`
  - verify `/myaccount`, tenant-aware routes, deep-link refresh, direct URL entry.
- Default deployed mode (Tomcat):
  - verify login flow, post-login navigation, deep links, no critical 404/console errors.
- Static+preauth deployed mode:
  - verify root preauth handoff, `/app` app load, refresh behavior with static rewrites.

3. Artifact and network checks
- `resources/i18n` requests resolve with expected meta hash behavior.
- `libs/themes` LTR and RTL CSS and branding assets load.
- extension scripts/styles load from expected paths.
- worker file loads and executes.
- compressed artifacts served correctly by target server (`Content-Encoding` negotiation).

## Assumptions and Defaults
1. Migration scope is only `apps/myaccount` (no cross-app refactors beyond required shared scripts).
2. Preserve existing deployment contracts and folder structures; exact hash names/file counts need not match webpack.
3. Start with parity-first approach (functional/runtime parity over immediate optimization).
4. Static+preauth behavior must match current webpack semantics used by `prepare-static-build.js`.
5. Any build/run verification commands are executed manually by you and results are fed back for incremental adjustments.
