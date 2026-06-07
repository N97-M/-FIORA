import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const theme = await prisma.theme.findFirst()
  return NextResponse.json(theme || {})
}

export async function POST(req: Request) {
  const body = await req.json()
  
  const updateData = {
    // Website
    bg_website: body.bg_website,
    text_primary: body.text_primary,
    text_secondary: body.text_secondary,
    accent_gold: body.accent_gold,

    // Header
    bg_header: body.bg_header,
    text_header: body.text_header,
    text_header_mobile: body.text_header_mobile,
    text_header_hover: body.text_header_hover,

    // Footer
    bg_footer: body.bg_footer,
    text_footer: body.text_footer,
    link_footer: body.link_footer,
    accent_footer: body.accent_footer,

    // Cards
    bg_card: body.bg_card,
    text_card: body.text_card,

    // Badges
    bg_badge: body.bg_badge,
    text_badge: body.text_badge,

    // Buttons
    bg_button: body.bg_button,
    text_button: body.text_button,

    // Legacy
    background_color: body.bg_website, // map to old fallback
    text_color: body.text_primary,     // map to old fallback
    primary_gold: body.accent_gold,    // map to old fallback
  };

  const createData = {
    id: 1,
    ...updateData,
    bg_website: body.bg_website || '#ffffff',
    text_primary: body.text_primary || '#000000',
    text_secondary: body.text_secondary || '#555555',
    accent_gold: body.accent_gold || '#DBC07E',
    bg_header: body.bg_header || 'transparent',
    text_header: body.text_header || '#000000',
    text_header_mobile: body.text_header_mobile || '#000000',
    text_header_hover: body.text_header_hover || '#DBC07E',
    bg_footer: body.bg_footer || '#0a0a0a',
    text_footer: body.text_footer || '#ffffff',
    link_footer: body.link_footer || 'rgba(255,255,255,0.7)',
    accent_footer: body.accent_footer || '#DBC07E',
    bg_card: body.bg_card || '#FDFBF7',
    text_card: body.text_card || '#000000',
    bg_badge: body.bg_badge || '#222222',
    text_badge: body.text_badge || '#DBC07E',
    bg_button: body.bg_button || '#000000',
    text_button: body.text_button || '#ffffff',
  };

  const updatedTheme = await prisma.theme.upsert({
    where: { id: 1 },
    update: updateData,
    create: createData,
  })

  return NextResponse.json(updatedTheme)
}
