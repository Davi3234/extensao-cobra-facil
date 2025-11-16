import { Input as InputHeadless } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export const Input = ({ label, ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <InputHeadless {...props} className={twMerge('border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500', props.className)} />
  </div>
)
