import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

const Header = ({ siteTitle = "" }: { siteTitle: string }) => {
  const { allFile } = useStaticQuery<GatsbyTypes.IconQuery>(
    graphql`
      query Icon {
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
  return (
    <header>
      <div className="flex justify-center">
        <div
          style={{ maxWidth: "900px" }}
          className={
            "flex items-center justify-between text-gray-600 w-full px-5 py-2 quicksand"
          }
        >
          <Link className="text-gray-600 visited:text-gray-600" to="/">
            <div className="flex items-center">
              <img
                alt="xpcoffee icon"
                style={{ height: "45px" }}
                src={allFile.nodes[0].publicURL}
              />
              <h1 className="ml-2 text-2xl">{siteTitle}</h1>
            </div>
          </Link>
          <div>
            <Link
              to="/about"
              className="text-gray-600 visited:text-gray-600 text-xl"
            >
              About
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>
    </header>
  )
}

export default Header
