import React, { useState, useEffect } from "react"
import { ToolPanelContents } from "./toolPanelContents"
import { getIcon } from "../../utils/fontAwesome"

const ToolPanelControls = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const [showPanel, setShowPanel] = useState(false)
  console.log({ showPanel })

  if (!children) {
    return <></>
  }

  return (
    <>
      {showPanel && (
        <ToolPanelContents
          onBlur={() => setShowPanel(false)}
          onDismiss={() => setShowPanel(false)}
        >
          {children}
        </ToolPanelContents>
      )}
      <div
        className={
          className +
          " bottom-0 right-0 left-0 z-20 px-5 py-3 fixed" +
          " cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 hover:text-orange-400 visited:hover:text-orange-400" +
          " text-center text-lg" +
          " rounded-t-xlg drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]"
        }
        onClick={() => {
          console.log("click!")
          setShowPanel(previousValue => {
            console.log({ showPanel, previousValue })
            return !previousValue
          })
        }}
      >
        {showPanel ? (
          <>{getIcon("faTimes")} Close contents </>
        ) : (
          <> {getIcon("faBars")} Contents </>
        )}
      </div>
      <div className={`${className} panel-width hidden md:block md:min-w-40`}>
        <div
          className="sticky top-0 pt-8 overflow-y-auto"
          style={{ maxHeight: "100vh" }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export { ToolPanelControls }
