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
