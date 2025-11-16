import { Button as ButtonHeadless } from '@headlessui/react'
import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...props }: ButtonProps) => (
  <ButtonHeadless {...props} className={twMerge('rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500', props.className)}>
    {children}
  </ButtonHeadless>
)
