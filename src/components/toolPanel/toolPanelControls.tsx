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
    <div
      className={
        className +
        " bottom-0 right-0 left-0 z-20 fixed flex flex-col justify-end h-full" +
        " md:panel-width md:min-w-40" +
        " md:sticky md:top-0 md:justify-start"
      }
    >
      <div
        className={
          "grow" +
          " bg-white" +
          " dark:bg-slate-800" +
          " md:shrink" +
          `${!showPanel ? " hidden md:block" : ""}`
        }
      >
        {children}
      </div>
      <button
        className={
          " cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 hover:text-orange-400 visited:hover:text-orange-400" +
          " text-center text-lg" +
          " rounded-t-xlg drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]" +
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

export { ToolPanelControls }
