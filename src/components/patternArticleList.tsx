import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

export const PatternArticleList: React.FC = () => {
  const articlesData = useStaticQuery<GatsbyTypes.PatternArticlesQuery>(graphql`query PatternArticles {
  titles: allMdx(
    filter: {fileAbsolutePath: {regex: "/.*pattern-.*/"}}
    sort: {frontmatter: {title: ASC}}
  ) {
    edges {
      node {
        frontmatter {
          title
        }
      }
    }
  }
}`)

  if (!articlesData.titles.edges?.length) {
    return <></>
  }

  return (
    <ul className="mt-2">
      {articlesData.titles.edges.map(({ node }) => (
        <li key={node.frontmatter?.title}>
          <Link
            className={
              "text-lg quicksand" +
              " text-indigo-800 visited:text-indigo-800 hover:text-orange-400 visited:hover:text-orange-400" +
              " dark:text-slate-200 dark:hover:text-orange-400 dark:visited:text-slate-200"
            }
            to={`../${node.frontmatter?.title ?? Date.now()}`}
          >
            {node.frontmatter?.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
