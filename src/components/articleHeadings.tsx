import React from "react"

interface Props {
  headings: string[]
}

const ArticleHeadings = ({ headings }: Props) => {
  return (
    <ul style={{ listStyle: "none" }}>
      {headings.map(heading => (
        <li className="font-medium my-1 pt-1 leading-5" key={heading}>
          <a
            className="text-gray-600 visited:text-gray-600 hover:text-orange-500 visited:hover:text-orange-500"
            href={getHeadingLink({ heading })}
            data-dismiss="modal"
          >
            {heading}
          </a>
        </li>
      ))}
    </ul>
  )
}

type WindowType = typeof window

/**
 * Returns an href that will navigate to a given header
 *
 * IMPORTANT NOTE: this is reliant on the behaviour of the gatsby-remark-autolink-headers plugin
 */
function getHeadingLink({
  heading,
  global = window,
}: {
  heading: string
  global?: WindowType
}) {
  const snakeCaseHeading = heading.toLowerCase().replace(/ /g, "-")
  const url = new URL(global.location.href)
  url.hash = snakeCaseHeading
  return url.href
}

export { ArticleHeadings }
