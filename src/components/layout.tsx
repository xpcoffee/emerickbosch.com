import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { Modal } from "./modal"

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
        <Contact className="order-6 md:row-start-4 md:row-end-4 md:col-start-4 md:col-end-4 md:justify-self-end" />
        <EmojiLogo className="order-7 md:row-start-4 md:row-end-4 md:col-start-2 md:col-end-2 md:justify-self-start md:self-center" />
      </div>
    </div>
  )
}

const Title = ({
  titleText,
  iconUrl,
  className,
}: {
  titleText: string
  iconUrl?: string
  className?: string
}) => {
  return (
    <div className={`${className} text-gray-600 visited:text-gray-600`}>
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

const ThisIsMySite = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex justify-center`}>
      <div className="text-sm text-gray-600 quicksand ">
        This is my site. Please treat it gently. ❤
      </div>
    </div>
  )
}

const ToolPanel = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const [showModal, setShowModal] = useState(false)

  if (!children) {
    return <></>
  }

  return (
    <>
      {showModal ? (
        <Modal
          onBlur={() => setShowModal(false)}
          onDismiss={() => setShowModal(false)}
        >
          {children}
        </Modal>
      ) : (
        <>
          <div
            className={`${className} p-5 bg-gray-100 text-center py-3 fixed top-5 right-5 z-10  md:hidden rounded-md drop-shadow-sm`}
            onClick={() => setShowModal(true)}
          >
            Contents
          </div>
          <div
            className={`${className} panel-width hidden md:block md:min-w-40`}
          >
            <div className="sticky top-0 pt-8">{children}</div>
          </div>
        </>
      )}
    </>
  )
}

const AboutLink = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} quicksand text-xl`}>
      <Link to="/about" className="text-gray-600 visited:text-gray-600 ">
        About me
      </Link>
    </div>
  )
}

const Contact = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} flex flex-col gap-3 items-center md:items-start md:gap-1 md:text-sm text-gray-600 quicksand`}
    >
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

const EmojiLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex justify-center`}>
      <div className="text-sm text-gray-600 quicksand">☕ ⌨️ ⚙️</div>
    </div>
  )
}

export { Layout }
