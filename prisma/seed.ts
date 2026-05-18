import { prisma } from '../src/lib/prisma'

async function main() {
  // 1. Create Initial User
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { email: 'admin@fiora.com', username: 'admin', password: 'admin123', role: 'SUPERADMIN' }
  })

  // 2. Hero Section
  await prisma.hero.upsert({
    where: { id: 1 },
    update: {
      title_ar: "فيورة | FIORA",
      title_en: "FIORA | فيورة",
      tagline_ar: "الفخامة تبدأ من هنا",
      tagline_en: "LUXURY STARTS HERE"
    },
    create: {
      id: 1,
      title_ar: "فيورة | FIORA",
      title_en: "FIORA | فيورة",
      tagline_ar: "الفخامة تبدأ من هنا",
      tagline_en: "LUXURY STARTS HERE",
      btn_gallery_ar: "مشاهدة المعرض",
      btn_contact_ar: "تواصل معنا",
      image_url: "/hero-bg.jpg",
      overlay_opacity: 0.65
    }
  })

  // 3. About Section
  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title_ar: "عن فيورة | About FIORA",
      title_en: "About FIORA",
      content_ar: "فيورة هي علامة تجارية فاخرة لتأجير ديكورات المناسبات، متخصصة في حوامل العرض الأنيقة والمرايا والتجهيزات المخصصة للخطوبة والزفاف والمناسبات الخاصة.",
      content_en: "FIORA is a luxury event decor rental brand specializing in elegant display stands, mirrors, and custom setups for engagements, weddings, and special occasions.",
      image_url: "/logo.png"
    }
  })

  // Clear existing services to avoid duplicates
  await prisma.service.deleteMany()
  
  // 4. Services
  const servicesData = [
    { order: 1, icon: 'fas fa-th-large', title_en: 'Event Stand Rentals', desc_en: 'Premium display stands for your event highlights.', title_ar: 'تأجير ستاندات المناسبات', desc_ar: 'حوامل عرض فاخرة لتسليط الضوء على مناسبتك.' },
    { order: 2, icon: 'fas fa-gem', title_en: 'Jewelry & Ring Stands', desc_en: 'Elegant solutions for engagement and wedding rings.', title_ar: 'ستاندات المجوهرات والشبكة', desc_ar: 'حلول أنيقة لخواتم الخطوبة والزفاف.' },
    { order: 3, icon: 'fas fa-certificate', title_en: 'Wedding Preparations', desc_en: 'Complete decor setups for your special day.', title_ar: 'تجهيزات الأفراح', desc_ar: 'تجهيزات ديكور كاملة ليومك المميز.' },
    { order: 4, icon: 'fas fa-eye', title_en: 'Luxury Mirrors & Decor', desc_en: 'Reflecting elegance through custom mirror designs.', title_ar: 'مرايا وديكورات فاخرة', desc_ar: 'نعكس الأناقة من خلال تصميمات المرايا الخاصة.' },
    { order: 5, icon: 'fas fa-lightbulb', title_en: 'Modern Decor Pieces', desc_en: 'Contemporary items to elevate your venue.', title_ar: 'قطع ديكور حديثة', desc_ar: 'قطع عصرية لرفع مستوى مكان مناسبتك.' },
    { order: 6, icon: 'fas fa-drafting-table', title_en: 'Custom Execution', desc_en: 'Bringing your unique design visions to life.', title_ar: 'التنفيذ الخاص', desc_ar: 'نحول رؤيتك التصميمية الفريدة إلى واقع ملموس.' }
  ]
  for (const s of servicesData) {
    await prisma.service.create({ data: s })
  }

  // 5. Categories
  await prisma.category.deleteMany()
  const cats = [
    { id: 'stands', name_ar: 'ستاندات', name_en: 'Stands', order: 1 },
    { id: 'weddings', name_ar: 'أفراح', name_en: 'Weddings', order: 2 },
    { id: 'engagement', name_ar: 'خطوبة', name_en: 'Engagement', order: 3 },
    { id: 'custom', name_ar: 'ديكور خاص', name_en: 'Custom Decor', order: 4 },
    { id: 'others', name_ar: 'أخرى', name_en: 'Others', order: 5 }
  ]
  for (const c of cats) {
    await prisma.category.create({ data: c })
  }

  // Clear existing gallery items
  await prisma.galleryItem.deleteMany()

  // 6. Gallery Items
  const galleryItems = [
    { order: 1, categoryId: 'stands', title_en: 'Modern Minimalist Stand', desc_en: 'Sleek contemporary display.', title_ar: 'ستاند عصري بسيط', desc_ar: 'عرض عصري أنيق ومميز.', image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=500&q=60' },
    { order: 2, categoryId: 'weddings', title_en: 'Floral Archway', desc_en: 'Grand wedding entrance.', title_ar: 'قوس الزهور', desc_ar: 'مدخل زفاف فاخر ومميز.', image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=500&q=60' },
    { order: 3, categoryId: 'engagement', title_en: 'Diamond Display', desc_en: 'Luxury velvet stand.', title_ar: 'عرض الشبكة', desc_ar: 'ستاند مخملي فاخر للمجوهرات.', image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=500&q=60' },
    { order: 4, categoryId: 'others', title_en: 'Artistic Sculpture', desc_en: 'Unique artistic decor.', title_ar: 'مجسم فني', desc_ar: 'ديكور فني فريد ومميز.', image_url: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=500&q=60' },
    { order: 5, categoryId: 'custom', title_en: 'Bespoke Mirror', desc_en: 'Custom-made luxury mirror.', title_ar: 'مرآة مخصصة', desc_ar: 'مرآة فاخرة مصنوعة خصيصاً.', image_url: 'https://images.unsplash.com/photo-1470753051111-e6e87f651717?auto=format&fit=crop&w=500&q=60' },
    { order: 6, categoryId: 'stands', title_en: 'Vintage Gold', desc_en: 'Classic tiered display.', title_ar: 'ستاند ذهبي كلاسيكي', desc_ar: 'عرض كلاسيكي متعدد الطبقات.', image_url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=500&q=60' }
  ]
  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item })
  }

  console.log('Seeding finished with legacy data.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
