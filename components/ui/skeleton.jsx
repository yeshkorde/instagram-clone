import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md bg-muted bg-[#272727]", className)} {...props} />);
}

export { Skeleton }
