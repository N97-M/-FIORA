import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const {
      nav_home_ar, nav_home_en,
      nav_about_ar, nav_about_en,
      nav_services_ar, nav_services_en,
      nav_gallery_ar, nav_gallery_en,
      nav_how_ar, nav_how_en,
      nav_contact_ar, nav_contact_en
    } = await request.json()

    const data = {
      nav_home_ar: nav_home_ar || '',
      nav_home_en: nav_home_en || '',
      nav_about_ar: nav_about_ar || '',
      nav_about_en: nav_about_en || '',
      nav_services_ar: nav_services_ar || '',
      nav_services_en: nav_services_en || '',
      nav_gallery_ar: nav_gallery_ar || '',
      nav_gallery_en: nav_gallery_en || '',
      nav_how_ar: nav_how_ar || '',
      nav_how_en: nav_how_en || '',
      nav_contact_ar: nav_contact_ar || '',
      nav_contact_en: nav_contact_en || '',
    }

    const updated = await prisma.navbar.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data }
    })

    revalidatePath('/')
    revalidatePath('/admin/navbar')

    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    console.error('Failed to update navbar:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
