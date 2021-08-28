import { Link } from "gatsby"
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <p>hi</p>
    <Link to="/about">About</Link>
  </Layout>
)

export default IndexPage
