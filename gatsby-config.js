const isDev = process.env["NODE_ENV"] === "development"

const devTooling = isDev
  ? [
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
    ]
  : []

const deployment = isDev
  ? []
  : [
      {
        resolve: `gatsby-plugin-s3`,
        options: {
          bucketName: "emerickbosch.com",
        },
      },
    ]

const imageProcessing = [
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
]

const markdown = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `articles`,
      path: `${__dirname}/src/articles`,
    },
  },
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
        `gatsby-remark-autolink-headers`,
        `gatsby-remark-prismjs`,
      ],
    },
  },
]

const rssFeed = {
  resolve: `gatsby-plugin-feed`,
  options: {
    feeds: [
      {
        title: "emerickbosch.com RSS Feed",
        serialize: ({ query: { site, allMdx } }) => {
          return allMdx.edges.map(edge => {
            return {
              title: edge.node.frontmatter.title,
              description: edge.node.excerpt,
              date: edge.node.frontmatter.date,
              url:
                site.siteMetadata.siteUrl +
                "/articles/" +
                edge.node.fields.slug,
              guid:
                site.siteMetadata.siteUrl +
                "/articles/" +
                edge.node.frontmatter.guid,
            }
          })
        },
        output: "/rss.xml",
        query: `
            {
                site {
                    siteMetadata {
                        title
                        description
                        siteUrl
                        site_url: siteUrl
                    }
                }
                allMdx(sort: { frontmatter: { date: DESC }}) {
                    edges {
                        node {
                            excerpt
                            fields { slug }
                            frontmatter {
                                title
                                date
                                guid
                            }
                        }
                    }
                }
            }
        `,
        language: `en-en`,
      },
    ],
  },
}

const styles = [`gatsby-plugin-postcss`, `gatsby-plugin-fontawesome-css`]

module.exports = {
  siteMetadata: {
    title: `Emerick Bosch`,
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
    ...devTooling,
    ...imageProcessing,
    ...markdown,
    ...styles,
    ...deployment,
    rssFeed,
  ],
}
