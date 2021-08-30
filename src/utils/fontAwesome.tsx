import React from "react"
import * as FontAwesome from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type FAIcon = keyof typeof FontAwesome

export function getIcon(faIcon?: string) {
  console.log({ faIcon })
  if (faIcon === undefined) {
    return undefined
  }

  try {
    return (
      //@ts-ignore
      <FontAwesomeIcon icon={FontAwesome[faIcon as FAIcon]} className="mr-2" />
    )
  } catch (e) {
    console.error(e)
    return undefined
  }
}
