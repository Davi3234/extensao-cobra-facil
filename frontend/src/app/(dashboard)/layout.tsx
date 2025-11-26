'use client'

import { Header } from '@/components/header'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
