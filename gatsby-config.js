module.exports = {
  siteMetadata: {
    title: `xpcoffee | Emerick Bosch`,
    description: `I'm Emerick Bosch. I work as a software developer. These are some of my thoughts.`,
    author: `@xpcoffee`,
    siteUrl: `https://emerickbosch.com/`,
  },
  plugins: [
    /**
     * Core website info
     */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Emerick Bosch | @xpcoffee`,
        short_name: `emerickbosch`,
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
    /**
     * Deployment
     */
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "emerickbosch.com",
      },
    },
  ],
}
