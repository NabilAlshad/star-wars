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

/src
/components → Reusable UI components
/pages → Route-specific views
/styles → Tailwind and Sass styles
/assets → Static assets (images, fonts)
/utils → Helper functions and constants
/tests → Unit/integration test files
index.tsx → Entry point

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
