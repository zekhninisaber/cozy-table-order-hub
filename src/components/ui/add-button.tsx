
import * as React from "react"
import { cn } from "@/lib/utils"

export interface AddButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const AddButton = React.forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "w-full rounded-lg py-2 font-medium",
          "bg-[#F39720] text-white shadow",
          "transition",
          "sm:hover:bg-[#E07E29]",        // desktop hover (unchanged)
          "active:bg-[#E07E29]",          // mobile press color
          "active:scale-95",              // mobile press shrink
          "sm:active:scale-100",          // disable shrink on desktop
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
AddButton.displayName = "AddButton"

export { AddButton }
