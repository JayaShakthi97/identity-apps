# Console Vite Migration - Runtime Verification Summary

## Current Status

- Vite build is successful in both:
  - default mode (JSP/Tomcat style)
  - static + preauth mode (`SERVER_TYPE=static`, `PRE_AUTH_CHECK=true`, `APP_BASE_PATH=app`)
- Default mode runtime validation is completed:
  - Vite dev server flow verified.
  - Tomcat deployment flow verified after login/navigation checks.
- Static + preauth mode build output is verified as correct (runtime validation pending).
- Required top-level build structure is present in both modes.
- Root compatibility artifacts are present:
  - `*.worker.js`
  - `ai-banner-background-white.*.svg` (+ `.gz`/`.br`)
  - `auth-spa-3.1.2.min.js` (+ `.gz`/`.br`)
  - static mode root `index.html` (+ `.gz`/`.br`)

## Important Note (Intentionally Skipped for Now)

- We are **not enforcing exact compressed artifact count parity** (`.gz`/`.br`) with webpack.
- Reason:
  - Vite and webpack produce different bundle graphs/chunking.
  - Compression output depends on size/ratio and emitted file set.
  - Exact count parity is not required for functional/runtime parity in most deployments.

## Why `static/media` Count Is Smaller in Vite

This is expected and can be valid because:

1. Vite may inline smaller assets as data URLs.
2. SVGs imported as React components become JS, not emitted media files.
3. Rollup tree-shaking/deduping changes emitted asset count.
4. Some assets are served from copied folders (`libs`, `resources`) instead of `static/media`.

This is not automatically a bug if runtime references resolve correctly.

## Runtime Verification Checklist

## 1) Default Mode (JSP/Tomcat-style)

Environment:
- `SERVER_TYPE` unset or non-static
- `PRE_AUTH_CHECK` unset or `false`

Verify:
- App loads from `/console`.
- `index.jsp`, `home.jsp`, `auth.jsp` resolve correctly.
- Browser console has no 404s for JS/CSS/media.
- Login and navigation flows work.
- Worker-dependent behavior works (timer/session related behavior).
- Branding assets/icons load (no broken images).
- Status: completed in both dev and Tomcat deployment.

## 2) Static + Preauth Mode

Environment:
- `SERVER_TYPE=static`
- `PRE_AUTH_CHECK=true`
- `APP_BASE_PATH=app`

Verify:
- Root `index.html` preauth handoff works.
- App loads from `/app`.
- `deployment.config.json` has `appBaseName: "app"` in build output.
- Deep-link refresh works under `/app/*` with your static server rewrite rules.
- Browser console/network has no critical 404s.
- Status: build structure validated; runtime verification still pending.

## 3) Compression Delivery Check

Verify on deployed server (not just file presence):
- `Content-Encoding: gzip`/`br` is served when supported by client.
- Fallback to uncompressed file works when encoding is not negotiated.
- No incorrect `Content-Type` for compressed responses.

## Sample Media Paths to Verify

Use these as spot-check targets during runtime/network validation:

- `build/console/static/media/ai-banner-background-white.F6Tkc_Ta.svg`
- `build/console/static/media/account-lock.BdWVgDSt.svg`
- `build/console/static/media/account-recovery-illustration.CEZNHcG4.svg`
- `build/console/libs/themes/default/assets/images/branding/logo-mini.svg`
- `build/console/libs/themes/default/assets/images/branding/logo-white.svg`
- `build/console/libs/themes/default/assets/images/app-icon-background.png`
- `build/console/resources/applications/assets/images/illustrations/mobile-template.svg`
- `build/console/resources/applications/assets/images/illustrations/salesforce.png`

## Known Non-Blocking Deltas vs Webpack

- Different hashed filenames/chunk names.
- Different `static/js` and `static/media` file counts.
- Some same-path files have size/content differences due to different bundling pipeline.
- Compressed artifact count differs (intentionally accepted for now).

## Important Fix Applied - Legacy Template Placeholders

- Issue observed: legacy placeholders leaked into generated `index.jsp`/`home.jsp`/`index.html`/`auth.html`.
- Root cause: build assembler originally handled only simple placeholder keys, not expression-style placeholders (ternaries/concatenations).
- Implemented fix:
  - Source templates now use neutral `buildOptions.*` placeholders.
  - Template rendering evaluates `<%= ... %>` expressions referencing `buildOptions`.
  - Build fails fast if any `buildOptions.*` token remains unresolved in generated shell files.
- Runtime impact if unresolved:
  - Broken script/link URLs (e.g., `startup-config.js`, `auth-spa`, extension scripts), leading to 404s and login/runtime failures.

## Noted Drifts and Likely Reasons

### i18n JSON files (same path, larger content in Vite)

Possible reasons:

1. Different JSON serialization/minification behavior between webpack and Vite pipeline.
2. Additional keys included due to build/copy sequencing differences.
3. Different post-processing stages resulting in fuller copied bundles.

### Theme / login layout CSS files (same path, different size)

Possible reasons:

1. Different CSS processing behavior (ordering, minification, comments, prefixes).
2. Slightly different theme artifact generation/copy behavior.
3. Different optimizer behavior between webpack and Vite/Rollup.

### Root hashed filename differences (worker/banner)

Possible reasons:

1. Hashes are content-based and toolchain output differs.
2. Bundle graph/chunking differences naturally produce different hash names.

This is expected unless a deployment contract requires exact filename matching.

## Future Summary Checklist (Recommended)

For future migrations, include these in runtime verification summaries:

1. Build-mode matrix: which env combinations were validated.
2. Folder-structure parity: top-level and critical deploy paths.
3. Critical artifacts: JSP/HTML shells, worker, auth script, config files.
4. Compression behavior: presence + server delivery validation.
5. Asset validation: sample media paths for network/runtime checks.
6. Known deltas: count differences, hash differences, content-size drift.
7. Risk notes: what is non-blocking vs what must be fixed.
8. Final acceptance criteria tied to runtime behavior.

## Mid-Term and Long-Term Fix Plan (for Template Cleanup)

### Mid-Term

1. Keep source JSP/HTML on neutral `buildOptions.*` placeholders and avoid bundler-specific template namespaces.
2. Keep all token replacement in one Vite build assembler path (`assemble-vite-build.js`) with strict validation.
3. Add CI verification that scans build outputs and fails on unresolved legacy template markers.

### Long-Term

1. Reduce JSP role to Tomcat-specific server logic only (auth forwarding, tenant/proxy context).
2. Move frontend runtime values to `startup-config.js` / `config.js` / `deployment.config.json` as the source of truth.
3. Keep static mode fully Vite-native (`index.html`) and avoid bundler-coupled template syntax in source files.
4. Optionally migrate from placeholder-expression templates to dedicated minimal server/runtime config contracts.

## Final Acceptance Criteria

Treat migration as accepted if:

1. Both build modes pass.
2. Required deploy structure is present.
3. Runtime functional flows pass in default mode and static mode target environments.
4. No critical network/runtime errors appear in browser/server logs.
