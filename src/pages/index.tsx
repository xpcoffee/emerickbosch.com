import { graphql, Link, useStaticQuery } from "gatsby"
import * as React from "react"
import { ArticleListItem } from "../components/articleListItem"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
  const articlesData = useStaticQuery<GatsbyTypes.ArticlesQuery>(graphql`
    query Articles {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
          id
          slug
        }
      }
    }
  `)

  const articleListItems = articlesData.allMdx.nodes.map(node => (
    <ArticleListItem
      id={node.id}
      articlePath={node.slug}
      title={node.frontmatter?.title}
    />
  ))

  return (
    <Layout>
      <Seo title="Home" />
      <h2>Articles</h2>
      <ul>{articleListItems}</ul>
    </Layout>
  )
}

export default IndexPage
