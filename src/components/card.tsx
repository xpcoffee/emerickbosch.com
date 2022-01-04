import React, { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  heading?: string
}>

const Card = ({ children, heading }: Props) => {
  const header = heading ? (
    <h2 className="text-blue-800 mt-2 text-xl">{heading}</h2>
  ) : undefined

  return (
    <div className="border-blue-600 border-l-4 my-5 flex">
      <div className="w-10"></div>
      <div>
        {header}
        {children}
      </div>
    </div>
  )
}

export { Card }
