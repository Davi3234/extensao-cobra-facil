import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type ToolbarProps = HTMLAttributes<HTMLDivElement>

export function Toolbar({ children, ...props }: ToolbarProps) {
  return (
    <div {...props} className={twMerge('flex gap-1 justify-end', props.className)}>
      {children}
    </div>
  )
}
