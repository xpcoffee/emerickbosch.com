import React, { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  heading?: string
}>

const Card = ({ children, heading }: Props) => {
  const header = heading ? (
    <h2 className="text-blue-800 dark:text-orange-300 mt-2 text-xl">
      {heading}
    </h2>
  ) : undefined

  return (
    <div className="border-blue-600 dark:border-orange-400 border-l-4 my-5 flex">
      <div className="pl-8">
        {header}
        {children}
      </div>
    </div>
  )
}

export { Card }
