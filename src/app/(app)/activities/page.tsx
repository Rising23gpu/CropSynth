import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ActivitiesClient from './ActivitiesClient'

export default async function ActivitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user's farms
  const { data: farms, error } = await supabase
    .from('farms')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching farms:', error)
  }

  const userFarms = farms || []

  // If no farms, redirect to farm creation
  if (userFarms.length === 0) {
    redirect('/farm/create')
  }

  return <ActivitiesClient farms={userFarms} />
}