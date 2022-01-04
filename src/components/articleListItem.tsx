import React from "react"
import { Link } from "gatsby"
import { getIcon } from "../utils/fontAwesome"

interface Props {
  articlePath: string
  title?: string
  description?: string
  faIconName?: string
}

const ArticleListItem = ({
  articlePath,
  title,
  description,
  faIconName,
}: Props) => {
  const icon = getIcon(faIconName)

  const descriptionSubtext = description ? (
    <span className="text-gray-600 text-sm">{description}</span>
  ) : undefined

  return (
    <li className="my-4 md:my-2 pl-5 border-blue-800 border-l-2 md:border-0">
      <div className="flex flex-col">
        <Link to={`articles/${articlePath}`}>
          {icon}
          {title ?? "untitled"}
        </Link>
        {descriptionSubtext}
      </div>
    </li>
  )
}

export { ArticleListItem }
