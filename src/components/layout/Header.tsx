'use client'

import { User } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'
import { UserNav } from './UserNav'

export default function Header({ user }: { user: User }) {
  const pathname = usePathname()

  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Overview'
      case '/crop-bot':
        return 'Crop-Bot'
      case '/weather':
        return 'Weather'
      case '/activities':
        return 'Activities'
      case '/expenses':
        return 'Expenses'
      case '/crop-doctor':
        return 'Crop Doctor'
      case '/schemes':
        return 'Schemes'
      default:
        return 'Dashboard'
    }
  }

  return (
    <header className="h-16 border-b bg-white flex items-center px-6 justify-between">
      <div>
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>
      <UserNav user={user} />
    </header>
  )
}
