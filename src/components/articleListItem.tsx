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
    <span className="text-gray-600 dark:text-gray-400 text-sm">
      {description}
    </span>
  ) : undefined

  return (
    <li>
      <Link
        tabIndex={0}
        className={
          "my-2 pl-5 py-3 block" +
          " md:my-2 md:bg-inherit md:border-0 md:pt-1 md:pb-0" +
          " bg-gray-50 text-indigo-800 visited:text-indigo-800 hover:text-orange-400 visited:hover:text-orange-400" +
          " dark:text-slate-200 dark:bg-slate-700 dark:hover:text-orange-400 dark:visited:text-slate-200"
        }
        to={`articles/${articlePath}`}
      >
        <div className="flex flex-col">
          <div>
            {icon}
            {title ?? "untitled"}
          </div>
          {descriptionSubtext}
        </div>
      </Link>
    </li>
  )
}

export { ArticleListItem }
