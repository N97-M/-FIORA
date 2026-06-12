import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(services)
  } catch (err: any) {
    console.error('Failed to fetch Services:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    const service = await prisma.service.update({
      where: { id },
      data: updates,
    })
    revalidatePath('/admin/services')
    revalidatePath('/')
    return NextResponse.json(service)
  } catch (err: any) {
    console.error('Failed to update Service:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const service = await prisma.service.create({
      data: {
        title_en: data.title_en || 'New Service',
        title_ar: data.title_ar || 'خدمة جديدة',
        desc_en: data.desc_en || '',
        desc_ar: data.desc_ar || '',
        icon: data.icon || 'fas fa-star',
        isVisible: true,
        order: 0,
      },
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
