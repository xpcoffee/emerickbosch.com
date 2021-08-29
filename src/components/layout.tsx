import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

const Layout = ({
  pageTitle,
  children,
}: React.PropsWithChildren<{ pageTitle?: string }>) => {
  const data = useStaticQuery<GatsbyTypes.SiteTitleQueryQuery>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const title = pageTitle ?? data.site?.siteMetadata?.title ?? `xpcoffee`

  return (
    <div className="flex flex-col h-screen">
      <Header siteTitle={title} />
      <title>{title}</title>
      <main
        className="flex-grow self-center w-full px-5 py-5 text-gray-800"
        style={{ maxWidth: "1000px" }}
      >
        {children}
      </main>
      <footer className="flex justify-between items-center mx-5 my-2.5 text-sm text-gray-600">
        <EmojiLogo />
        <ThisIsMySite />
        <Contact />
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
        <a href="https://github.com/xpcoffee">xpcoffee</a>
      </div>
      <div>
        <a href="https://twitter.com/explodedcoffee">explodedcoffee</a>
      </div>
      <div>
        <a href="https://www.linkedin.com/in/emerickbosch">emerickbosch</a>
      </div>
    </div>
  )
}

export default Layout
