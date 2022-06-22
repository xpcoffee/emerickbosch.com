import React, { FC, PropsWithChildren, ReactNode } from "react"
import { getIcon, FAIcon } from "../utils/fontAwesome"

type Props = PropsWithChildren<{
  icon: FAIcon
  header?: (icon: ReactNode) => ReactNode
}>

export const IconParagraph: FC<Props> = ({ icon, header, children }) => {
  return (
    <p>
      {header ? (
        <b>
          {getIcon(icon)}
          {header}: &nbsp;
        </b>
      ) : (
        <b>{getIcon}</b>
      )}
      {children}
    </p>
  )
}
