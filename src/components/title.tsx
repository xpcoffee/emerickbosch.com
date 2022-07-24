import { Link } from "gatsby"
import React from "react"

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
    <div
      className={`${className} text-gray-600 visited:text-gray-600 dark:text-gray-200 dark:visited:text-gray-200`}
    >
      <Link to="/">
        <div className="flex items-center">
          <img
            className="dark:border-slate-300 dark:border-2 dark:rounded-full"
            alt="xpcoffee icon"
            style={{ height: "45px" }}
            src={iconUrl}
          />
          <div className="ml-2 dark:ml-3 text-2xl quicksand text-gray-700 dark:text-gray-200">
            {titleText}
          </div>
        </div>
      </Link>
    </div>
  )
}

export { Title }
