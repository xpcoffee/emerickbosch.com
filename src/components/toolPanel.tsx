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
            className={`${className} border-t-1 border-gray-600 p-5 bg-gray-100 text-center py-3 fixed bottom-0 right-0 left-0 z-10 md:hidden`}
            onClick={() => setShowModal(true)}
          >
            Contents
          </div>
          <div
            className={`${className} panel-width hidden md:block md:min-w-40`}
          >
            <div className="sticky top-0 pt-8">{children}</div>
          </div>
        </>
      )}
    </>
  )
}

export { ToolPanel }
