import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...props }: ButtonProps) => (
  <button {...props} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
    {children}
  </button>
)
