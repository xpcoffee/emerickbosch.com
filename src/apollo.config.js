/**
 * This is not an Apollo project; this file is only for
 * configuring the Apollo VSCode plugin to improve developer
 * experience. It has additional type-safe info for GraphQL
 * queries.
 */

module.exports = {
  client: {
    name: "your-project-name",
    tagName: "graphql",
    includes: [
      "./src/**/*.{ts,tsx}",
      "./src/__generated__/gatsby-plugin-documents.graphql",
    ],
    service: {
      name: "GatsbyJS",
      localSchemaFile: "./src/__generated__/gatsby-schema.graphql",
    },
  },
}
