# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project

The Chef Cafe is a React 19 + TypeScript single-page website built with Vite 8. It uses GSAP and Three.js for motion/3D effects. The current `src/App.tsx` is still the stock Vite starter template — the cafe content, animations, and 3D scenes are the work in progress.

## Commands

All commands run from the project root (`D:\Demo website\The Chef Cafe`). Node is available; `node_modules` is already installed.

- `npm run dev` — start the Vite dev server (HMR on, serves at `http://localhost:5173`).
- `npm run build` — type-check both TS projects then build: `tsc -b && vite build`. Output goes to `dist/`.
- `npm run lint` — run oxlint (`oxlint`).
- `npm run preview` — serve the built `dist/` for review.
- No test runner is configured yet. There is no test command.

## Build / type-check details

- `tsconfig.json` is a project-reference root with `files: []` referencing `tsconfig.app.json` and `tsconfig.node.json`. `tsc -b` (used by the build script) compiles both.
- `tsconfig.app.json` covers `src/` (JSX `react-jsx`, `moduleResolution: bundler`, `types: ["vite/client"]`).
- `tsconfig.node.json` covers `vite.config.ts` (`module: nodenext`).
- Both enforce strict lint flags: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`.
- `verbatimModuleSyntax: true` is on in both — type-only imports must use `import type`, and imports must be usable at runtime (no eliding side-effect imports).
- `vite.config.ts` only registers `@vitejs/plugin-react` (Oxc-based). No CSS framework is configured; styles are plain CSS modules/`src/*.css` with CSS custom properties for theming.

## Source layout

- `index.html` is the entry; it loads `/src/main.tsx` into `#root`.
- `src/main.tsx` — mounts `<App/>` under `React.StrictMode`.
- `src/App.tsx` — single root component (currently the Vite counter/hero template).
- `src/App.css`, `src/index.css` — global styles. `index.css` defines the `:root` theme tokens and dark-mode overrides.
- `src/assets/` — `hero.png`, `react.svg`, `vite.svg`.
- `public/favicon.svg`, `public/icons.svg` — referenced from markup as `/favicon.svg` and `/icons.svg#<symbol-id>`.

## Key dependencies

- `react` / `react-dom` ^19.2.8 — React 19 APIs (`createRoot`, no legacy JSX runtime).
- `vite` ^8.3.0 + `@vitejs/plugin-react` ^6.1.1 — dev server + Oxc transform.
- `gsap` ^3.15.0 — motion. Any GSAP plugin must be imported from `gsap` and registered with `gsap.registerPlugin(...)`.
- `three` ^0.186.1 — 3D scenes.
- `oxlint` ^1.81.0 — the only linter. `.oxlintrc.json` enables `react`, `typescript`, `oxc` plugins; `react/rules-of-hooks` is an error, `react/only-export-components` is a warn.

## Conventions to follow

- Use functional components and hooks only; `react/rules-of-hooks` is enforced as an error.
- Prefer relative imports with `.ts`/`.tsx` extensions where the bundler expects them; the tsconfig allows `allowImportingTsExtensions`.
- Keep `src/App.tsx` as the single app root; new top-level feature components go under `src/components/` (not yet present — create it when adding cafe content).
- GSAP/Lenis animation wiring is expected to live in `src/animations/index.ts`, invoked from `App.tsx`'s `useEffect` (per project memory). Verify the file exists before relying on it — it is part of the upcoming work, not the current template.