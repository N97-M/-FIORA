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
      title_en: "Designing Spaces That Inspire",
      title_ar: "نصمم مساحات تنبض بالأناقة",
      tagline_en: "Elegant Interior & Event Design Solutions",
      tagline_ar: "حلول عصرية للتصميم والديكور",
      btn_gallery_en: "Explore Our Work",
      btn_gallery_ar: "استكشف أعمالنا",
      btn_contact_en: "Book Consultation",
      btn_contact_ar: "احجز استشارة",
      feat_1_en: "Design",
      feat_1_ar: "تصميم",
      feat_2_en: "Styling",
      feat_2_ar: "تنسيق",
      feat_3_en: "Execution",
      feat_3_ar: "تنفيذ",
    },
    create: {
      id: 1,
      title_en: "Designing Spaces That Inspire",
      title_ar: "نصمم مساحات تنبض بالأناقة",
      tagline_en: "Elegant Interior & Event Design Solutions",
      tagline_ar: "حلول عصرية للتصميم والديكور",
      btn_gallery_en: "Explore Our Work",
      btn_gallery_ar: "استكشف أعمالنا",
      btn_contact_en: "Book Consultation",
      btn_contact_ar: "احجز استشارة",
      image_url: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&w=1920&q=80",
      overlay_opacity: 0.5
    }
  })

  // 3. About Section
  await prisma.about.upsert({
    where: { id: 1 },
    update: {
      title_en: "About FIORA",
      title_ar: "عن فيورة",
      content_en: "FIORA is a creative design studio specialized in interior décor, event styling, and space planning. We transform empty spaces into elegant environments through carefully designed details that combine beauty, comfort, and functionality. From homes and receptions to cafés, restaurants, and celebrations, we create customized designs that reflect each client’s vision and style.",
      content_ar: "FIORA هو استوديو إبداعي متخصص في التصميم الداخلي، تنسيق الديكور، وتخطيط المساحات. نحول المساحات الفارغة إلى أماكن أنيقة من خلال تفاصيل مدروسة تجمع بين الجمال والراحة والوظيفة العملية. من المنازل والريسبشنات إلى الكافيهات والمطاعم والمناسبات، نصمم أفكاراً مخصصة تعكس رؤية وذوق كل عميل."
    },
    create: {
      id: 1,
      title_en: "About FIORA",
      title_ar: "عن فيورة",
      content_en: "FIORA is a creative design studio specialized in interior décor, event styling, and space planning. We transform empty spaces into elegant environments through carefully designed details that combine beauty, comfort, and functionality.",
      content_ar: "FIORA هو استوديو إبداعي متخصص في التصميم الداخلي، تنسيق الديكور، وتخطيط المساحات. نحول المساحات الفارغة إلى أماكن أنيقة من خلال تفاصيل مدروسة تجمع بين الجمال والراحة والوظيفة العملية.",
      image_url: "/logo.png"
    }
  })

  // 4. Services
  await prisma.service.deleteMany()
  const servicesData = [
    { order: 1, icon: 'fas fa-home', title_en: 'Interior Design', desc_en: 'Interior design for homes and spaces.', title_ar: 'تصميم داخلي', desc_ar: 'تصميم داخلي للمنازل والغرف والمساحات.' },
    { order: 2, icon: 'fas fa-building', title_en: 'Reception & Lobby Design', desc_en: 'Designing elegant reception areas.', title_ar: 'تصميم الريسبشن', desc_ar: 'تصميم الريسبشنات والاستقبالات.' },
    { order: 3, icon: 'fas fa-coffee', title_en: 'Café & Restaurant Design', desc_en: 'Creative concepts for dining spaces.', title_ar: 'تصميم الكافيهات والمطاعم', desc_ar: 'تصميم الكافيهات والمطاعم.' },
    { order: 4, icon: 'fas fa-glass-cheers', title_en: 'Event & Celebration Styling', desc_en: 'Luxury styling for your events.', title_ar: 'تنسيق المناسبات', desc_ar: 'تنسيق الحفلات والمناسبات.' },
    { order: 5, icon: 'fas fa-couch', title_en: 'Furniture & Space Planning', desc_en: 'Optimizing furniture and layouts.', title_ar: 'تخطيط الأثاث', desc_ar: 'تخطيط الأثاث وتنظيم المساحات.' },
    { order: 6, icon: 'fas fa-paint-brush', title_en: 'Custom Décor Solutions', desc_en: 'Bespoke decor elements on demand.', title_ar: 'حلول ديكور مخصصة', desc_ar: 'حلول ديكور مخصصة حسب الطلب.' },
    { order: 7, icon: 'fas fa-lightbulb', title_en: 'Lighting Design', desc_en: 'Atmospheric lighting arrangements.', title_ar: 'تصميم الإضاءة', desc_ar: 'تصميم وتوزيع الإضاءة.' },
    { order: 8, icon: 'fas fa-utensils', title_en: 'Table Styling & Setup', desc_en: 'Elegant table setups for dining.', title_ar: 'تنسيق الطاولات', desc_ar: 'تنسيق الطاولات والتقديم.' },
    { order: 9, icon: 'fas fa-bed', title_en: 'Bedroom & Home Setup', desc_en: 'Complete home styling services.', title_ar: 'تجهيز المنازل', desc_ar: 'تجهيز الغرف والمنازل بالكامل.' }
  ]
  for (const s of servicesData) {
    await prisma.service.create({ data: s })
  }

  // 5. Categories
  await prisma.category.deleteMany()
  const cats = [
    { id: 'interior', name_ar: 'تصميم داخلي', name_en: 'Interior Design', order: 1 },
    { id: 'reception', name_ar: 'ريسبشنات', name_en: 'Reception Areas', order: 2 },
    { id: 'cafe', name_ar: 'كافيهات ومطاعم', name_en: 'Café & Restaurant', order: 3 },
    { id: 'event', name_ar: 'تنسيق مناسبات', name_en: 'Event Styling', order: 4 },
    { id: 'table', name_ar: 'تنسيق طاولات', name_en: 'Table Setup', order: 5 },
    { id: 'luxury', name_ar: 'تفاصيل فاخرة', name_en: 'Luxury Details', order: 6 }
  ]
  for (const c of cats) {
    await prisma.category.create({ data: c })
  }

  // Clear existing gallery items
  await prisma.galleryItem.deleteMany()

  // 6. Gallery Items
  const galleryItems = [
    { order: 1, categoryId: 'interior', title_en: 'Modern Living Space', desc_en: 'Elegant and minimal living room.', title_ar: 'مساحة معيشة عصرية', desc_ar: 'غرفة معيشة أنيقة وبسيطة.', image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', isFeatured: true },
    { order: 2, categoryId: 'reception', title_en: 'Luxury Hotel Lobby', desc_en: 'A welcoming grand reception.', title_ar: 'لوبي فندق فاخر', desc_ar: 'استقبال ضخم وترحيبي.', image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', isFeatured: true },
    { order: 3, categoryId: 'cafe', title_en: 'Boutique Café', desc_en: 'Cozy and stylish café interior.', title_ar: 'مقهى بوتيك', desc_ar: 'مقهى دافئ وأنيق.', image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', isFeatured: true },
    { order: 4, categoryId: 'event', title_en: 'Gala Dinner Setup', desc_en: 'Exquisite event decor.', title_ar: 'تجهيز حفل عشاء', desc_ar: 'ديكور مناسبات راقي.', image_url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80' },
    { order: 5, categoryId: 'table', title_en: 'Fine Dining Setup', desc_en: 'Luxury table styling.', title_ar: 'إعداد عشاء فاخر', desc_ar: 'تنسيق طاولات فاخر.', image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80' },
    { order: 6, categoryId: 'luxury', title_en: 'Gold Accents', desc_en: 'Premium material finishes.', title_ar: 'لمسات ذهبية', desc_ar: 'تشطيبات من مواد فاخرة.', image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80' }
  ]
  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item })
  }

  // 7. Process Steps
  await prisma.processStep.deleteMany()
  const steps = [
    { step_number: 1, title_en: "Consultation", title_ar: "الاستشارة", desc_en: "Discuss your vision and requirements.", desc_ar: "مناقشة رؤيتك ومتطلباتك." },
    { step_number: 2, title_en: "Planning", title_ar: "التخطيط", desc_en: "Space planning and initial concepts.", desc_ar: "تخطيط المساحة والمفاهيم الأولية." },
    { step_number: 3, title_en: "Design Concept", title_ar: "مفهوم التصميم", desc_en: "Detailed design and material selection.", desc_ar: "التصميم التفصيلي واختيار المواد." },
    { step_number: 4, title_en: "Execution", title_ar: "التنفيذ", desc_en: "Bringing the design to life.", desc_ar: "تحويل التصميم إلى واقع." },
    { step_number: 5, title_en: "Final Styling", title_ar: "التنسيق النهائي", desc_en: "Adding the final touches of elegance.", desc_ar: "إضافة اللمسات النهائية من الأناقة." }
  ]
  for (const step of steps) {
    await prisma.processStep.create({ data: step })
  }

  // 8. Testimonials
  await prisma.testimonial.deleteMany()
  const testimonials = [
    { client_name_en: "Sarah M.", client_name_ar: "سارة م.", content_en: "FIORA completely transformed our café into a cozy, luxurious space. The attention to detail is unmatched.", content_ar: "قامت فيورة بتحويل المقهى الخاص بنا بالكامل إلى مساحة مريحة وفاخرة. الاهتمام بالتفاصيل لا مثيل له.", rating: 5 },
    { client_name_en: "Ahmed A.", client_name_ar: "أحمد أ.", content_en: "The interior design for our new home exceeded all expectations. Elegant and functional.", content_ar: "التصميم الداخلي لمنزلنا الجديد فاق كل التوقعات. أنيق وعملي.", rating: 5 },
    { client_name_en: "Laila Y.", client_name_ar: "ليلى ي.", content_en: "Their event styling made our reception unforgettable. Highly recommended!", content_ar: "تنسيقهم للمناسبة جعل حفل الاستقبال لا يُنسى. نوصي بهم بشدة!", rating: 5 }
  ]
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }

  console.log('Seeding finished with new rebranded data.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

