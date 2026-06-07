import { prisma } from '@/lib/prisma'
import Script from 'next/script'
import Image from 'next/image'
import ReviewForm from '@/components/ReviewForm'

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch Data from Database
  const hero = await prisma.hero.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } })
  const about = await prisma.about.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } })
  const settings = await prisma.settings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } })
  
  const services = await prisma.service.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } })
  const galleryRaw = await prisma.galleryItem.findMany({ include: { category: true }, where: { isVisible: true }, orderBy: { order: 'asc' } })
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } })
  const beforeAfters = await prisma.beforeAfter.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } })
  const processSteps = await prisma.processStep.findMany({ where: { isVisible: true }, orderBy: { step_number: 'asc' } })
  const testimonials = await prisma.testimonial.findMany({ where: { isVisible: true } })
  
  const featuredProjects = galleryRaw.filter(item => item.isFeatured)

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
  
  const navbar = await prisma.navbar.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  })

  const theme = await prisma.theme.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  })

  const footer = await prisma.footer.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  })

  return (
    <main className="light-theme">
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          /* Global */
          --bg-website: ${theme.bg_website || '#ffffff'};
          --text-primary: ${theme.text_primary || '#000000'};
          --text-secondary: ${theme.text_secondary || '#555555'};
          --accent-gold: ${theme.accent_gold || '#DBC07E'};
          
          /* Header */
          --bg-header: ${theme.bg_header || 'transparent'};
          --text-header: ${theme.text_header || '#000000'};
          --text-header-mobile: ${theme.text_header_mobile || '#000000'};
          --text-header-hover: ${theme.text_header_hover || '#DBC07E'};
          
          /* Footer */
          --bg-footer: ${theme.bg_footer || '#0a0a0a'};
          --text-footer: ${theme.text_footer || '#ffffff'};
          --link-footer: ${theme.link_footer || 'rgba(255,255,255,0.7)'};
          --accent-footer: ${theme.accent_footer || '#DBC07E'};
          
          /* Cards */
          --bg-card: ${theme.bg_card || '#FDFBF7'};
          --text-card: ${theme.text_card || '#000000'};
          
          /* Badges */
          --bg-badge: ${theme.bg_badge || '#222222'};
          --text-badge: ${theme.text_badge || '#DBC07E'};
          
          /* Buttons */
          --bg-button: ${theme.bg_button || '#000000'};
          --text-button: ${theme.text_button || '#ffffff'};

          /* Legacy mappings for backward compatibility during transition */
          --bg-public-main: var(--bg-website);
          --text-public-main: var(--text-primary);
          --primary-gold: var(--accent-gold);
          --bg-public-alt: var(--bg-card);
          --dark-black: var(--text-primary);
          --text-muted: var(--text-secondary);
        }
        main {
          background-color: var(--bg-website);
          color: var(--text-primary);
        }
        .hero {
          background-image: ${hero?.bg_type === 'IMAGE' ? `linear-gradient(rgba(253, 251, 247, ${hero?.overlay_opacity || 0.3}), rgba(253, 251, 247, ${hero?.overlay_opacity || 0.3})), url(${hero?.image_url || '/hero-bg.jpg'})` : 'none'} !important;
        }
        header { background-color: var(--bg-header); }
        .nav-links a { color: var(--text-header) !important; }
        .nav-links a:hover { color: var(--text-header-hover) !important; }
        @media (max-width: 768px) {
          .nav-links a { color: var(--text-header-mobile) !important; }
        }
        
        .luxury-footer a { color: var(--link-footer) !important; }
        .luxury-footer i { color: var(--accent-footer) !important; }
      `}} />
      <div id="scroll-progress" className="scroll-progress"></div>

      {/* Luxury Preloader */}
      <div id="preloader" className="preloader" style={{ background: 'var(--bg-public-main)' }}>
          <div className="preloader-content">
              <div className="preloader-logo">
                  <img src="/logo.png" alt="FIORA" style={{ filter: 'invert(1) drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))' }} />
              </div>
              <div className="preloader-bar" style={{ background: 'rgba(212, 175, 55, 0.4)' }}></div>
          </div>
      </div>

      <header style={{ background: 'var(--bg-header)' }}>
          <div className="container">
              <nav>
                  <a href="#home" className="logo">
                      <img src="/logo.png" alt="FIORA" className="main-logo" style={{ filter: theme?.bg_header === '#0a0a0a' ? 'invert(0)' : 'invert(1)' }} />
                  </a>
                  <ul className="nav-links" id="navLinks">
                      <li className="mobile-menu-close">&times;</li>
                      <li><a href="#home"><span className="ar-text">{navbar?.nav_home_ar}</span><span className="en-text">{navbar?.nav_home_en}</span></a></li>
                      <li><a href="#about"><span className="ar-text">{navbar?.nav_about_ar}</span><span className="en-text">{navbar?.nav_about_en}</span></a></li>
                      <li><a href="#services"><span className="ar-text">{navbar?.nav_services_ar}</span><span className="en-text">{navbar?.nav_services_en}</span></a></li>
                      <li><a href="#gallery"><span className="ar-text">{navbar?.nav_gallery_ar || "مشاريعنا"}</span><span className="en-text">{navbar?.nav_gallery_en || "Projects"}</span></a></li>
                      <li><a href="#process"><span className="ar-text">{navbar?.nav_how_ar}</span><span className="en-text">{navbar?.nav_how_en}</span></a></li>
                      <li><a href="#testimonials"><span className="ar-text">{navbar?.nav_testimonials_ar}</span><span className="en-text">{navbar?.nav_testimonials_en}</span></a></li>
                      <li><a href="#contact"><span className="ar-text">{navbar?.nav_contact_ar}</span><span className="en-text">{navbar?.nav_contact_en}</span></a></li>
                  </ul>
                  <div className="nav-actions">
                      <button id="langSwitch" className="lang-btn" style={{ borderColor: 'var(--text-header)', color: 'var(--text-header)' }}>AR | EN</button>
                      <button id="mobileMenuBtn" className="mobile-menu-btn" style={{ color: 'var(--text-header)' }}>
                          <i className="fas fa-bars"></i>
                      </button>
                  </div>
              </nav>
          </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
          
          {/* Desktop Media */}
          <div className="hero-desktop-media" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            {hero?.bg_type === 'IMAGE' ? (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${hero?.image_url || '/hero-bg.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
            ) : hero?.bg_type === 'VIDEO' && hero?.image_url ? (
              <video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', objectFit: 'cover', transform: 'translate(-50%, -50%)', zIndex: 0 }}>
                <source src={hero.image_url} type="video/mp4" />
                <source src={hero.image_url} type="video/webm" />
              </video>
            ) : null}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: `rgba(253, 251, 247, ${hero?.overlay_opacity || 0.3})`, zIndex: 1 }} />
          </div>

          {/* Mobile Media */}
          <div className="hero-mobile-media" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            {hero?.mobile_bg_type === 'IMAGE' ? (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${hero?.mobile_image_url || hero?.image_url || '/hero-bg.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
            ) : hero?.mobile_bg_type === 'VIDEO' && hero?.mobile_image_url ? (
              <video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', objectFit: 'cover', transform: 'translate(-50%, -50%)', zIndex: 0 }}>
                <source src={hero.mobile_image_url} type="video/mp4" />
                <source src={hero.mobile_image_url} type="video/webm" />
              </video>
            ) : null}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: `rgba(253, 251, 247, ${hero?.overlay_opacity || 0.3})`, zIndex: 1 }} />
          </div>

          <div className="container hero-content" style={{ position: 'relative', zIndex: 2 }}>
              <h1 style={{ color: 'var(--dark-black)' }}>
                  <span className="ar-text">{hero?.title_ar}</span>
                  <span className="en-text">{hero?.title_en}</span>
              </h1>
              <div className="tagline" style={{ color: 'var(--text-main)' }}>
                  <span className="ar-text">{hero?.tagline_ar}</span>
                  <span className="en-text">{hero?.tagline_en}</span>
              </div>
              <div className="hero-btns">
                  <a href="#gallery" className="btn btn-primary" style={{ background: 'var(--bg-button)', borderColor: 'var(--bg-button)', color: 'var(--text-button)' }}>
                      <span className="ar-text">{hero?.btn_gallery_ar}</span>
                      <span className="en-text">{hero?.btn_gallery_en}</span>
                  </a>
                  <a href="#contact" className="btn btn-secondary" style={{ borderColor: 'var(--bg-button)', color: 'var(--bg-button)' }}>
                      <span className="ar-text">{hero?.btn_contact_ar}</span>
                      <span className="en-text">{hero?.btn_contact_en}</span>
                  </a>
              </div>
              
              <div className="features" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                  <div className="feature-item" style={{ color: 'var(--dark-black)' }}><i className="fas fa-paint-brush"></i> <span className="ar-text">{hero?.feat_1_ar}</span><span className="en-text">{hero?.feat_1_en}</span></div>
                  <div className="feature-item" style={{ color: 'var(--dark-black)' }}><i className="fas fa-couch"></i> <span className="ar-text">{hero?.feat_2_ar}</span><span className="en-text">{hero?.feat_2_en}</span></div>
                  <div className="feature-item" style={{ color: 'var(--dark-black)' }}><i className="fas fa-check-circle"></i> <span className="ar-text">{hero?.feat_3_ar}</span><span className="en-text">{hero?.feat_3_en}</span></div>
              </div>

              <div className="scroll-indicator" style={{ color: 'var(--dark-black)' }}>
                  <i className="fas fa-chevron-down"></i>
              </div>
          </div>
      </section>

      {/* About Section */}
      <section id="about" className="about reveal" style={{ background: 'var(--bg-public-main)' }}>
          <div className="container">
              <div className="section-title" data-bg-text="STUDIO">
                  <span className="subtitle" data-i18n="about_sub" style={{ color: 'var(--text-muted)' }}>OUR STORY</span>
                  <h2 style={{ color: 'var(--dark-black)' }}>
                      <span className="ar-text">{navbar?.nav_about_ar}</span>
                      <span className="en-text">{navbar?.nav_about_en}</span>
                  </h2>
              </div>
              <div className="about-grid">
                  <div className="about-text">
                      <p className="ar-text" style={{ fontSize: '18px', color: 'var(--text-main)' }}>{about?.content_ar}</p>
                      <p className="en-text" style={{ fontSize: '18px', color: 'var(--text-main)' }}>{about?.content_en}</p>
                      
                      <div className="brand-values" style={{ marginTop: '40px' }}>
                          <div className="value-item" style={{ color: 'var(--dark-black)' }}><i className="fas fa-check" style={{ color: 'var(--primary-gold)' }}></i> <span>Creativity</span></div>
                          <div className="value-item" style={{ color: 'var(--dark-black)' }}><i className="fas fa-check" style={{ color: 'var(--primary-gold)' }}></i> <span>Elegance</span></div>
                          <div className="value-item" style={{ color: 'var(--dark-black)' }}><i className="fas fa-check" style={{ color: 'var(--primary-gold)' }}></i> <span>Premium Quality</span></div>
                          <div className="value-item" style={{ color: 'var(--dark-black)' }}><i className="fas fa-check" style={{ color: 'var(--primary-gold)' }}></i> <span>Transformation</span></div>
                      </div>
                  </div>
                  <div className="about-visual" style={{ background: 'var(--bg-public-alt)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                      <img src={about?.image_url || "/logo.png"} alt="FIORA" className="about-logo" style={{ filter: 'invert(1)' }} />
                  </div>
              </div>
          </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services reveal">
          <div className="container">
              <div className="section-title" data-bg-text="EXPERTISE">
                  <h2 style={{ color: 'var(--dark-black)' }}>
                      <span className="ar-text">{navbar?.nav_services_ar}</span>
                      <span className="en-text">{navbar?.nav_services_en}</span>
                  </h2>
              </div>
              
              <div className="services-modern-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px' }}>
                  {services.map((service: any, index: number) => (
                    <div key={service.id} className="service-modern-card" style={{ padding: '40px', background: 'var(--bg-card)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '0px', transition: 'all 0.3s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                        <i className={service.icon} style={{ fontSize: '32px', color: 'var(--primary-gold)', marginBottom: '20px', display: 'block' }}></i>
                        <h3 style={{ fontSize: '20px', color: 'var(--text-card)', marginBottom: '15px', fontFamily: 'var(--font-h1)' }}>
                            <span className="ar-text">{service.title_ar}</span>
                            <span className="en-text">{service.title_en}</span>
                        </h3>
                        <p style={{ color: 'var(--text-card)', opacity: 0.8, fontSize: '14px', lineHeight: '1.6' }}>
                            <span className="ar-text">{service.desc_ar}</span>
                            <span className="en-text">{service.desc_en}</span>
                        </p>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Before & After Section */}
      {beforeAfters.length > 0 && (
          <section id="before-after" className="reveal" style={{ background: 'var(--bg-public-main)', padding: '100px 0' }}>
              <div className="container">
                  <div className="section-title" data-bg-text="TRANSFORM">
                      <h2 style={{ color: 'var(--dark-black)' }}>
                          <span className="ar-text">قبل وبعد</span>
                          <span className="en-text">Before & After</span>
                      </h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
                      {beforeAfters.map(ba => (
                          <div key={ba.id} style={{ background: 'var(--bg-public-alt)', padding: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                              <h3 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'var(--font-h1)' }}>
                                  <span className="ar-text">{ba.title_ar}</span>
                                  <span className="en-text">{ba.title_en}</span>
                              </h3>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                  <div style={{ flex: 1 }}>
                                      <img src={ba.before_image} alt="Before" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', fontWeight: 'bold' }}>BEFORE</p>
                                  </div>
                                  <div style={{ flex: 1 }}>
                                      <img src={ba.after_image} alt="After" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', fontWeight: 'bold' }}>AFTER</p>
                                  </div>
                              </div>
                              <p style={{ textAlign: 'center', marginTop: '15px', color: 'var(--text-muted)', fontSize: '14px' }}>
                                  <span className="ar-text">{ba.desc_ar}</span>
                                  <span className="en-text">{ba.desc_en}</span>
                              </p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
          <section id="featured-projects" className="reveal" style={{ background: 'var(--bg-public-alt)', padding: '100px 0' }}>
              <div className="container">
                  <div className="section-title" data-bg-text="FEATURED">
                      <h2 style={{ color: 'var(--dark-black)' }}>
                          <span className="ar-text">مشاريع مميزة</span>
                          <span className="en-text">Featured Projects</span>
                      </h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                      {featuredProjects.map(fp => (
                          <div key={fp.id} className="group featured-card" style={{ position: 'relative', overflow: 'hidden' }}>
                              <img src={fp.image_url} alt={fp.title_en} style={{ width: '100%', height: '400px', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="hover-scale" />
                              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '30px 20px', color: '#fff' }}>
                                  <h3 style={{ fontFamily: 'var(--font-h1)', fontSize: '24px' }}>
                                      <span className="ar-text">{fp.title_ar}</span>
                                      <span className="en-text">{fp.title_en}</span>
                                  </h3>
                                  <p style={{ fontSize: '14px', opacity: 0.8 }}>
                                      <span className="ar-text">{fp.desc_ar}</span>
                                      <span className="en-text">{fp.desc_en}</span>
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* Gallery Section */}
      <section id="gallery" className="gallery reveal" style={{ background: 'var(--bg-public-main)' }}>
          <div className="container">
              <div className="section-title" data-bg-text="PORTFOLIO">
                  <h2 style={{ color: 'var(--dark-black)' }}>
                      <span className="ar-text">{navbar?.nav_gallery_ar || "جميع المشاريع"}</span>
                      <span className="en-text">{navbar?.nav_gallery_en || "All Projects"}</span>
                  </h2>
              </div>
              
              <div className="gallery-filters">
                  <button className="filter-btn active" data-filter="all" data-i18n="filter_all" style={{ borderColor: 'var(--bg-badge)', color: 'var(--bg-badge)' }}>الكل / All</button>
                  {categories.map((cat: any) => (
                    <button key={cat.id} className="filter-btn" data-filter={cat.id} style={{ borderColor: 'var(--bg-badge)', color: 'var(--bg-badge)' }}>
                        <span className="ar-text">{cat.name_ar}</span>
                        <span className="en-text">{cat.name_en}</span>
                    </button>
                  ))}
              </div>

              <div className="gallery-grid" id="galleryGrid">
                  {gallery.map((item: any) => {
                    const hasTitle = Boolean(item.title_ar || item.title_en);
                    const hasDesc = Boolean(item.desc_ar || item.desc_en);
                    
                    return (
                      <div key={item.id} className={`gallery-card ${item.categoryId}`} style={{ border: 'none', borderRadius: '0' }}>
                          <div className="gallery-image">
                              <img src={item.image_url} alt={item.title_en || "Gallery Image"} />
                          </div>
                          {(hasTitle || hasDesc) && (
                              <div className="gallery-info" style={{ background: 'var(--bg-card)', color: 'var(--text-card)' }}>
                                  {hasTitle && (
                                      <h4 style={{ color: 'var(--text-card)', fontFamily: 'var(--font-h1)' }}>
                                          {item.title_ar && <span className="ar-text">{item.title_ar}</span>}
                                          {item.title_en && <span className="en-text">{item.title_en}</span>}
                                      </h4>
                                  )}
                                  {hasDesc && (
                                      <p style={{ color: 'var(--text-card)', opacity: 0.8 }}>
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
          </div>
      </section>

      {/* How it Works (Process) */}
      <section id="process" className="how-it-works reveal" style={{ background: 'var(--bg-public-alt)' }}>
          <div className="container">
              <div className="section-title" data-bg-text="WORKFLOW">
                  <h2 style={{ color: 'var(--dark-black)' }}>
                      <span className="ar-text">{navbar?.nav_how_ar}</span>
                      <span className="en-text">{navbar?.nav_how_en}</span>
                  </h2>
              </div>
              <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
                  {processSteps.map((step, index) => (
                      <div key={step.id} style={{ padding: '30px 20px', position: 'relative' }}>
                          <div style={{ fontSize: '60px', color: 'rgba(212, 175, 55, 0.2)', fontFamily: 'var(--font-h1)', fontWeight: 'bold', marginBottom: '10px' }}>0{step.step_number}</div>
                          <h4 style={{ color: 'var(--dark-black)', fontFamily: 'var(--font-h1)', fontSize: '22px', marginBottom: '15px' }}>
                              <span className="ar-text">{step.title_ar}</span>
                              <span className="en-text">{step.title_en}</span>
                          </h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                              <span className="ar-text">{step.desc_ar}</span>
                              <span className="en-text">{step.desc_en}</span>
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Client Vision Section */}
      <section id="client-vision" className="reveal" style={{ background: 'var(--dark-black)', color: '#fff', padding: '120px 0', textAlign: 'center' }}>
          <div className="container">
              <h2 style={{ fontFamily: 'var(--font-h1)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '300', lineHeight: '1.4', maxWidth: '800px', margin: '0 auto' }}>
                  <span className="en-text">"Give us your empty space, and we'll transform it into something extraordinary."</span>
                  <span className="ar-text">"أعطنا مساحتك الفارغة، وسنحولها إلى مكان استثنائي."</span>
              </h2>
          </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
          <section id="testimonials" className="reveal" style={{ background: 'var(--bg-public-main)', padding: '100px 0' }}>
              <div className="container">
                  <div className="section-title" data-bg-text="REVIEWS">
                      <h2 style={{ color: 'var(--dark-black)' }}>
                          <span className="ar-text">{navbar?.nav_testimonials_ar || "آراء عملائنا"}</span>
                          <span className="en-text">{navbar?.nav_testimonials_en || "What Our Clients Say"}</span>
                      </h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                      {testimonials.map(t => (
                          <div key={t.id} style={{ background: 'var(--bg-card)', padding: '40px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
                              <div style={{ color: 'var(--primary-gold)', fontSize: '24px', marginBottom: '20px' }}>
                                  {"★".repeat(t.rating)}{"☆".repeat(5-t.rating)}
                              </div>
                              <p style={{ fontSize: '16px', color: 'var(--text-card)', opacity: 0.9, fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.8' }}>
                                  <span className="en-text">"{t.content_en}"</span>
                                  <span className="ar-text">"{t.content_ar}"</span>
                              </p>
                              <h4 style={{ fontFamily: 'var(--font-h1)', fontSize: '18px', color: 'var(--text-card)' }}>
                                  <span className="en-text">- {t.client_name_en}</span>
                                  <span className="ar-text">- {t.client_name_ar}</span>
                              </h4>
                          </div>
                      ))}
                  </div>
                  <ReviewForm />
              </div>
          </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="contact" style={{ background: 'var(--bg-public-alt)' }}>
          <div className="container">
              <div className="contact-minimal reveal" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                  <h2 style={{ fontFamily: 'var(--font-h1)', fontSize: '42px', color: 'var(--dark-black)', marginBottom: '20px' }}>
                      <span className="ar-text">جاهز لتحويل مساحتك؟<br/>دعنا نصنع شيئاً جميلاً معاً.</span>
                      <span className="en-text">Ready to transform your space?<br/>Let's create something beautiful together.</span>
                  </h2>
                  
                  <div style={{ marginTop: '40px', marginBottom: '50px' }}>
                      <a href={`https://wa.me/${settings?.whatsapp_number}`} className="btn btn-primary" style={{ background: 'var(--bg-button)', color: 'var(--text-button)', padding: '15px 40px', fontSize: '14px' }}>
                          <span className="ar-text">احجز استشارة</span>
                          <span className="en-text">Book Consultation</span>
                      </a>
                  </div>

                  <div className="contact-icon-row" style={{ justifyContent: 'center' }}>
                      <a href={`https://wa.me/${settings?.whatsapp_number}`} className="contact-icon-item" title="WhatsApp" style={{ color: 'var(--dark-black)', borderColor: 'rgba(0,0,0,0.1)' }}>
                          <div className="icon-inner wa"><i className="fab fa-whatsapp"></i></div>
                      </a>
                      
                      {settings?.location_url && (
                        <a href={settings.location_url} target="_blank" className="contact-icon-item" title="Location" style={{ color: 'var(--dark-black)', borderColor: 'rgba(0,0,0,0.1)' }}>
                            <div className="icon-inner lc"><i className="fas fa-map-marker-alt"></i></div>
                        </a>
                      )}
                      
                      {settings?.tiktok_url && (
                        <a href={settings.tiktok_url} target="_blank" className="contact-icon-item" title="TikTok" style={{ color: 'var(--dark-black)', borderColor: 'rgba(0,0,0,0.1)' }}>
                            <div className="icon-inner tk"><i className="fab fa-tiktok"></i></div>
                        </a>
                      )}
                  </div>
              </div>
          </div>
      </section>

      <footer className="luxury-footer" style={{ background: 'var(--bg-footer)', borderTop: 'none', color: 'var(--text-footer)' }}>
          <div className="container">
              <div className="footer-grid">
                  <div className="footer-brand">
                      <img src={footer?.logo_url || "/logo.png"} alt="FIORA" className="footer-logo-img" style={{ filter: theme?.bg_footer === '#0a0a0a' ? 'invert(0)' : 'invert(1)', opacity: 0.8 }} />
                      <p style={{ marginTop: '20px' }}>
                          <span className="ar-text">{footer?.description_ar || "استوديو إبداعي لتصميم المساحات الأنيقة وتنسيق المناسبات."}</span>
                          <span className="en-text">{footer?.description_en || "A creative studio designing elegant spaces and event experiences."}</span>
                      </p>
                  </div>
                  <div className="footer-links">
                      <h5 style={{ color: 'var(--text-footer)' }}>
                          <span className="ar-text">استكشف</span>
                          <span className="en-text">Explore</span>
                      </h5>
                      <ul>
                          <li><a href="#about"><span className="ar-text">{navbar?.nav_about_ar}</span><span className="en-text">{navbar?.nav_about_en}</span></a></li>
                          <li><a href="#services"><span className="ar-text">{navbar?.nav_services_ar}</span><span className="en-text">{navbar?.nav_services_en}</span></a></li>
                          <li><a href="#gallery"><span className="ar-text">{navbar?.nav_gallery_ar || "المشاريع"}</span><span className="en-text">{navbar?.nav_gallery_en || "Projects"}</span></a></li>
                      </ul>
                  </div>
                  <div className="footer-links">
                      <h5 style={{ color: 'var(--text-footer)' }}>
                          <span className="ar-text">خدماتنا</span>
                          <span className="en-text">Services</span>
                      </h5>
                      <ul>
                          <li><a href="#services"><span className="ar-text">{footer?.link1_ar || "تصميم داخلي"}</span><span className="en-text">{footer?.link1_en || "Interior Design"}</span></a></li>
                          <li><a href="#services"><span className="ar-text">{footer?.link2_ar || "تنسيق المناسبات"}</span><span className="en-text">{footer?.link2_en || "Event Styling"}</span></a></li>
                          <li><a href="#services"><span className="ar-text">{footer?.link3_ar || "تخطيط المساحات"}</span><span className="en-text">{footer?.link3_en || "Space Planning"}</span></a></li>
                      </ul>
                  </div>
                  <div className="footer-contact">
                      <h5 style={{ color: 'var(--text-footer)' }}>
                          <span className="ar-text">تواصل معنا</span>
                          <span className="en-text">Contact</span>
                      </h5>
                      <ul>
                          <li>
                              <i className="fas fa-envelope"></i>
                              <a href={`mailto:${footer?.email || "info@fiora.com"}`}>{footer?.email || "info@fiora.com"}</a>
                          </li>
                          <li>
                              <i className="fas fa-phone"></i>
                              <a href={`https://wa.me/${settings?.whatsapp_number}`} dir="ltr">+{settings?.whatsapp_number}</a>
                          </li>
                          <li>
                              <i className="fas fa-map-marker-alt"></i>
                              <span>
                                  <span className="ar-text">{footer?.address_ar || "الخرطوم، السودان"}</span>
                                  <span className="en-text">{footer?.address_en || "Khartoum, Sudan"}</span>
                              </span>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="footer-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginTop: '40px', paddingTop: '20px' }}>
                  <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} FIORA. <span className="ar-text">{footer?.copyright_ar || "جميع الحقوق محفوظة."}</span><span className="en-text">{footer?.copyright_en || "All rights reserved."}</span></p>
                  <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--accent-footer)', fontFamily: 'var(--font-h1)' }}>
                      <span className="en-text">{footer?.slogan_en || "LUXURY STARTS HERE"}</span>
                      <span className="ar-text">{footer?.slogan_ar || "الفخامة تبدأ من هنا"}</span>
                  </p>
              </div>
          </div>
      </footer>

      {/* Back to Top */}
      <button id="backToTop" className="back-to-top" style={{ background: 'var(--dark-black)', color: '#fff' }}>
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
      <Script id="hover-scale-js" strategy="afterInteractive">
        {`
          document.querySelectorAll('.hover-scale').forEach(img => {
            img.parentElement.addEventListener('mouseenter', () => {
              img.style.transform = 'scale(1.05)';
            });
            img.parentElement.addEventListener('mouseleave', () => {
              img.style.transform = 'scale(1)';
            });
          });
        `}
      </Script>
    </main>
  )
}
