import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { PropsWithChildren } from "react"

const Disclaimer = ({children, heading}: PropsWithChildren<{heading: string}>) => {
    return (
        <div  className="mb-8 p-5 text-red-800 bg-red-200">
            <p><FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" /> <b>Disclaimer{heading ? ": " : ""}{heading}</b></p>
            {children}
        </div>
    )
}

export {
    Disclaimer
}