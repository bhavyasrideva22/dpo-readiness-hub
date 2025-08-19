import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  className?: string
  showPercentage?: boolean
}

export function ProgressBar({ progress, className, showPercentage = false }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Progress</span>
        {showPercentage && (
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  )
}