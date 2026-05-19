import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { title_ar, title_en, desc_ar, desc_en, icon } = await request.json()

    if (!title_ar || !title_en) {
      return NextResponse.json({ error: 'Titles are required' }, { status: 400 })
    }

    const service = await prisma.service.create({
      data: {
        title_ar: title_ar || '',
        title_en: title_en || '',
        desc_ar: desc_ar || '',
        desc_en: desc_en || '',
        icon: icon || 'fas fa-star',
      }
    })

    revalidatePath('/admin/services')
    revalidatePath('/')

    return NextResponse.json(service)
  } catch (err: any) {
    console.error('Failed to create Service:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'No id provided' }, { status: 400 })
    }

    await prisma.service.delete({ where: { id } })

    revalidatePath('/admin/services')
    revalidatePath('/')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Failed to delete Service:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
