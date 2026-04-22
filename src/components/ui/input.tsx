import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react" // or any icon library you're using

function Input({ className, type, icon,  ...props }: React.ComponentProps<"input"> & { icon?: React.ReactNode }) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = props.id === "password"

  // Determine actual input type
  const inputType = isPassword && showPassword ? "text" : type

  const togglePasswordVisibility = () => setShowPassword(prev => !prev)

  return (
    <div className="relative flex gap-6">
      {/* Left static icon (if any) */}
      {icon  && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {icon}
        </div>
      )}

      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          (icon) && "pl-9",    // padding for left icon
                   // padding for right toggle icon
          className
        )}
        {...props}
        id={props.id} // ensure id is passed
      />

      {/* Password toggle icon (right side) */}
      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
    </div>
  )
}

export { Input }