import React, { PropsWithChildren } from "react"

const LinkItem = (props: PropsWithChildren<JSX.IntrinsicElements["a"]>) => {
  const propsWithStyling = {
    ...props,
    className: `${props.className} p-2 block drop-shadow my-3 rounded-md md:drop-shadow-none md:my-0 md:p-1`,
  }

  return <a {...propsWithStyling}>{props.children}</a>
}

export { LinkItem }
