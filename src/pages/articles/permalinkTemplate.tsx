import React from "react"
import { Layout } from "../../components"
import { Link } from "gatsby"

/**
 * Renders MDX files into pages.
 */
const Reroute = ({ pageContext }) => {
  const { redirectPath } = pageContext
  if (!redirectPath) {
    return (
      <Layout>
        <div>No article path found for this ID.</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>Redirecting...</div>
      <div className="text-sm">
        If this takes too long, click <Link to={`/${redirectPath}`}>here</Link>.
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext }) => {
  return (
    <meta
      http-equiv="Refresh"
      content={`0; url='/${pageContext.redirectPath}'`}
    />
  )
}

export default Reroute
