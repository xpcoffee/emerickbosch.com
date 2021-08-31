import React from "react"
import { Link } from "gatsby"
import { getIcon } from "../utils/fontAwesome"

interface Props {
  articlePath: string
  title?: string
  description?: string
  faIconName?: string
}

export const ArticleListItem = ({
  articlePath,
  title,
  description,
  faIconName,
}: Props) => {
  const icon = getIcon(faIconName)

  const descriptionSubtext = description ? (
    <span className="text-gray-600 text-sm">
      <span className="mx-1">•</span>
      {description}
    </span>
  ) : undefined

  return (
    <li className="my-2">
      <span>
        <Link to={`articles/${articlePath}`}>
          {icon}
          {title ?? "untitled"}
        </Link>
        {descriptionSubtext}
      </span>
    </li>
  )
}
