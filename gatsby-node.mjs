/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

import slugify from "@sindresorhus/slugify"
import path from "path"

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
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
  createTypes(typeDefs)
}


export const onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `Mdx`) {

    console.log("creating node")
    const slug = slugify(node.frontmatter.title)
    actions.createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}


const postTemplate = path.resolve(`./src/pages/articles/postTemplate.tsx`)

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            title
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
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  const posts = result.data.allMdx.nodes
  posts.forEach(node => {
    createPage({
      path: 'articles/' + node.fields.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    })
  })
}