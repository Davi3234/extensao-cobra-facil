'use client'
import Link from 'next/link'

export const Sidebar = () => {
  const items = [
    { href: '/dashboard', label: 'Visão Geral' },
    { href: '/users', label: 'Usuários' },
    { href: '/transactions', label: 'Transações' },
    { href: '/notifications', label: 'Notificações' },
    { href: '/reports', label: 'Relatórios' },
  ]

  return (
    <aside className="w-56 bg-white p-4 h-full shadow-sm">
      <nav className="flex flex-col gap-2">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className="px-3 py-2 rounded hover:bg-gray-100">
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
