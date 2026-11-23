# Circonus Product Documentation Project

This repository generates [docs.circonus.com](https://docs.circonus.com/). The site is built from the Markdown files in this repository using [Docusaurus 3](https://docusaurus.io/), a static website generator.

The following Circonus projects are documented here:

| Section  | Source folder | URL path     |
| -------- | ------------- | ------------ |
| Circonus | `circonus/`   | `/circonus/` |
| CAQL     | `caql/`       | `/caql/`     |

IRONdb documentation has moved to [docs.apica.io/irondb](https://docs.apica.io/irondb). The home page links there, and `static/_redirects` sends the old IRONdb URLs to the new site.

## Getting Started

These instructions get a copy of the project running on your local machine for writing and previewing docs.

### Prerequisites

- [Node.js](https://nodejs.org/) **20 or newer** (required by Docusaurus 3)
- [Yarn](https://classic.yarnpkg.com/) 1.x
- Optional: [Prettier](https://github.com/prettier/prettier-vscode) to format Markdown files.

On macOS, with Homebrew:

```bash
brew install node yarn
```

### Installing

```bash
git clone https://github.com/circonus/product-docs.git
cd product-docs
yarn install
```

This project uses **Yarn 1** (version pinned in the `packageManager` field of `package.json`). Use `yarn`, not `npm`, so installs follow the committed `yarn.lock` and the `resolutions` overrides in `package.json`. If you change dependencies, commit the updated `yarn.lock`.

### Running locally

```bash
yarn start
```

This starts a development server at <http://localhost:3000/>. Most changes appear in the browser as soon as you save, without restarting the server.

Expected output:

```text
$ docusaurus start
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
[webpackbar] ✔ Client: Compiled successfully in 3.77s
```

If the browser shows stale or confusing errors after pulling changes or upgrading packages, clear the cache and start again:

```bash
yarn clear && yarn start
```

### Common commands

| Command          | What it does                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `yarn start`     | Runs the local development server.                                                           |
| `yarn build`     | Builds the production site into `build/`. This renders every page and catches errors `yarn start` can miss. |
| `yarn serve`     | Serves the contents of `build/` locally, to check a production build.                        |
| `yarn clear`     | Deletes the Docusaurus cache (`.docusaurus/`) and build output.                              |
| `yarn typecheck` | Type-checks the TypeScript files in `src/`.                                                  |

Run `yarn build` before opening a pull request. The build reports broken links and broken anchors as warnings; please don't add new ones.

## Writing documentation

Docusaurus 3 reads `.md` files with [MDX 3](https://mdxjs.com/), which is stricter than plain Markdown. Characters that are fine in ordinary Markdown can stop a page from building. Watch for these in normal text (code blocks and `inline code` are safe):

| Problem                                    | Example that breaks      | Write instead                     |
| ------------------------------------------ | ------------------------ | --------------------------------- |
| `<` is read as the start of an HTML/JSX tag | `x <= 60`                | `x &lt;= 60`, or `` `x <= 60` ``  |
| `{...}` is read as a JavaScript expression | `the {username} macro`   | `` `{username}` `` or `\{username\}` |
| An unescaped `\|` inside a table cell splits the cell, even inside backticks | `` `a | b` `` in a table | `` `a \| b` ``                    |
| HTML comments                              | `<!-- note -->`          | Supported by Docusaurus; `{/* note */}` also works |

If a page fails to build, the error names the file, line and column. See the [Docusaurus MDX guide](https://docusaurus.io/docs/markdown-features/react) for more.

## Project structure

| Path                    | Purpose                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `circonus/`, `caql/`    | Documentation content. Each folder is its own docs plugin instance (see `docusaurus.config.js`).        |
| `static/`               | Files copied to the site as-is: images, the OpenAPI spec (`static/yaml/`) and `_redirects`.            |
| `src/pages/`            | Stand-alone pages, including the home page (`index.tsx`).                                               |
| `src/theme/SearchBar/`  | Customized Algolia search box. It limits search results to the product section the reader is browsing. |
| `src/theme/DocCard/`    | Customized doc card. It supports a `customProps.image` icon taken from `static/img/library/`.           |
| `sitePlugin.js`         | Webpack setting that provides the `stream` module for the Swagger UI API reference page.                |
| `build_tools/`          | Helper scripts, such as generating the integrations library JSON.                                       |

### Upgrading Docusaurus

`src/theme/SearchBar/` and `src/theme/DocCard/` are [swizzled](https://docusaurus.io/docs/swizzling) copies of Docusaurus theme components. They don't update when Docusaurus does, so after a major upgrade, re-copy them from the new version and re-apply the customizations, which are marked with comments in each file. The originals are in:

- `node_modules/@docusaurus/theme-search-algolia/lib/theme/SearchBar/`
- `node_modules/@docusaurus/theme-classic/lib/theme/DocCard/`

Keep `react`, `react-dom`, `@mdx-js/react` and `prism-react-renderer` on versions supported by the installed Docusaurus. Docusaurus lists them in its [upgrade guide](https://docusaurus.io/docs/migration).

## Contributing

To suggest a change, create a dedicated branch. When your work is finished, open a pull request and assign at least one reviewer from the Circonus team. The reviewer will either approve the pull request or suggest improvements. Once the pull request is approved, a Circonus team member will merge it and delete the branch. Circonus team members merge and delete their own branches.

## Deployment

Approved contributions are pulled and deployed to [docs.circonus.com](https://docs.circonus.com/) automatically every few minutes.

To add a redirect, edit `static/_redirects`. Each line has the form `<old path> <new path> <status code>`.

## License

This project is licensed under the MIT License.
