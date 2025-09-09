'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FarmSchema = z.object({
  farm_name: z.string().min(3, 'Farm name must be at least 3 characters'),
  land_size_acres: z.coerce.number().min(0.1, 'Land size must be at least 0.1 acres'),
  soil_type: z.string().optional(),
  irrigation_type: z.string().optional(),
  primary_crops: z.string().optional(),
})

export type FormState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
}

export async function createFarm(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { message: 'Authentication error', errors: { auth: ['User not found'] } }
  }

  const validatedFields = FarmSchema.safeParse({
    farm_name: formData.get('farm_name'),
    land_size_acres: formData.get('land_size_acres'),
    soil_type: formData.get('soil_type'),
    irrigation_type: formData.get('irrigation_type'),
    primary_crops: formData.get('primary_crops'),
  })

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { farm_name, land_size_acres, soil_type, irrigation_type, primary_crops } = validatedFields.data

  const { error } = await supabase.from('farms').insert({
    user_id: user.id,
    farm_name,
    land_size_acres,
    soil_type,
    irrigation_type,
    primary_crops: primary_crops ? primary_crops.split(',').map(s => s.trim()) : [],
    // TODO: Add location data later
  })

  if (error) {
    console.error('Database Error:', error)
    return { message: 'Database error: Could not create farm.', errors: { db: [error.message] } }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
