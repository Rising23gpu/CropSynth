import { User } from '@supabase/supabase-js'
import { UserNav } from './UserNav'

export default function Header({ user }: { user: User }) {
  return (
    <header className="h-16 border-b bg-white flex items-center px-6 justify-between">
      <div>
        {/* We can make this dynamic later based on the page */}
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <UserNav user={user} />
    </header>
  )
}
