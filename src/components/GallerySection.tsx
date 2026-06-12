'use client'

import { useState, useMemo } from 'react'

type GalleryItem = {
  id: string
  image_url: string
  title_en: string | null
  title_ar: string | null
  desc_en: string | null
  desc_ar: string | null
  categoryId: string | null
  category?: { id: string; name_en: string; name_ar: string } | null
}

type Category = {
  id: string
  name_en: string
  name_ar: string
}

interface GallerySectionProps {
  gallery: GalleryItem[]
  categories: Category[]
  navbar: any
}

const INITIAL_COUNT = 5
const LOAD_MORE_COUNT = 5

export default function GallerySection({ gallery, categories, navbar }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return gallery
    return gallery.filter(item => item.categoryId === activeFilter)
  }, [gallery, activeFilter])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleFilter(filterId: string) {
    setActiveFilter(filterId)
    setVisibleCount(INITIAL_COUNT)
  }

  function handleShowMore() {
    setVisibleCount(prev => prev + LOAD_MORE_COUNT)
  }

  return (
    <section id="gallery" className="gallery reveal" style={{ background: 'var(--bg-public-main)' }}>
      <div className="container">
        <div className="section-title" data-bg-text="PORTFOLIO">
          <h2 style={{ color: 'var(--dark-black)' }}>
            <span className="ar-text">{navbar?.nav_gallery_ar || "جميع المشاريع"}</span>
            <span className="en-text">{navbar?.nav_gallery_en || "All Projects"}</span>
          </h2>
        </div>

        <div className="gallery-filters">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
            style={{ borderColor: 'var(--bg-badge)', color: activeFilter === 'all' ? undefined : 'var(--bg-badge)' }}
          >
            الكل / All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => handleFilter(cat.id)}
              style={{ borderColor: 'var(--bg-badge)', color: activeFilter === cat.id ? undefined : 'var(--bg-badge)' }}
            >
              <span className="ar-text">{cat.name_ar}</span>
              <span className="en-text">{cat.name_en}</span>
            </button>
          ))}
        </div>

        <div className="gallery-grid" id="galleryGrid">
          {visible.map((item) => {
            const hasTitle = Boolean(item.title_ar || item.title_en)
            const hasDesc = Boolean(item.desc_ar || item.desc_en)

            return (
              <div key={item.id} className={`gallery-card ${item.categoryId || ''}`} style={{ border: 'none', borderRadius: '0' }}>
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
            )
          })}
        </div>

        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={handleShowMore}
              id="loadMoreBtn"
              className="btn btn-primary"
              style={{
                padding: '14px 45px',
                fontSize: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
              }}
            >
              <span className="ar-text">عرض المزيد</span>
              <span className="en-text">Show More</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
