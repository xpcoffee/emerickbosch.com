import React, { useState, useEffect } from "react"
import { getIcon } from "../utils/fontAwesome"

export const ToolPanel = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const [showPanel, setShowPanel] = useState(false)
  console.log({ showPanel })

  useEffect(() => {
    console.log("mount")
    return () => console.log("unmount")
  }, [])

  const onclick = () => {
    setShowPanel(previousValue => {
      console.log({
        showPanel,
        previousValue,
        returnValue: !previousValue,
      })
      return !previousValue
    })
  }

  if (!children) {
    return <></>
  }

  return (
    <div
      className={
        className +
        " bottom-0 z-20 fixed flex flex-col justify-end max-h-full w-full drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]" +
        " md:panel-width md:min-w-40 md:h-fit md:drop-shadow-none" +
        " md:sticky md:block md:top-0 md:justify-start"
      }
    >
      <div
        className={
          "grow overflow-y-scroll pt-5" +
          " bg-white" +
          " dark:bg-slate-800" +
          " md:grow-0" +
          `${!showPanel ? " hidden md:block" : ""}`
        }
      >
        {children}
      </div>
      <button
        className={
          " cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 hover:text-orange-400 visited:hover:text-orange-400" +
          " text-center text-lg" +
          " rounded-t-xlg h-16 w-full" +
          " block md:hidden"
        }
        onClick={onclick}
      >
        {showPanel ? (
          <>{getIcon("faTimes")} Close contents </>
        ) : (
          <> {getIcon("faBars")} Contents </>
        )}
      </button>
    </div>
  )
}
