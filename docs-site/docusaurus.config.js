/**
 * Copyright (c) 2024-present, Notes Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require("dotenv").config();

const redirectJson = require("./redirects.json");
const thumbsUpDownFeedbackWidget = require("./plugins/thumbs-up-down-feedback-widget");

/** @type {import('@docusaurus/types/src/index').DocusaurusConfig} */
const siteConfig = {
  title: "Notes",
  tagline: "Personal knowledge base and documentation",
  url: "https://notes.local",
  baseUrl: "/",
  projectName: "notes",
  organizationName: "personal",
  trailingSlash: true,
  favicon: "img/notes-icon.png",
  scripts: [
    "https://platform.twitter.com/widgets.js",
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "fa91d75a-5c82-4272-a893-a21d92245578",
      "data-project-name": "Notes",
      "data-project-color": "#303450",
      "data-modal-header-bg-color": "#303450",
      "data-modal-title-color": "#ffffff",
      "data-button-border-radius": "100%",
      "data-button-text-font-size": "0px",
      "data-button-text-color": "#303450",
      "data-button-bg-color": "transparent",
      "data-button-text": "",
      "data-button-box-shadow": "none",
      "data-button-image-height": "60px",
      "data-button-image-width": "60px",
      "data-modal-title": "",
      "data-modal-image":
        "/img/notes-icon.png",
      "data-project-logo":
        "/img/notes-logo.png",
      async: true,
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: process.env.DISABLE_DOCS
          ? false
          : {
              path: "./docs",
              routeBasePath: "/",
              sidebarPath: require.resolve("./sidebars.js"),
              editUrl:
                "https://github.com/sahilpatel09/notes/tree/main/docs",
              showLastUpdateAuthor: true,
              showLastUpdateTime: true,
              admonitions: {
                tag: ":::",
                keywords: [
                  "additional",
                  "note",
                  "tip",
                  "info-tip",
                  "info",
                  "caution",
                  "danger",
                  "sourcecode",
                  "create-example",
                  "simple",
                ],
              },
              exclude: ["**/**/_*.md"],
              remarkPlugins: [thumbsUpDownFeedbackWidget.plugin],
            },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/refine-theme/css/colors.css"),
            require.resolve("./src/refine-theme/css/fonts.css"),
            require.resolve("./src/refine-theme/css/custom.css"),
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/split-pane.css"),
            require.resolve("./src/css/demo-page.css"),
          ],
        },
        gtag: {
          trackingID: "G-27Z1WY952H",
        },
        sitemap: {
          ignorePatterns: ["**/_*.md"],
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: redirectJson.redirects,
        createRedirects(existingPath) {
          if (existingPath.includes("/api-reference/core/")) {
            return [
              existingPath.replace("/api-reference/core/", "/api-references/"),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
    [
      "docusaurus-plugin-copy",
      {
        id: "Copy Workers",
        path: "static/workers",
        context: "workers",
        include: ["**/*.{js}"],
      },
    ],
    async function tailwindcss() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    // "./plugins/docgen.js",
    ...(process.env.DISABLE_BLOG
      ? []
      : [
          [
            "./plugins/blog-plugin.js",
            {
              blogTitle: "Blog",
              blogDescription:
                "A resource for Refine, front-end ecosystem, and web development",
              routeBasePath: "/blog",
              postsPerPage: 12,
              blogSidebarTitle: "All posts",
              blogSidebarCount: 0,
              feedOptions: {
                type: "all",
                copyright: `Copyright © ${new Date().getFullYear()} Notes.`,
              },
            },
          ],
        ]),
    // "./plugins/clarity.js",
    // "./plugins/ahref.js",
    "./plugins/templates.js",
    "./plugins/example-redirects.js",
    // "./plugins/tutorial-navigation.js",
    // [
    //   "@docusaurus/plugin-content-docs",
    //   {
    //     id: "tutorial",
    //     path: "tutorial",
    //     routeBasePath: "tutorial",
    //     sidebarPath: false,
    //     docLayoutComponent: "@theme/TutorialPage",
    //     docItemComponent: "@theme/TutorialItem",
    //     include: ["**/index.md"],
    //     admonitions: {
    //       tag: ":::",
    //       keywords: [
    //         "additional",
    //         "note",
    //         "tip",
    //         "info-tip",
    //         "info",
    //         "caution",
    //         "danger",
    //         "sourcecode",
    //         "create-example",
    //         "simple",
    //       ],
    //     },
    //   },
    // ],
  ],
  themeConfig: {
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/vsDark"),
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-hidden",
          line: "hide-next-line",
          block: { start: "hide-start", end: "hide-end" },
        },
        {
          className: "theme-code-block-added-line",
          line: "added-line",
          block: { start: "added-start", end: "added-end" },
        },
        {
          className: "theme-code-block-removed-line",
          line: "removed-line",
          block: { start: "removed-start", end: "removed-end" },
        },
      ],
    },
    image: "img/notes_social.png",
    metadata: [
      {
        name: "keywords",
        content:
          "notes, documentation, knowledge-base, personal-wiki, markdown",
      },
    ],
    navbar: {
      title: "Notes",
      items: [],
    },
    footer: {
      logo: {
        alt: "Notes",
        src: "/img/notes_logo.svg",
      },
      links: [
        {
          title: "Resources",
          items: [
            {
              label: "Getting Started",
              to: "/",
            },
                    // {
        //   label: "Tutorials",
        //   to: "tutorial",
        // },
            {
              label: "Blog",
              to: "blog",
            },
          ],
        },
        {
          title: "Product",
          items: [
            {
              label: "Examples",
              to: "examples",
            },
            {
              label: "Integrations",
              to: "integrations",
            },
            {
              label: "About",
              to: "about",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About",
              to: "about",
            },
            {
              label: "GitHub",
              to: "https://github.com/yourusername/notes",
            },
          ],
        },
        {
          title: "__LEGAL",
          items: [
            {
              label: "License",
              to: "https://github.com/yourusername/notes/blob/main/LICENSE",
            },
            // {
            //     label: "Terms",
            //     to: "/enterprise",
            // },
            // {
            //     label: "Privacy",
            //     to: "/privacy-policy",
            // },
            // {
            //     label: "contact@notes.dev",
            //     to: "mailto:contact@notes.dev",
            // },
          ],
        },
        {
          title: "__SOCIAL",
          items: [
            {
              href: "https://github.com/yourusername/notes",
              label: "github",
            },
            {
              href: "https://github.com/yourusername/notes",
              label: "github",
            },
          ],
        },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: "dark",
    },
  },
  customFields: {
    /** Footer Fields */
    footerDescription:
      '<strong style="font-weight:700;">Notes</strong> is a personal knowledge base and documentation system. It helps you organize, structure, and share your knowledge effectively.',
    contactTitle: "Contact",
    contactDescription: [
      "Personal Notes Project",
      "Your Location",
    ],
    contactEmail: "contact@notes.dev",
    /** ---- */
    /** Live Preview */
    LIVE_PREVIEW_URL:
      process.env.LIVE_PREVIEW_URL ?? "http://localhost:3030/preview",
    /** ---- */
  },
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("swc-loader"),
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2017",
        },
        module: {
          type: isServer ? "commonjs" : "es6",
        },
      },
    }),
  },
};

module.exports = siteConfig;
