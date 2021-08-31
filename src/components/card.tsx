import React, { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  heading?: string
}>

export const Card = ({ children, heading }: Props) => {
  const header = heading ? (
    <h2 className="text-blue-800">{heading}</h2>
  ) : undefined

  return (
    <div className="p-2 bg-blue-50 rounded-b-xl border-blue-600 border-t-4 mt-2 mb-4">
      {header}
      {children}
    </div>
  )
}
