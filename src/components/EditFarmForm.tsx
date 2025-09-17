'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FarmForm } from './FarmForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EditFarmFormProps {
  farm: {
    id: string
    farm_name: string
    land_size_acres: number
    soil_type?: string
    irrigation_type?: string
    primary_crops: string[]
    location?: { district: string; village: string }
  }
  onUpdate: () => void
}

export function EditFarmForm({ farm, onUpdate }: EditFarmFormProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (!isEditing) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
        Edit Farm
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-2xl w-full mx-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Edit Farm Details</CardTitle>
                <CardDescription>
                  Update your farm information including crops and land size.
                </CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>×</Button>
            </div>
          </CardHeader>
          <CardContent>
            <FarmForm
              isEdit={true}
              farm={farm}
              title="Edit Farm Details"
              submitText="Update Farm"
              onSuccess={() => {
                setIsEditing(false)
                onUpdate()
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}