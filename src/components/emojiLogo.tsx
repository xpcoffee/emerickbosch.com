import { Link } from "gatsby"
import React from "react"

const EmojiLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex justify-center`}>
      <Link to="/">
        <div className="text-sm text-gray-600 quicksand">☕ ⌨️ ⚙️</div>
      </Link>
    </div>
  )
}

export { EmojiLogo }
