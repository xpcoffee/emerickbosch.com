import React, { useState, useEffect } from "react"
import { ToolPanelContents } from "./toolPanelContents"
import { getIcon } from "../../utils/fontAwesome"

const ToolPanelControls = ({
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
    console.log("click!")
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
    <div className={" bottom-0 right-0 left-0 z-20 fixed flex-col"}>
      <div
        className={
          className +
          " z-10 fixed w-full left-0 top-0" +
          " drop-shadow border-gray-300 border-t-1 bg-white overflow-y-auto" +
          " dark:bg-slate-800" +
          " md:sticky md:top-0 md:pt-8 md:overflow-y-auto" +
          `${!showPanel ? " block md:hidden" : ""}`
        }
      >
        {children}
      </div>
      <button
        className={
          className +
          " cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 hover:text-orange-400 visited:hover:text-orange-400" +
          " text-center text-lg" +
          " rounded-t-xlg drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]"
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

export { ToolPanelControls }
