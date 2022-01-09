import React from "react"
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SocialInfo = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} flex flex-col gap-3 items-center md:items-start md:gap-1 md:text-sm text-gray-600 quicksand`}
    >
      <div>
        <FontAwesomeIcon className="mr-2" icon={faGithub} />
        <a href="https://github.com/xpcoffee">xpcoffee</a>
      </div>
      <div>
        <FontAwesomeIcon className="mr-2" icon={faTwitter} />
        <a href="https://twitter.com/explodedcoffee">explodedcoffee</a>
      </div>
      <div>
        <FontAwesomeIcon className="mr-2" icon={faLinkedin} />
        <a href="https://www.linkedin.com/in/emerickbosch">emerickbosch</a>
      </div>
    </div>
  )
}

export { SocialInfo }
