import { graphql, useStaticQuery } from "gatsby"
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
            description
            faIcon
          }
          id
          slug
        }
      }
    }
  `)

  const articleListItems = articlesData.allMdx.nodes.map(node => (
    <ArticleListItem
      key={node.id}
      articlePath={node.slug ?? "/404"}
      title={node.frontmatter?.title}
      description={node.frontmatter?.description}
      faIconName={node?.frontmatter?.faIcon}
    />
  ))

  return (
    <Layout>
      <Seo title="Home" />
      <p>A collection of <a href="https://en.wikipedia.org/wiki/Living_document" target="blank">living</a> notes and thoughts.</p>
      <p className="text-sm"><i>Ordered by last-edit.</i></p>
      <ul className="ml-0 mt-3 list-none">{articleListItems}</ul>
    </Layout>
  )
}

export default IndexPage
