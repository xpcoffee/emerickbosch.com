import {
  faArrowDown,
  faArrowRight,
  faCaretDown,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useState } from "react"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  /**
   * The header to display. Required.
   */
  header: React.ReactNode
  /**
   * Function that can be used to define what kind of element should wrap the header (h1/h2/div etc). Defaults to <h3>
   */
  headerElementWrapper?: (children: React.ReactNode) => React.ReactNode
  /**
   * A short description of the section.
   */
  description?: string
  /**
   * Whether the section content is initially hidden. Defaults to false.
   */
  initiallyHidden: boolean
}>

export const ExpandableSection = ({
  children,
  header,
  headerElementWrapper = children => <h3>{children}</h3>,
  description,
  initiallyHidden: initiallyClosed = false,
}: Props) => {
  const [expanded, setExpanded] = useState(!initiallyClosed)
  const toggleExpanded = () => setExpanded(prevValue => !prevValue)
  const icon = expanded ? faCaretDown : faCaretRight
  const contentDisplay = expanded ? "block" : "hidden"

  return (
    <div>
      {headerElementWrapper(
        <button className="flex" onClick={toggleExpanded}>
          <div className="w-5 mr-2">
            <FontAwesomeIcon icon={icon} />
          </div>
          {header}
        </button>
      )}
      <div className="ml-8 quicksand">{description}</div>
      <div className={`${contentDisplay} ml-8 mt-4 mb-4`}>{children}</div>
    </div>
  )
}
