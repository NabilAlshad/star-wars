## Installation Guide

### 1. Clone the repository

```bash
git clone <repository-url>
cd red-it

```

### 2. Install dependencies

```bash
npm install

```

### 4. Build for production

```bash
npm run build
```

### 6. Run tests

```bash
npm run test
```

### 7. Test Coverage

```bash
npm run coverage
```

# Technical Details

---

## Project Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| Framework    | React 19                    |
| Language     | TypeScript 5.8              |
| Bundler      | Webpack 5                   |
| Transpiler   | Babel                       |
| Styling      | TailwindCSS 4, Sass         |
| HTTP Client  | Axios                       |
| Environment  | dotenv                      |
| Testing      | Jest, React Testing Library |
| Icon Library | FontAwesome React           |

---

## Directory Structure (suggested)

- /src
- /components → Reusable UI components
- /pages → Route-specific views
- /styles → Tailwind and Sass styles
- /assets → Static assets (images, fonts)
- /utils → Helper functions and constants
- /tests → Unit/integration test files
- index.tsx → Entry point

---

## Tooling Configuration

### Babel

- Presets:
  - `@babel/preset-env`: For modern JS
  - `@babel/preset-react`: JSX support
  - `@babel/preset-typescript`: TypeScript support

### Webpack

- Supports:
  - Hot Module Replacement via `webpack-dev-server`
  - Babel and TypeScript transpilation
  - SCSS and TailwindCSS
  - HTML template bundling
  - Asset handling via `file-loader`

### TailwindCSS

- Custom config included
- Combined with `postcss` and `autoprefixer`

### TypeScript

- Configured for type safety and IDE support
- Checked separately via `npm run tscheck`

### Testing

- Jest for unit and integration tests
- React Testing Library to simulate user interactions
- `jest-dom` for extended DOM matchers

---

## Scripts Summary

| Command                 | Description                  |
| ----------------------- | ---------------------------- |
| `npm start`             | Starts development server    |
| `npm run build`         | Builds app for production    |
| `npm test`              | Runs all tests               |
| `npm run tscheck`       | Runs TypeScript type checker |
| `npm run test:watch`    | Runs tests in watch mode     |
| `npm run test:coverage` | Runs test coverage report    |

# Rationale Behind Decisions

---

## Frontend Framework: React 19

- **Why**: React's component model provides flexibility and reusability, and version 19 brings performance improvements and modern patterns.
- **Alternatives Considered**: Vue, Svelte – React was chosen for team familiarity and ecosystem support.

---

## TypeScript

- **Why**: Adds static typing, better IDE support, and early error detection.
- **Trade-offs**: Slight learning curve; more setup time vs. plain JavaScript.

---

## Webpack

- **Why**: Industry-standard bundler with powerful plugin system.
- **Alternatives**: Vite, Parcel. Webpack was preferred for full control over configuration.

---

## Babel

- **Why**: Necessary to transpile modern JavaScript, TypeScript, and JSX into compatible browser code.
- **Configuration**: Uses presets for env, React, and TypeScript.

---

## TailwindCSS

- **Why**: Utility-first CSS framework that promotes consistency and rapid development.
- **Alternative**: Styled Components or Sass-only – Tailwind offers better speed and less CSS bloat.

---

## Sass (SCSS)

- **Why**: Enables nesting, mixins, and variables where Tailwind doesn't fit well.
- **Integration**: Works alongside Tailwind via `sass-loader`.

---

## PostCSS + Autoprefixer

- **Why**: Ensures browser compatibility with vendor prefixes.
- **Integration**: Runs through `postcss-loader`.

---

## Testing Stack

- **Jest**: Rich ecosystem and snapshot testing.
- **React Testing Library**: Encourages testing behavior over implementation.
- **jest-dom**: Extends DOM assertions (e.g., `toBeInTheDocument()`).

---

## Axios

- **Why**: Lightweight promise-based HTTP client with interceptors and automatic JSON transformation.
- **Alternatives**: Fetch API (native), but Axios offers a more convenient abstraction.

---

## dotenv

- **Why**: Manages environment variables securely across different environments (dev, staging, prod).

---

## FontAwesome

- **Why**: Provides a comprehensive and scalable icon set integrated easily into React components.
