import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { ArticleListItem, Layout, Seo } from "../components"

const IndexPage = () => {
  const articlesData = useStaticQuery<GatsbyTypes.AllArticlesQuery>(graphql`query{
  allMdx(sort: {frontmatter: {date: DESC}}) {
    nodes {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
        description
        faIcon
      }
      id
      fields {
        slug
      }
    }
  }
}`)

  const articleListItems = articlesData.allMdx.nodes.map(node => {
    console.log({ node })
    return <ArticleListItem
      key={node.id}
      articlePath={node.fields.slug ?? "404"}
      title={node.frontmatter?.title}
      description={node.frontmatter?.description}
      faIconName={node?.frontmatter?.faIcon}
    />
  })

  return (
    <Layout>
      <Seo title="Home" />
      <p id="article-list-label">
        {"A collection of "}
        <a href="https://en.wikipedia.org/wiki/Living_document" target="blank">
          living
        </a>
        {" notes and thoughts."}
      </p>
      <p className="text-sm">
        <i>Ordered by last-edit.</i>
      </p>
      <ul
        aria-labelledby="article-list-label"
        tabIndex={0}
        className="ml-0 mt-3 list-none"
      >
        {articleListItems}
      </ul>
    </Layout>
  )
}

export default IndexPage
