module.exports = {
  siteMetadata: {
    title: `xpcoffee`,
    description: `Emerick Bosch's personal site`,
    author: `@xpcoffee`,
    siteUrl: `https://xpcofee.github.io/`,
  },
  plugins: [
    /**
     * Core website info
     */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `xpcoffee-github-io`,
        short_name: `xpcoffee`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/xpcoffee-icon.svg`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    /**
     * Developer tooling
     */
    {
      /**
       * Extract/generate types from source code (e.g. creates types for graphQL queries)
       */
      resolve: `gatsby-plugin-typegen`,
      options: {
        emitSchema: {
          "src/__generated__/gatsby-introspection.json": true,
          "src/__generated__/gatsby-schema.graphql": true,
        },
        emitPluginDocuments: {
          "src/__generated__/gatsby-plugin-documents.graphql": true,
        },
      },
    },
    /**
     * Image processing
     */
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      /**
       * Surface images to graphql. Used to enable SVGs to be used as favicon.
       * https://jackwarren.info/posts/guides/gatsby/svg-favicon/
       */
      resolve: `gatsby-source-filesystem`,
      options: { name: `images`, path: `${__dirname}/src/images` },
    },
    {
      /**
       * Enable SVGs to be imported as components
       */
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    /**
     * Markdown (MDX) plugins
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles`,
      },
    },
    `gatsby-remark-images`,
    `gatsby-remark-prismjs`,
    `gatsby-remark-autolink-headers`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    /**
     * CSS plugins
     */
    `gatsby-plugin-postcss`,
    `gatsby-plugin-fontawesome-css`,
  ],
}
