import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"

const AboutPage = () => {
  const { allFile } = useStaticQuery<GatsbyTypes.SnekQuery>(
    graphql`
      query Snek {
        allFile(
          limit: 1
          filter: {
            name: { eq: "angry-snek" }
            ext: { eq: ".jpg" }
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
  return (
    <Layout>
      <div className="flex justify-center">
        <div style={{ maxWidth: "800px" }} className="w-9/12">
          <h2>Hi, there!</h2>
          <div className="flex justify-center">
            <img
              alt="xpcoffee icon"
              className="my-5 rounded-3xl"
              style={{ height: "150px" }}
              src={allFile.nodes[0].publicURL}
            />
          </div>
          <p>
            I am Emerick; you can also call me Rick. I work as a software
            developer.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
