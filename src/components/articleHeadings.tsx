import React from "react"
import { LinkItem } from "."

type Props = { headings: string[] }

const ArticleHeadings = ({ headings }: Props) => {
  return (
    <ul className="list-none mx-0 px-8 w-full">
      {headings.map(heading => (
        <li className="font-medium" key={heading}>
          <LinkItem
            className="bg-gray-50 md:bg-inherit text-gray-600 visited:text-gray-600 hover:text-orange-500 visited:hover:text-orange-500"
            href={getHeadingLink({ heading })}
            data-dismiss="modal"
          >
            {heading}
          </LinkItem>
        </li>
      ))}
    </ul>
  )
}

/**
 * Returns an href that will navigate to a given header
 *
 * IMPORTANT NOTE: this is reliant on the behaviour of the gatsby-remark-autolink-headers plugin
 */
function getHeadingLink({ heading }: { heading: string }) {
  const snakeCaseHeading = heading
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w\s-]|_/g, "")

  return `#${snakeCaseHeading}`
}

export { ArticleHeadings }
