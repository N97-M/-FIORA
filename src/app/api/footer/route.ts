import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    let footer = await prisma.footer.findUnique({ where: { id: 1 } });
    if (!footer) {
      footer = await prisma.footer.create({ data: { id: 1 } });
    }
    return NextResponse.json(footer);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const footer = await prisma.footer.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data }
    });
    revalidatePath('/');
    return NextResponse.json(footer);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
