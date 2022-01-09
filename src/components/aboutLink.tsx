import React from "react"
import { Link } from "gatsby"

const AboutLink = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} quicksand text-xl`}>
      <Link to="/about" className="text-gray-600 visited:text-gray-600 ">
        About me
      </Link>
    </div>
  )
}

export { AboutLink }
