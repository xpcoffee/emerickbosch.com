import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const data = useStaticQuery<GatsbyTypes.SiteTitleQueryQuery>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const title = data.site?.siteMetadata?.title ?? `xpcoffee`

  return (
    <div className="flex flex-col h-screen">
      <Header siteTitle={title} />
      <title>{title}</title>
      <main
        className="flex-grow self-center w-full px-20 py-5 text-gray-800"
        style={{ maxWidth: "900px" }}
      >
        {children}
      </main>
      <footer>
        <div className="flex justify-center">
          <div
            style={{ maxWidth: "900px" }}
            className="flex flex-grow justify-between items-center my-2.5 text-sm text-gray-600 quicksand pb-2 px-5"
          >
            <EmojiLogo />
            <ThisIsMySite />
            <Contact />
          </div>
        </div>
      </footer>
    </div>
  )
}

const ThisIsMySite = () => {
  return <div>This is my site. Please treat it gently. ❤</div>
}

const EmojiLogo = () => {
  return <div>☕ ⌨️ ⚙️</div>
}

const Contact = () => {
  return (
    <div>
      Emerick Bosch
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

export default Layout
