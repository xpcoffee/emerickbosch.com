import React from "react"
import { graphql, PageProps } from "gatsby"
import { ArticleHeadings, Layout } from "../../components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { stringValueOrUndefined } from "../../utils/string"
import { getIcon } from "../../utils/fontAwesome"
import { isNotUndefined } from "../../utils/array"

/**
 * Renders MDX files into pages.
 */
const Article = ({
  data,
  location,
}: PageProps & { data: GatsbyTypes.ArticleQuery }) => {
  const title =
    stringValueOrUndefined(data?.mdx?.frontmatter?.title) ?? `untitled`

  const icon = getIcon(data?.mdx?.frontmatter?.faIcon)

  const headingsIterator = data?.markdown?.edges?.[0]?.node?.headings?.values()
  const headingsNodes = headingsIterator ? Array.from(headingsIterator) : []
  const headings = headingsNodes
    .map(node => node?.value as string | undefined)
    .filter(isNotUndefined)

  const body = data?.mdx?.body ? (
    <MDXRenderer>{data.mdx.body}</MDXRenderer>
  ) : (
    <p>Empty article</p>
  )

  const date = data?.mdx?.mdx?.frontmatter?.date
  const lastEditDate = date ? (
    <p className="text-sm text-gray-600">Last edit: {date}</p>
  ) : undefined

  const articleHeadings = headings?.length ? (
    <ArticleHeadings headings={headings} location={location} />
  ) : undefined

  return (
    <Layout toolPanelContents={articleHeadings}>
      <div>
        <h1>
          {icon}
          {title}
        </h1>
        <div className="mb-5">{lastEditDate}</div>
        {body}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Article($id: String) {
    mdx: mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        faIcon
      }
      body
    }
    markdown: allMdx(filter: { id: { eq: $id } }) {
      edges {
        node {
          headings(depth: h1) {
            value
          }
        }
      }
    }
  }
`

export default Article
