export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-blue-600 to-indigo-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
