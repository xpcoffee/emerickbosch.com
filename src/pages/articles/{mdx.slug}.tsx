import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { stringValueOrUndefined } from "../../utils/string"
import { getIcon } from "../../utils/fontAwesome"

/**
 * Renders MDX files into pages.
 */
const Article = ({ data }: { data: GatsbyTypes.ArticleQuery }) => {
  const title =
    stringValueOrUndefined(data?.mdx?.frontmatter?.title) ?? `untitled`

  const icon = getIcon(data?.mdx?.frontmatter?.faIcon)

  const body = data?.mdx?.body ? (
    <MDXRenderer>{data.mdx.body}</MDXRenderer>
  ) : (
    <p>Empty article</p>
  )

  const date = data?.mdx?.frontmatter?.date
  const datePosted = date ? (
    <p className="text-sm text-gray-600">Last edit: {date}</p>
  ) : undefined

  return (
    <Layout>
      <h1>
        {icon}
        {title}
      </h1>
      <div className="mb-5">{datePosted}</div>
      {body}
    </Layout>
  )
}

export const query = graphql`
  query Article($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        faIcon
      }
      body
    }
  }
`

export default Article
