import React from "react"

type Props = { headings: string[] }

const ArticleHeadings = ({ headings }: Props) => {
  return (
    <ul className="list-none mx-0 px-8 w-full">
      {headings.map(heading => (
        <li
          className="font-medium border-x-4 border-blue-800 md:border-none"
          key={heading}
        >
          <a
            className={
              "block p-2 my-3 bg-gray-50 drop-shadow " +
              "text-gray-600 visited:text-gray-600 hover:text-orange-500 visited:hover:text-orange-500" +
              "md:my-0 md:p-1 md:bg-inherit md:drop-shadow-none"
            }
            href={getHeadingLink({ heading })}
            data-dismiss="modal"
          >
            <div data-dismiss="modal">{heading}</div>
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
function getHeadingLink({ heading }: { heading: string }) {
  const snakeCaseHeading = heading
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w\s-]|_/g, "")

  return `#${snakeCaseHeading}`
}

export { ArticleHeadings }
