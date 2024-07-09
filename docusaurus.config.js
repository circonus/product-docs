// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Circonus Docs",
  tagline: "A better way to analyze networks, applications, and infrastructure",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.circonus.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Circonus", // Usually your GitHub org/user name.
  projectName: "circonus-docs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        gtag: {
          trackingID: "G-MQPLXSGC00",
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        docs: false,
      },
    ],
  ],

  plugins: [
    require.resolve("./sitePlugin"),
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "circonus",
        path: "circonus",
        routeBasePath: "circonus",
        // sidebarPath: require.resolve("./sidebars.js"),
        // ... other options
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "caql",
        path: "caql",
        routeBasePath: "caql",
        // sidebarPath: require.resolve("./sidebars.js"),
        // ... other options
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "irondb",
        path: "irondb",
        routeBasePath: "irondb",
        // sidebarPath: require.resolve("./sidebars.js"),
        // ... other options
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      algolia: {
        // The application ID provided by Algolia
        appId: "JFRZ7DGOY2",

        // Public API key: it is safe to commit it
        apiKey: "2aacf51fc732efb258bf7ca3f0751781",

        indexName: "crawler_Dev Crawler",

        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Algolia search parameters
        searchParameters: {
          // facetFilters: ["docusaurus_tag:docs-circonus3-current"],
        },

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Circonus Docs",
        logo: {
          alt: "Circonus Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "defaultSidebar",
            position: "left",
            label: "Circonus",
            docsPluginId: "circonus",
          },
          {
            type: "docSidebar",
            sidebarId: "defaultSidebar",
            position: "left",
            label: "IRONdb",
            docsPluginId: "irondb",
          },
          {
            type: "docSidebar",
            sidebarId: "defaultSidebar",
            position: "left",
            label: "CAQL",
            docsPluginId: "caql",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Slack",
                href: "https://slack.s.circonus.com/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/circonus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Circonus, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
