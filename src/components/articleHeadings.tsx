import React from "react"
import { HeadingData, renderHeadings } from "../utils/headings"
import { ArticleHeading } from "./articleHeading"

type Props = { headings: HeadingData[]; depth?: number }

const ArticleHeadings = ({ headings }: Props) => {
  return renderHeadings({
    headings,
    Heading: ArticleHeading,
    HeadingGroup,
    RootHeadingGroup,
  })
}

const RootHeadingGroup: React.FC = ({ children }) => {
  return (
    <ul
      tabIndex={0}
      aria-label="Article contents"
      className="list-none mx-0 px-8 w-full"
    >
      {children}
    </ul>
  )
}

const HeadingGroup: React.FC = ({ children }) => {
  return (
    <ul tabIndex={-1} className="list-none mx-0 pl-3 pr-8 w-full quicksand">
      {children}
    </ul>
  )
}

export { ArticleHeadings }
