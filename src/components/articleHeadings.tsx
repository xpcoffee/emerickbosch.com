import { PageProps } from "gatsby"
import React from "react"

type Props = { headings: string[] } & Location
type Location = Pick<PageProps, "location">

const ArticleHeadings = ({ headings, location }: Props) => {
  return (
    <ul style={{ listStyle: "none" }}>
      {headings.map(heading => (
        <li className="font-medium my-1 pt-1 leading-5" key={heading}>
          <a
            className="text-gray-600 visited:text-gray-600 hover:text-orange-500 visited:hover:text-orange-500"
            href={getHeadingLink({ heading, location })}
            data-dismiss="modal"
          >
            {heading}
          </a>
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
function getHeadingLink({ heading, location }: { heading: string } & Location) {
  const snakeCaseHeading = heading.toLowerCase().replace(/ /g, "-")
  const url = new URL(location.href)
  url.hash = snakeCaseHeading
  return url.href
}

export { ArticleHeadings }
