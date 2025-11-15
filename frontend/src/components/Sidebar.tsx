'use client'
import Link from 'next/link'

export const Sidebar = () => {
  const items = [
    { href: '/dashboard', label: 'Visão Geral' },
    { href: '/usuarios', label: 'Usuários' },
    { href: '/transacoes', label: 'Transações' },
    { href: '/notifications', label: 'Notificações' },
    { href: '/relatorios', label: 'Relatórios' },
  ]

  return (
    <aside className="w-56 bg-white p-4 h-full shadow-sm">
      <nav className="flex flex-col gap-2">
        {items.map(item => (
          <Link key={item.href} href={item.href} className="px-3 py-2 rounded hover:bg-gray-100">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
