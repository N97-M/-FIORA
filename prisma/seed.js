const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

const prisma = new PrismaClient()

function hashPassword(plain) {
  return crypto.createHash('sha256').update(plain + 'fiora_salt_2024').digest('hex')
}

async function main() {
  console.log('🌱 Seeding Fiora database...\n')

  // ── 1. Super Admin ──────────────────────────────────────────────────────────
  await prisma.user.upsert({
    where: { email: 'monzerhafiz83@gmail.com' },
    update: {},
    create: {
      email: 'monzerhafiz83@gmail.com',
      username: 'monzerhafiz',
      displayName: 'Monzer Hafiz',
      password: hashPassword('monzerhafiz999'),
      role: 'SUPERADMIN',
      isActive: true,
    },
  })
  console.log('✅ Super Admin created')

  // ── 2. Hero Section ─────────────────────────────────────────────────────────
  await prisma.hero.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title_ar: 'فيورة | FIORA',
      title_en: 'FIORA | فيورة',
      tagline_ar: 'الفخامة تبدأ من هنا',
      tagline_en: 'LUXURY STARTS HERE',
      btn_gallery_ar: 'مشاهدة المعرض',
      btn_gallery_en: 'View Gallery',
      btn_contact_ar: 'تواصل معنا',
      btn_contact_en: 'Contact Us',
      feat_1_ar: 'تأجير',
      feat_1_en: 'Rental',
      feat_2_ar: 'تصميم',
      feat_2_en: 'Design',
      feat_3_ar: 'توصيل',
      feat_3_en: 'Delivery',
      bg_type: 'IMAGE',
      image_url: '/hero-bg.jpg',
      overlay_opacity: 0.55,
    },
  })
  console.log('✅ Hero section seeded')

  // ── 3. Navbar ───────────────────────────────────────────────────────────────
  await prisma.navbar.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      logo_url: '/logo.png',
      favicon_url: '/favicon.ico',
      nav_home_en: 'Home',
      nav_home_ar: 'الرئيسية',
      nav_about_en: 'About Us',
      nav_about_ar: 'من نحن',
      nav_services_en: 'Services',
      nav_services_ar: 'خدماتنا',
      nav_gallery_en: 'Our Work',
      nav_gallery_ar: 'أعمالنا',
      nav_how_en: 'How to Rent',
      nav_how_ar: 'كيفية التأجير',
      nav_contact_en: 'Contact Us',
      nav_contact_ar: 'تواصل معنا',
      sticky_enabled: true,
      lang_switch_show: true,
    },
  })
  console.log('✅ Navbar seeded')

  // ── 4. About ────────────────────────────────────────────────────────────────
  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title_ar: 'عن فيورة',
      title_en: 'About FIORA',
      content_ar: 'فيورة هي علامة تجارية فاخرة لتأجير ديكورات المناسبات، متخصصة في حوامل العرض الأنيقة والمرايا والتجهيزات المخصصة للخطوبة والزفاف والمناسبات الخاصة. نؤمن بأن كل لحظة تستحق لمسة من الفخامة والتميز.',
      content_en: 'FIORA is a luxury event decor rental brand specializing in elegant display stands, mirrors, and custom setups for engagements, weddings, and special occasions. We believe every moment deserves a touch of luxury and distinction.',
      image_url: '/logo.png',
    },
  })
  console.log('✅ About section seeded')

  // ── 5. Settings ─────────────────────────────────────────────────────────────
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      whatsapp_number: '249123456789',
      whatsapp_msg_ar: 'مرحباً فيورة، أود الاستفسار عن خدماتكم.',
      whatsapp_msg_en: 'Hello FIORA, I would like to inquire about your services.',
      phone_number: '249123456789',
      tiktok_url: 'https://www.tiktok.com/@fiora',
      instagram_url: '#',
      snapchat_url: '#',
      status: 'AVAILABLE',
    },
  })
  console.log('✅ Settings seeded')

  // ── 6. Theme ────────────────────────────────────────────────────────────────
  await prisma.theme.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      primary_gold: '#DBC07E',
      bg_dark: '#0a0a0a',
      text_white: '#ffffff',
      border_radius: '15px',
      glass_opacity: 0.1,
    },
  })
  console.log('✅ Theme seeded')

  // ── 7. SEO ──────────────────────────────────────────────────────────────────
  await prisma.sEO.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      meta_title_ar: 'فيورة | لتنسيق المناسبات الفاخرة',
      meta_title_en: 'FIORA | Luxury Event Decor Sudan',
      meta_desc_ar: 'تأجير ديكورات المناسبات الفاخرة في السودان — ستاندات، مرايا، وتجهيزات الأفراح والخطوبة.',
      meta_desc_en: 'Luxury event decor rentals in Sudan — stands, mirrors, and full setups for weddings & engagements.',
      keywords: 'fiora, luxury, event, decor, sudan, wedding, engagement, ستاندات, مرايا, فيورة',
    },
  })
  console.log('✅ SEO seeded')

  // ── 8. Gallery Categories ───────────────────────────────────────────────────
  const categories = [
    { name_ar: 'الكل',      name_en: 'All',         order: 0 },
    { name_ar: 'ستاندات',   name_en: 'Stands',      order: 1 },
    { name_ar: 'أفراح',     name_en: 'Weddings',    order: 2 },
    { name_ar: 'خطوبة',     name_en: 'Engagement',  order: 3 },
    { name_ar: 'ديكور خاص', name_en: 'Custom Decor',order: 4 },
    { name_ar: 'أخرى',      name_en: 'Others',      order: 5 },
  ]

  const createdCats = []
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat })
    createdCats.push(created)
  }
  console.log(`✅ ${createdCats.length} gallery categories seeded`)

  // ── 9. Services ─────────────────────────────────────────────────────────────
  const services = [
    { title_ar: 'تأجير ستاندات المناسبات', title_en: 'Event Stand Rentals',   desc_ar: 'حوامل عرض فاخرة لتسليط الضوء على مناسبتك.',                       desc_en: 'Premium display stands for your event highlights.',            icon: 'fas fa-th-large', order: 1 },
    { title_ar: 'ستاندات المجوهرات والشبكة', title_en: 'Jewelry & Ring Stands', desc_ar: 'حلول أنيقة لخواتم الخطوبة والزفاف.',                              desc_en: 'Elegant solutions for engagement and wedding rings.',          icon: 'fas fa-gem',      order: 2 },
    { title_ar: 'تجهيزات الأفراح',           title_en: 'Wedding Setups',       desc_ar: 'تجهيزات ديكور كاملة ليومك المميز.',                               desc_en: 'Complete decor setups for your special day.',                 icon: 'fas fa-heart',    order: 3 },
    { title_ar: 'مرايا وديكورات فاخرة',      title_en: 'Luxury Mirrors & Decor',desc_ar: 'نعكس الأناقة من خلال تصميمات المرايا الخاصة.',                   desc_en: 'Reflecting elegance through custom mirror designs.',          icon: 'fas fa-eye',      order: 4 },
    { title_ar: 'قطع ديكور حديثة',          title_en: 'Modern Decor Pieces',  desc_ar: 'قطع عصرية لرفع مستوى مكان مناسبتك.',                             desc_en: 'Contemporary items to elevate your venue.',                  icon: 'fas fa-lightbulb',order: 5 },
    { title_ar: 'التنفيذ الخاص',             title_en: 'Custom Execution',     desc_ar: 'نحول رؤيتك التصميمية الفريدة إلى واقع ملموس.',                   desc_en: 'Bringing your unique design visions to life.',               icon: 'fas fa-drafting-compass', order: 6 },
  ]

  for (const s of services) {
    await prisma.service.create({ data: s })
  }
  console.log(`✅ ${services.length} services seeded`)

  console.log('\n🎉 All done! Fiora database is fully seeded.')
}

main()
  .catch(e => { console.error('❌ Seed failed:', e.message); process.exit(1) })
  .finally(() => prisma.$disconnect())
