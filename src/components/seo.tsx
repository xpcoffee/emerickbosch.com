/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({
  description = "",
  lang = "en",
  meta = [],
  title,
}: {
  description?: string
  lang?: string
  meta?: JSX.IntrinsicElements["meta"][]
  title: string
}) {
  const { site, allFile } = useStaticQuery<GatsbyTypes.MetadataQuery>(
    graphql`
      query Metadata {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        allFile(
          limit: 1
          filter: {
            name: { eq: "xpcoffee-icon" }
            ext: { eq: ".svg" }
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "" }
          }
        ) {
          nodes {
            publicURL
          }
        }
      }
    `
  )

  const metaDescription = description || site?.siteMetadata?.description
  const defaultTitle = site?.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={meta.concat([
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `description`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ])}
    >
      <link
        rel="icon"
        href={allFile.nodes[0].publicURL}
        type="image/svg+xml"
        sizes="any"
      />
    </Helmet>
  )
}

export default Seo
