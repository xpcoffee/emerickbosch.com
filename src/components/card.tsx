import React, { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  heading?: string
}>

export const Card = ({ children, heading }: Props) => {
  const header = heading ? (
    <h3 className="text-blue-800">{heading}</h3>
  ) : undefined

  return (
    <div className="p-2 bg-blue-50 rounded-b-xl border-blue-600 border-t-4 mt-2 mb-4">
      {header}
      {children}
    </div>
  )
}
