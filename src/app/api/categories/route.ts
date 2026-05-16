import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name_ar, name_en } = await request.json()
    if (!name_ar || !name_en) {
      return NextResponse.json({ error: 'Both Arabic and English names are required' }, { status: 400 })
    }
    const count = await prisma.category.count()
    const category = await prisma.category.create({ data: { name_ar, name_en, order: count } })
    return NextResponse.json(category)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'No id' }, { status: 400 })
    // Check if any gallery items use this category
    const count = await prisma.galleryItem.count({ where: { categoryId: id } })
    if (count > 0) {
      return NextResponse.json({ error: `Cannot delete: ${count} image(s) use this category` }, { status: 400 })
    }
    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
