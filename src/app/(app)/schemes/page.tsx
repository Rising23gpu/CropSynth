import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function SchemesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Government Schemes</h3>
            <p className="text-gray-600 mb-6">
              Agricultural schemes and subsidies information will be integrated here.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Coming Soon:</strong> Access to government agricultural schemes, subsidies, and financial assistance programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}