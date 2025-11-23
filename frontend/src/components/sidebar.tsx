'use client'

import { ArrowRightLeft, ChartBar, ScrollText, Users } from 'lucide-react'
import Link from 'next/link'

export const Sidebar = () => {
  const items = [
    { href: '/dashboard', label: 'Visão Geral', icon: <ChartBar /> },
    { href: '/usuarios', label: 'Usuários', icon: <Users /> },
    { href: '/transacoes', label: 'Transações', icon: <ArrowRightLeft /> },
    { href: '/relatorios', label: 'Relatórios', icon: <ScrollText /> },
  ]

  return (
    <aside className="w-56 bg-white p-4 h-full shadow-sm">
      <nav className="flex flex-col gap-2">
        {items.map(item => (
          <Link key={item.href} href={item.href} className="px-3 py-2 rounded hover:bg-gray-100 flex gap-2">
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
