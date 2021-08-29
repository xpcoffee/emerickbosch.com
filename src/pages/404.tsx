import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>
      This page doesn't exist. Check your URL or use the navigation to go to a
      valid destination.
    </p>
  </Layout>
)

export default NotFoundPage
