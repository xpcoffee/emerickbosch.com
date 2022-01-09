import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ToolPanel } from "./toolPanel"
import { SocialInfo } from "./socialInfo"
import { AboutLink } from "./aboutLink"
import { EmojiLogo } from "./emojiLogo"
import { ThisIsMySite } from "./tagLine"
import { Title } from "./title"

/**
 * On smaller screens, the layout is verticle (single column grid)
 *
 * After the md breakpoint, the grid layout is as follows:
 *
 *         Col1       Col2   Col3  Col4        Col5
 * Row 1 |         | title |     | about me |            |
 * Row 2 |         |     horizontal line    |  future    |
 * Row 2 | toolbar |         content        |  extension |
 * Row 4 |         | emoji | tag |  social  |            |
 */
const Layout = ({
  children,
  toolPanelContents,
}: React.PropsWithChildren<{ toolPanelContents?: React.ReactNode }>) => {
  const { site, allFile } =
    useStaticQuery<GatsbyTypes.LayoutQueryQuery>(graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
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
    `)

  const title = site?.siteMetadata?.title ?? `xpcoffee`

  return (
    <div id="app-layout" className="flex justify-center">
      <div
        className={`grid grid-cols-1 md:grid-desktop gap-5 m-2 flex-1 overflow-scroll`}
      >
        <title>{title}</title>
        <Title
          className="order-1 md:row-start-1 md:row-end-1 md:col-start-2 md:col-end-2 justify-self-center md:self-center md:col-span-2 md:justify-self-start"
          titleText={title}
          iconUrl={allFile.nodes[0].publicURL}
        />
        <ThisIsMySite className="order-2 md:row-start-4 md:row-end-4 md:col-start-3 md:col-end-3 md:self-center" />
        <hr className="hidden md:block md:row-start-2 md:row-end-2 md:col-start-2 md:col-end-5"></hr>
        {toolPanelContents && (
          <ToolPanel className="order-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-4">
            {toolPanelContents}
          </ToolPanel>
        )}
        <div className="order-4 py-5 self-start md:row-start-3 md:row-end-3 md:col-start-2 md:col-end-5 md:flex">
          <main className="read-width text-gray-800">{children}</main>
        </div>
        <AboutLink className="order-5 justify-self-center md:row-start-1 md:row-end-1 md:col-start-4 md:col-end-4 md:self-center md:justify-self-end" />
        <SocialInfo className="order-6 md:row-start-4 md:row-end-4 md:col-start-4 md:col-end-4 md:justify-self-end md:my-3" />
        <EmojiLogo className="order-7 mb-20 md:row-start-4 md:row-end-4 md:col-start-2 md:col-end-2 md:justify-self-start md:mb-0 md:self-center" />
      </div>
    </div>
  )
}

export { Layout }
