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
  console.log({ faIconName })
  const icon = getIcon(faIconName)

  const descriptionSubtext = description ? (
    <div className="text-gray-600">
      <span className="mx-1">•</span>
      {description}
    </div>
  ) : undefined

  return (
    <li>
      <div className="flex items-end">
        <Link to={`articles/${articlePath}`}>
          {icon}
          {title ?? "untitled"}
        </Link>
        {descriptionSubtext}
      </div>
    </li>
  )
}
