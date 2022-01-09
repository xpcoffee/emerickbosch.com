import React, { useState } from "react"
import { Modal } from "."

const ToolPanel = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const [showModal, setShowModal] = useState(false)

  if (!children) {
    return <></>
  }

  return (
    <>
      {showModal ? (
        <Modal
          onBlur={() => setShowModal(false)}
          onDismiss={() => setShowModal(false)}
        >
          {children}
        </Modal>
      ) : (
        <>
          <div
            className={`${className} p-5 bg-gray-100 text-center py-3 fixed top-5 right-5 z-10  md:hidden rounded-md drop-shadow-sm`}
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
