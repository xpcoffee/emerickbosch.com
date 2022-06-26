import React, { useRef, useEffect } from "react"

const BottomToolPanel = ({
  children,
  onBlur,
  onDismiss,
  classNames,
}: React.PropsWithChildren<{
  onBlur?: () => void
  onDismiss?: () => void
  classNames?: string
}>) => {
  const ref = useRef<HTMLDivElement>(null)

  // Blur the modal if a click is detected outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        onBlur?.()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  // Dismiss the modal if we detect a hash change event
  useEffect(() => {
    function handleModalDismissDataIdClick() {
      onDismiss?.()
    }

    window.addEventListener("hashchange", handleModalDismissDataIdClick)
    return () => {
      window.removeEventListener("hashchange", handleModalDismissDataIdClick)
    }
  }, [ref])

  return (
    <>
      <div
        className={
          classNames +
          " z-20 absolute left-0 right-0 top-0 bottom-0 h-max p-4 mb-0 mt-auto" +
          " drop-shadow border-gray-300 border-t-1 bg-white" +
          " flex items-center"
        }
        ref={ref}
      >
        {children}
      </div>
    </>
  )
}

export { BottomToolPanel }
