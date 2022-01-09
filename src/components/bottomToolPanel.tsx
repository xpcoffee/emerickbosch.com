import React from "react"
import { useRef, useEffect } from "react"

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

  // Dismiss the modal if an element with a modal dismiss data tag event is detected
  useEffect(() => {
    function handleModalDismissDataIdClick(event: MouseEvent) {
      const target = event.target as unknown
      if (!(target instanceof HTMLElement)) {
        return false
      }

      if (target.getAttribute("data-dismiss") === "modal") {
        /**
         * FIXME: without delaying the dismiss, navigation events on links in the modal don't trigger
         */
        setTimeout(() => onDismiss?.(), 50)
      }
    }

    document.addEventListener("mousedown", handleModalDismissDataIdClick)
    return () => {
      document.removeEventListener("mousedown", handleModalDismissDataIdClick)
    }
  }, [ref])

  return (
    <>
      <div
        className={`${classNames} z-20 bg-gray-100 absolute left-0 right-0 top-0 bottom-0 mb-0 mt-auto drop-shadow flex items-center rounded-md overflow-scroll h-max p-4`}
        ref={ref}
      >
        {children}
      </div>
    </>
  )
}

export { BottomToolPanel }
