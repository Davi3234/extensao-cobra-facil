export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export const Input = ({ label, ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input {...props} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  </div>
)
