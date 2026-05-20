import { prisma } from '@/lib/prisma'
import Script from 'next/script'

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch Data from Database
  const hero = await prisma.hero.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } })
  const about = await prisma.about.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } })
  const settings = await prisma.settings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } })
  
  const services = await prisma.service.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } })
  const galleryRaw = await prisma.galleryItem.findMany({ include: { category: true }, where: { isVisible: true }, orderBy: { order: 'asc' } })
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } })

  // Group by category and interleave (round-robin style) to mix categories in "All" view
  const groups: { [key: string]: any[] } = {}
  galleryRaw.forEach(item => {
    const catId = item.categoryId || 'other'
    if (!groups[catId]) groups[catId] = []
    groups[catId].push(item)
  })

  const gallery: any[] = []
  const groupKeys = Object.keys(groups)
  let maxLen = 0
  groupKeys.forEach(k => {
    if (groups[k].length > maxLen) maxLen = groups[k].length
  })

  for (let i = 0; i < maxLen; i++) {
    groupKeys.forEach(k => {
      if (groups[k][i]) {
        gallery.push(groups[k][i])
      }
    })
  }
  
  // Safely get or create Navbar settings
  const navbar = await prisma.navbar.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  })

  return (
    <main>
      <div id="scroll-progress" className="scroll-progress"></div>

      {/* Luxury Preloader */}
      <div id="preloader" className="preloader">
          <div className="preloader-content">
              <div className="preloader-logo">
                  <img src="/logo.png" alt="FIORA" />
              </div>
              <div className="preloader-bar"></div>
          </div>
      </div>

      <canvas id="particles-canvas" className="particles-canvas"></canvas>
      <div id="custom-cursor" className="custom-cursor"></div>
      <div id="cursor-follower" className="cursor-follower"></div>

      <header>
          <div className="container">
              <nav>
                  <a href="#home" className="logo">
                      <img src="/logo.png" alt="FIORA" className="main-logo" />
                  </a>
                  <ul className="nav-links" id="navLinks">
                      <li className="mobile-menu-close">&times;</li>
                      <li><a href="#home"><span className="ar-text">{navbar?.nav_home_ar}</span><span className="en-text">{navbar?.nav_home_en}</span></a></li>
                      <li><a href="#about"><span className="ar-text">{navbar?.nav_about_ar}</span><span className="en-text">{navbar?.nav_about_en}</span></a></li>
                      <li><a href="#services"><span className="ar-text">{navbar?.nav_services_ar}</span><span className="en-text">{navbar?.nav_services_en}</span></a></li>
                      <li><a href="#gallery"><span className="ar-text">{navbar?.nav_gallery_ar}</span><span className="en-text">{navbar?.nav_gallery_en}</span></a></li>
                      <li><a href="#how-it-works"><span className="ar-text">{navbar?.nav_how_ar}</span><span className="en-text">{navbar?.nav_how_en}</span></a></li>
                      <li><a href="#contact"><span className="ar-text">{navbar?.nav_contact_ar}</span><span className="en-text">{navbar?.nav_contact_en}</span></a></li>
                  </ul>
                  <div className="nav-actions">
                      <button id="langSwitch" className="lang-btn">AR | EN</button>
                      <button id="mobileMenuBtn" className="mobile-menu-btn">
                          <i className="fas fa-bars"></i>
                      </button>
                  </div>
              </nav>
          </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden', backgroundImage: hero?.bg_type === 'IMAGE' ? `linear-gradient(rgba(0,0,0,${hero?.overlay_opacity || 0.6}), rgba(0,0,0,${hero?.overlay_opacity || 0.6})), url(${hero?.image_url || '/hero-bg.jpg'})` : 'none' }}>
          
          {hero?.bg_type === 'VIDEO' && (
             <>
                 <video autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} src={hero.image_url}></video>
                 <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `rgba(0,0,0,${hero.overlay_opacity || 0.6})`, zIndex: 1 }}></div>
             </>
          )}

          <div className="container hero-content" style={{ position: 'relative', zIndex: 2 }}>
              <h1>
                  <span className="ar-text">{hero?.title_ar}</span>
                  <span className="en-text">{hero?.title_en}</span>
              </h1>
              <div className="tagline">
                  <span className="ar-text">{hero?.tagline_ar}</span>
                  <span className="en-text">{hero?.tagline_en}</span>
              </div>
              <div className="hero-btns">
                  <a href="#gallery" className="btn btn-primary">
                      <span className="ar-text">{hero?.btn_gallery_ar}</span>
                      <span className="en-text">{hero?.btn_gallery_en}</span>
                  </a>
                  <a href="#contact" className="btn btn-secondary">
                      <span className="ar-text">{hero?.btn_contact_ar}</span>
                      <span className="en-text">{hero?.btn_contact_en}</span>
                  </a>
              </div>
              
              <div className="features">
                  <div className="feature-item"><i className="fas fa-key"></i> <span className="ar-text">{hero?.feat_1_ar}</span><span className="en-text">{hero?.feat_1_en}</span></div>
                  <div className="feature-item"><i className="fas fa-pen-nib"></i> <span className="ar-text">{hero?.feat_2_ar}</span><span className="en-text">{hero?.feat_2_en}</span></div>
                  <div className="feature-item"><i className="fas fa-paper-plane"></i> <span className="ar-text">{hero?.feat_3_ar}</span><span className="en-text">{hero?.feat_3_en}</span></div>
              </div>

              <div className="scroll-indicator">
                  <i className="fas fa-chevron-down"></i>
              </div>
          </div>
      </section>

      {/* About Section */}
      <section id="about" className="about reveal">
          <div className="container">
              <div className="section-title" data-bg-text="ABOUT">
                  <span className="subtitle" data-i18n="about_sub">قصتنا</span>
                  <h2>
                      <span className="ar-text">{about?.title_ar}</span>
                      <span className="en-text">{about?.title_en}</span>
                  </h2>
              </div>
              <div className="about-grid">
                  <div className="about-text">
                      <p className="ar-text">{about?.content_ar}</p>
                      <p className="en-text">{about?.content_en}</p>
                      
                      <div className="brand-values">
                          <div className="value-item"><i className="fas fa-check"></i> <span data-i18n="val_1">الأناقة</span></div>
                          <div className="value-item"><i className="fas fa-check"></i> <span data-i18n="val_2">الجودة</span></div>
                          <div className="value-item"><i className="fas fa-check"></i> <span data-i18n="val_3">التخصيص</span></div>
                          <div className="value-item"><i className="fas fa-check"></i> <span data-i18n="val_4">التسليم في الوقت المحدد</span></div>
                      </div>
                  </div>
                  <div className="about-visual">
                      <img src={about?.image_url || "/logo.png"} alt="FIORA" className="about-logo" />
                  </div>
              </div>
          </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services reveal">
          <div className="container">
              <div className="section-title" data-bg-text="SERVICES">
                  <h2 data-i18n="services_title">خدماتنا | Our Services</h2>
              </div>
              <div className="services-grid" id="servicesGrid">
                  {services.map((service: any) => (
                    <div key={service.id} className="service-card">
                        <i className={service.icon}></i>
                        <h3>
                            <span className="ar-text">{service.title_ar}</span>
                            <span className="en-text">{service.title_en}</span>
                        </h3>
                        <p>
                            <span className="ar-text">{service.desc_ar}</span>
                            <span className="en-text">{service.desc_en}</span>
                        </p>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery reveal">
          <div className="container">
              <div className="section-title" data-bg-text="WORK">
                  <h2 data-i18n="gallery_title">أعمالنا | Our Work</h2>
              </div>
              
              <div className="gallery-filters">
                  <button className="filter-btn active" data-filter="all" data-i18n="filter_all">الكل</button>
                  {categories.filter((cat: any) => cat.name_en !== 'All').map((cat: any) => (
                    <button key={cat.id} className="filter-btn" data-filter={cat.id}>
                        <span className="ar-text">{cat.name_ar}</span>
                        <span className="en-text">{cat.name_en}</span>
                    </button>
                  ))}
              </div>

              <div className="gallery-grid" id="galleryGrid">
                  {gallery.map((item: any) => {
                    const hasTitle = Boolean(item.title_ar || item.title_en);
                    const hasDesc = Boolean(item.desc_ar || item.desc_en);
                    const isTitleOnly = hasTitle && !hasDesc;
                    const isImageOnly = !hasTitle && !hasDesc;

                    return (
                      <div key={item.id} className={`gallery-card ${item.categoryId} ${isTitleOnly ? 'title-only' : ''} ${isImageOnly ? 'image-only' : ''}`}>
                          <div className="gallery-image">
                              <img src={item.image_url} alt={item.title_en || "Gallery Image"} />
                          </div>
                          {(hasTitle || hasDesc) && (
                              <div className="gallery-info">
                                  {hasTitle && (
                                      <h4>
                                          {item.title_ar && <span className="ar-text">{item.title_ar}</span>}
                                          {item.title_en && <span className="en-text">{item.title_en}</span>}
                                      </h4>
                                  )}
                                  {hasDesc && (
                                      <p>
                                          {item.desc_ar && <span className="ar-text">{item.desc_ar}</span>}
                                          {item.desc_en && <span className="en-text">{item.desc_en}</span>}
                                      </p>
                                  )}
                              </div>
                          )}
                      </div>
                    );
                  })}
              </div>

              <div className="gallery-load-more" id="galleryLoadMore" style={{ textAlign: 'center', marginTop: '40px', display: 'none' }}>
                  <button className="btn btn-outline" id="loadMoreBtn" data-i18n="load_more">
                      إظهار المزيد
                  </button>
              </div>
          </div>
      </section>

      {/* How it Works (Timeline) */}
      <section id="how-it-works" className="how-it-works reveal">
          <div className="container">
              <div className="section-title" data-bg-text="PROCESS">
                  <h2 data-i18n="how_title">كيف يعمل | How It Works</h2>
              </div>
              <div className="timeline" id="timelineGrid">
                  {/* Timeline is populated dynamically by script.js but we will put it statically to prevent empty flashes */}
                  <div className="timeline-item">
                      <div className="step-number">1</div>
                      <div className="timeline-content">
                          <h4 data-i18n="how_step1_t">تواصل معنا</h4>
                          <p data-i18n="how_step1_d">عبر الواتساب أو الهاتف لبدء العملية.</p>
                      </div>
                  </div>
                  <div className="timeline-item">
                      <div className="step-number">2</div>
                      <div className="timeline-content">
                          <h4 data-i18n="how_step2_t">شارك التفاصيل</h4>
                          <p data-i18n="how_step2_d">أخبرنا بموعد مناسبتك ومتطلباتك الخاصة.</p>
                      </div>
                  </div>
                  <div className="timeline-item">
                      <div className="step-number">3</div>
                      <div className="timeline-content">
                          <h4 data-i18n="how_step3_t">اختر القطع</h4>
                          <p data-i18n="how_step3_d">اختر القطع المثالية من كتالوجنا المميز.</p>
                      </div>
                  </div>
                  <div className="timeline-item">
                      <div className="step-number">4</div>
                      <div className="timeline-content">
                          <h4 data-i18n="how_step4_t">نحن نسلم</h4>
                          <p data-i18n="how_step4_d">التجهيز الكامل والاستلام من موقعك.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
          <div className="container">
              <div className="contact-minimal reveal">
                  <div className="section-title" data-bg-text="CONTACT">
                      <h2 data-i18n="contact_title">تواصل معنا | Get In Touch</h2>
                  </div>
                  
                  <div className="contact-icon-row">
                      <a href={`https://wa.me/${settings?.whatsapp_number}`} className="contact-icon-item" title="WhatsApp">
                          <div className="icon-inner wa"><i className="fab fa-whatsapp"></i></div>
                      </a>
                      
                      {/* Restored Location Icon */}
                      <a href="https://maps.google.com" target="_blank" className="contact-icon-item" title="Location">
                          <div className="icon-inner lc"><i className="fas fa-map-marker-alt"></i></div>
                      </a>
                      
                      {settings?.tiktok_url && (
                        <a href={settings.tiktok_url} target="_blank" className="contact-icon-item" title="TikTok">
                            <div className="icon-inner tk"><i className="fab fa-tiktok"></i></div>
                        </a>
                      )}
                  </div>
                  <p className="contact-hint" data-i18n="contact_sub">نحن هنا لتحويل رؤيتك إلى حقيقة</p>
              </div>
          </div>
      </section>

      <footer className="luxury-footer">
          <div className="container">
              <div className="footer-grid">
                  <div className="footer-brand">
                      <img src="/logo.png" alt="FIORA" className="footer-logo-img" />
                      <p>
                          <span className="ar-text">نصنع الأناقة لأغلى لحظاتك. تأجير ديكورات المناسبات الفاخرة في السودان.</span>
                          <span className="en-text">Crafting elegance for your most precious moments. Luxury event decor and rentals in Sudan.</span>
                      </p>
                  </div>
                  <div className="footer-links">
                      <h5>
                          <span className="ar-text">استكشف</span>
                          <span className="en-text">Explore</span>
                      </h5>
                      <ul>
                          <li><a href="#about"><span className="ar-text">من نحن</span><span className="en-text">About Us</span></a></li>
                          <li><a href="#services"><span className="ar-text">خدماتنا</span><span className="en-text">Services</span></a></li>
                          <li><a href="#gallery"><span className="ar-text">أعمالنا</span><span className="en-text">Gallery</span></a></li>
                      </ul>
                  </div>
                  <div className="footer-links">
                      <h5>
                          <span className="ar-text">مجالنا</span>
                          <span className="en-text">Our Niche</span>
                      </h5>
                      <ul>
                          <li><span className="ar-text">حفلات زفاف</span><span className="en-text">Weddings</span></li>
                          <li><span className="ar-text">خطوبات</span><span className="en-text">Engagements</span></li>
                          <li><span className="ar-text">مناسبات الشركات</span><span className="en-text">Corporate Events</span></li>
                      </ul>
                  </div>
                  <div className="footer-social">
                      <h5>
                          <span className="ar-text">تابعنا</span>
                          <span className="en-text">Follow Us</span>
                      </h5>
                      <div className="social-icons">
                          {settings?.tiktok_url && <a href={settings.tiktok_url} target="_blank"><i className="fab fa-tiktok"></i></a>}
                          <a href={`https://wa.me/${settings?.whatsapp_number}`}><i className="fab fa-whatsapp"></i></a>
                      </div>
                  </div>
              </div>
              <div className="footer-bottom">
                  <p>&copy; 2024 FIORA. 
                      <span className="ar-text"> جميع الحقوق محفوظة.</span>
                      <span className="en-text"> All rights reserved.</span>
                  </p>
                  <p className="designer-sig">LUXURY STARTS HERE</p>
              </div>
          </div>
      </footer>

      {/* Back to Top */}
      <button id="backToTop" className="back-to-top">
          <i className="fas fa-chevron-up"></i>
      </button>

      {/* Luxury Lightbox */}
      <div id="lightbox" className="lightbox">
          <span className="lightbox-close">&times;</span>
          <img className="lightbox-content" id="lightbox-img" />
          <div id="lightbox-caption"></div>
      </div>

      {/* Scripts */}
      <Script src="/script.js" strategy="afterInteractive" />
      <Script id="preloader-fail-safe" strategy="afterInteractive">
        {`
          setTimeout(() => {
            const loader = document.getElementById('preloader');
            if (loader && !loader.classList.contains('hidden')) {
              loader.classList.add('hidden');
              setTimeout(() => loader.style.display = 'none', 500);
            }
          }, 2500);
        `}
      </Script>
    </main>
  )
}
