import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Get all visible process steps ordered by step_number
export async function GET(request: NextRequest) {
  try {
    const steps = await prisma.processStep.findMany({
      orderBy: { step_number: 'asc' }
    });
    return NextResponse.json(steps);
  } catch (err: any) {
    console.error('Failed to fetch Process Steps:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Create a new process step (admin)
export async function POST(request: NextRequest) {
  try {
    const { step_number, title_en, title_ar, desc_en, desc_ar, isVisible } = await request.json();
    if (step_number == null || !title_en || !title_ar) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const step = await prisma.processStep.create({
      data: {
        step_number,
        title_en,
        title_ar,
        desc_en: desc_en || '',
        desc_ar: desc_ar || '',
        isVisible: isVisible ?? true,
      },
    });
    revalidatePath('/admin/how-to-rent');
    revalidatePath('/');
    return NextResponse.json(step);
  } catch (err: any) {
    console.error('Failed to create Process Step:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Update an existing process step (admin)
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const step = await prisma.processStep.update({
      where: { id },
      data: updates,
    });
    revalidatePath('/admin/how-to-rent');
    revalidatePath('/');
    return NextResponse.json(step);
  } catch (err: any) {
    console.error('Failed to update Process Step:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete a process step (admin)
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await prisma.processStep.delete({ where: { id } });
    revalidatePath('/admin/how-to-rent');
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Failed to delete Process Step:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
