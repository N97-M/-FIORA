import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('Testing connection to database...')
    const hero = await prisma.hero.findFirst()
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Supabase!',
      data: {
        heroId: hero?.id || 'none'
      }
    })
  } catch (err: any) {
    console.error('Database connection failed:', err)
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlLength: process.env.DATABASE_URL?.length || 0,
        dbUrlStart: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 15) : 'none'
      }
    }, { status: 500 })
  }
}
