'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { createFarm, type FormState } from '@/app/actions/farm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Creating Farm...' : 'Create Farm'}
    </Button>
  )
}

export default function CreateFarmPage() {
  const initialState: FormState = { message: '', errors: {} }
  const [state, dispatch] = useActionState(createFarm, initialState)

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Farm Profile</CardTitle>
          <CardDescription>
            Provide some basic details about your farm to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="farm_name">Farm Name</Label>
              <Input id="farm_name" name="farm_name" required placeholder="e.g., Ravi's Farm" />
              {state.errors?.farm_name && <p className="text-sm text-red-500 mt-1">{state.errors.farm_name.join(', ')}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="land_size_acres">Land Size (in acres)</Label>
              <Input id="land_size_acres" name="land_size_acres" type="number" step="0.1" required placeholder="e.g., 1.5" />
              {state.errors?.land_size_acres && <p className="text-sm text-red-500 mt-1">{state.errors.land_size_acres.join(', ')}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil_type">Soil Type</Label>
              <Select name="soil_type">
                <SelectTrigger>
                  <SelectValue placeholder="Select a soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="silty">Silty</SelectItem>
                  <SelectItem value="peaty">Peaty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigation_type">Irrigation Type</Label>
              <Select name="irrigation_type">
                <SelectTrigger>
                  <SelectValue placeholder="Select an irrigation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler Irrigation</SelectItem>
                  <SelectItem value="surface">Surface Irrigation</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="rain-fed">Rain-fed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primary_crops">Primary Crops (comma-separated)</Label>
              <Textarea id="primary_crops" name="primary_crops" placeholder="e.g., Rice, Brinjal, Okra" />
            </div>

            <SubmitButton />

            {state.message && !state.errors && <p className="text-sm text-green-500 mt-2">{state.message}</p>}
            {state.errors?.db && <p className="text-sm text-red-500 mt-2">{state.errors.db.join(', ')}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
