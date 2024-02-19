/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

import slugify from "@sindresorhus/slugify"
import path from "path"
import { compileMDXWithCustomOptions } from "gatsby-plugin-mdx"
import remarkHeadingsPlugin from "./plugins/remark-headings-plugin.mjs"

export const createSchemaCustomization = ({
  getNode,
  getNodesByType,
  pathPrefix,
  reporter,
  cache,
  actions,
  schema,
  store,
}) => {
  const { createTypes } = actions

  const headingsResolver = schema.buildObjectType({
    name: `Mdx`,
    fields: {
      headings: {
        type: `[MdxHeading]`,
        async resolve(mdxNode) {
          const fileNode = getNode(mdxNode.parent)

          if (!fileNode) {
            return null
          }

          const result = await compileMDXWithCustomOptions(
            {
              source: mdxNode.body,
              absolutePath: fileNode.absolutePath,
            },
            {
              pluginOptions: {},
              customOptions: {
                mdxOptions: {
                  remarkPlugins: [remarkHeadingsPlugin],
                },
              },
              getNode,
              getNodesByType,
              pathPrefix,
              reporter,
              cache,
              store,
            },
          )

          if (!result) {
            return null
          }

          return result.metadata.headings
        },
      },
    },
  })

  const typeDefs = `
      type MdxFrontmatter {
        date(formatString: String): Date
        title: String
        description: String
        faIcon: String
      }

      type MdxHeading {
        value: String
        depth: Int
      }

      type MdxFields {
        slug: String!
      }

      type Mdx implements Node {
        frontmatter: MdxFrontmatter!
        id: String
        headings: [MdxHeading]
        fileAbsolutePath: String
        fields: MdxFields
      }
    `
  createTypes([typeDefs, headingsResolver])
}

export const onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `Mdx`) {
    const slug = slugify(node.frontmatter.title)
    actions.createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

const postTemplate = path.resolve(`./src/pages/articles/postTemplate.tsx`)
const permalinkTemplate = path.resolve(
  `./src/pages/articles/permalinkTemplate.tsx`,
)

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            guid
          }
          internal {
            contentFilePath
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors)
  }

  const posts = result.data.allMdx.nodes
  posts.forEach(node => {
    const path = "articles/" + node.fields.slug
    createPage({
      path,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    })

    const guid = node.frontmatter.guid
    const permalinkPath = "articles/" + guid
    createPage({
      path: permalinkPath,
      component: `${permalinkTemplate}`,
      context: { id: guid, redirectPath: path },
    })
  })
}
