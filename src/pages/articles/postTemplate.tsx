import React from "react"
import { graphql, Link } from "gatsby"
import { ArticleHeadings, Layout } from "../../components"
import { stringValueOrUndefined } from "../../utils/string"
import { getIcon } from "../../utils/fontAwesome"
import { isNotUndefined } from "../../utils/array"
import { HeadingData } from "../../utils/headings"

/**
 * Renders MDX files into pages.
 */
const Article = ({
  data,
  children,
}: {
  data: GatsbyTypes.ArticleQuery
  children: React.ReactNode
}) => {
  const title =
    stringValueOrUndefined(data?.mdx?.frontmatter?.title) ?? `untitled`

  const icon = getIcon(data?.mdx?.frontmatter?.faIcon)

  const maxHeadingDepth = data?.mdx?.frontmatter?.tocDepth ?? 1
  const headingsIterator = data?.markdown?.edges?.[0]?.node?.headings?.values()
  const headingsNodes = headingsIterator ? Array.from(headingsIterator) : []
  const headings = headingsNodes
    .map((node): HeadingData | undefined => {
      if (node?.value === undefined || node?.value === null) {
        return undefined
      }

      if (node?.depth && node.depth > maxHeadingDepth) {
        return undefined
      }

      return {
        value: node.value,
        depth: node.depth ?? 1,
      }
    })
    .filter(isNotUndefined)

  const date = data?.mdx?.frontmatter?.lastEdit
  const lastEditDate = date ? (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Last edit: {date}
    </p>
  ) : undefined

  const articleHeadings = headings?.length ? (
    <ArticleHeadings headings={headings} />
  ) : undefined

  return (
    <Layout toolPanelContents={articleHeadings}>
      <div>
        <h1 className="title">
          {icon}
          {title}
        </h1>
        <div className="mb-5">{lastEditDate}</div>
        {children}
        <div className="text-center mt-8">
          <p className="quicksand">
            Thanks for reading! Please reach out if you have
            corrections/suggestions that could make this content better.
          </p>
          <br />
          <Link
            to="/"
            className={
              "mt-2" +
              " quicksand text-gray-600 visited:text-gray-600 hover:text-orange-500 visited:hover:text-orange-500" +
              " dark:text-gray-300 dark:visited:text-gray-300 dark:hover:text-orange-400 dark:visited:hover:text-orange-400" +
              " border-dotted border-gray-600 border-b-2 pb-1"
            }
          >
            Back to landing page
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Article($id: String) {
    mdx: mdx(id: { eq: $id }) {
      frontmatter {
        lastEdit(formatString: "YYYY-MM-D")
        title
        faIcon
        tocDepth
      }
      body
    }
    markdown: allMdx(filter: { id: { eq: $id } }) {
      edges {
        node {
          headings {
            value
            depth
          }
        }
      }
    }
  }
`

export default Article
