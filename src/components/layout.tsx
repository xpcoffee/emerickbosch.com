import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
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
        className="grid grid-cols-1 md:grid-desktop gap-5 m-2 flex-1"
        style={{ maxWidth: "900px" }}
      >
        <title>{title}</title>
        <Title titleText={title} iconUrl={allFile.nodes[0].publicURL} />
        <ThisIsMySite />
        <hr className="order-3 hidden md:block md:col-span-3"></hr>
        <main className="order-4 md:col-span-3 py-5 text-gray-800 self-start">
          {children}
        </main>
        <AboutLink />
        <Contact />
        <EmojiLogo />
      </div>
    </div>
  )
}

const Title = ({
  titleText,
  iconUrl,
}: {
  titleText: string
  iconUrl?: string
}) => {
  return (
    <div className="order-1 grid-row-start-1 grid-row-end-1 text-gray-600 visited:text-gray-600 md:self-center md:col-span-2 justify-self-center md:justify-self-start">
      <Link to="/">
        <div className="flex items-center">
          <img alt="xpcoffee icon" style={{ height: "45px" }} src={iconUrl} />
          <div className="ml-2 text-2xl quicksand text-gray-700">
            {titleText}
          </div>
        </div>
      </Link>
    </div>
  )
}

const ThisIsMySite = () => {
  return (
    <div className="order-2 md:order-6 flex justify-center md:self-center">
      <div className="text-sm text-gray-600 quicksand ">
        This is my site. Please treat it gently. ❤
      </div>
    </div>
  )
}

const AboutLink = () => {
  return (
    <div className="order-5 md:order-2 grid-row-start-3 grid-row-end-3 quicksand text-xl md:self-center md:justify-self-end justify-self-center md:order-1">
      <Link to="/about" className="text-gray-600 visited:text-gray-600 ">
        About me
      </Link>
    </div>
  )
}

const Contact = () => {
  return (
    <div className="order-6 md:order-7 flex flex-col gap-3 items-center md:items-start md:gap-1 md:text-sm text-gray-600 quicksand md:justify-self-end">
      <div>
        <FontAwesomeIcon className="mr-2" icon={faGithub} />
        <a href="https://github.com/xpcoffee">xpcoffee</a>
      </div>
      <div>
        <FontAwesomeIcon className="mr-2" icon={faTwitter} />
        <a href="https://twitter.com/explodedcoffee">explodedcoffee</a>
      </div>
      <div>
        <FontAwesomeIcon className="mr-2" icon={faLinkedin} />
        <a href="https://www.linkedin.com/in/emerickbosch">emerickbosch</a>
      </div>
    </div>
  )
}

const EmojiLogo = () => {
  return (
    <div className="order-7 md:order-5 flex justify-center md:justify-self-start md:self-center">
      <div className="text-sm text-gray-600 quicksand ">☕ ⌨️ ⚙️</div>
    </div>
  )
}

export default Layout
