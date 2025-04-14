import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-primary/10 shadow-sm hover:shadow-md animate-pulse duration-1000 rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
