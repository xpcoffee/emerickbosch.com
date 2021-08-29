import { Link } from "gatsby"
import React from "react"

interface Props {
  articlePath: string
  title?: string
  description?: string
}

export const ArticleListItem = ({ articlePath, title, description }: Props) => {
  const descriptionSubtext = description ? (
    <div className="text-gray-600">
      <span className="mx-1">•</span>
      {description}
    </div>
  ) : undefined
  return (
    <li>
      <div className="flex items-end">
        <Link to={`articles/${articlePath}`}>{title ?? "untitled"}</Link>
        {descriptionSubtext}
      </div>
    </li>
  )
}
