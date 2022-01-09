import React from "react"

const EmojiLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex justify-center`}>
      <div className="text-sm text-gray-600 quicksand">☕ ⌨️ ⚙️</div>
    </div>
  )
}

export { EmojiLogo }
