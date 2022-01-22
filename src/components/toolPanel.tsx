import React, { useState } from "react"
import { BottomToolPanel } from "./bottomToolPanel"

const ToolPanel = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const [showBottomPanel, setShowModal] = useState(false)

  if (!children) {
    return <></>
  }

  return (
    <>
      {showBottomPanel ? (
        <BottomToolPanel
          onBlur={() => setShowModal(false)}
          onDismiss={() => setShowModal(false)}
        >
          {children}
        </BottomToolPanel>
      ) : (
        <>
          <div
            className={
              className +
              " bottom-0 right-0 left-0 z-10 px-5 py-3 fixed" +
              " cursor-pointer bg-gray-50 hover:text-orange-500 visited:hover:text-orange-500" +
              " text-center text-lg" +
              " md:hidden"
            }
            onClick={() => setShowModal(true)}
          >
            Contents
          </div>
          <div
            className={`${className} panel-width hidden md:block md:min-w-40`}
          >
            <div
              className="sticky top-0 pt-8 overflow-y-auto"
              style={{ maxHeight: "80vh" }}
            >
              {children}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export { ToolPanel }
