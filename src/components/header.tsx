import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle = "" }: { siteTitle: string }) => (
  <header>
    <div className={"text-2xl text-gray-600 w-full px-5 py-4"}>
      <h1 style={{ margin: 0 }}>
        <Link className="text-gray-600 visited:text-gray-600" to="/">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

export default Header
