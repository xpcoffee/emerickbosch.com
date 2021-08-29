import { Link } from "gatsby"
import React from "react"

interface Props {
  id: string
  articlePath: string
  title?: string
  description?: string
}

export const ArticleListItem = ({
  id,
  articlePath,
  title,
  description,
}: Props) => {
  const descriptionSubtext = description ? <p>{description}</p> : undefined
  return (
    <li id={id}>
      <div>
        <Link to={`articles/${articlePath}`}>{title ?? "untitled"}</Link>
        {descriptionSubtext}
      </div>
    </li>
  )
}
