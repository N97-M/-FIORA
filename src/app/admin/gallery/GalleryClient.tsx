'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Category { id: string; name_ar: string; name_en: string }
interface GalleryItem {
  id: string; image_url: string; title_ar: string; title_en: string
  category?: { name_en: string }; categoryId: string
}

interface Props {
  gallery: GalleryItem[]
  categories: Category[]
}

export default function GalleryClient({ gallery, categories: initialCategories }: Props) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [catStatus, setCatStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [addingCat, setAddingCat] = useState(false)

  // ── Add Category ────────────────────────────────────────────────────────────
  async function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAddingCat(true)
    setCatStatus(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    const name_ar = formData.get('cat_name_ar') as string
    const name_en = formData.get('cat_name_en') as string

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name_ar, name_en })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setCategories(prev => [...prev, data])
      setCatStatus({ type: 'success', msg: `✅ Category "${name_en}" added!` })
      form.reset()
    } catch (err: any) {
      setCatStatus({ type: 'error', msg: `❌ ${err.message}` })
    } finally {
      setAddingCat(false)
    }
  }

  // ── Delete Category ──────────────────────────────────────────────────────────
  async function handleDeleteCategory(id: string, name: string) {
    setCatStatus(null)
    const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) {
      setCatStatus({ type: 'error', msg: `❌ ${data.error}` })
      return
    }
    setCategories(prev => prev.filter(c => c.id !== id))
    setCatStatus({ type: 'success', msg: `✅ Category "${name}" deleted.` })
    router.refresh()
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUploading(true)
    setStatus(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const file = formData.get('media_file') as File

    try {
      // 1. Upload file via API Route
      let imageUrl = ''
      if (file && file.size > 0) {
        const uploadForm = new FormData()
        uploadForm.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: uploadForm })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')
        imageUrl = data.url
      } else {
        throw new Error('Please select an image to upload.')
      }

      // 2. Save to DB via API
      const payload = {
        title_ar: formData.get('title_ar') as string,
        title_en: formData.get('title_en') as string,
        desc_ar:  formData.get('desc_ar')  as string,
        desc_en:  formData.get('desc_en')  as string,
        categoryId: formData.get('categoryId') as string,
        image_url: imageUrl,
      }
      const saveRes = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!saveRes.ok) throw new Error('Failed to save item')

      setStatus({ type: 'success', msg: '✅ Image added successfully!' })
      form.reset()
      setPreview(null)
      router.refresh()
    } catch (err: any) {
      setStatus({ type: 'error', msg: `❌ ${err.message}` })
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    padding: '10px', background: '#111', border: '1px solid #333',
    color: '#fff', borderRadius: '5px', width: '100%', boxSizing: 'border-box',
  }

  return (
    <>
      {/* ── Manage Categories ── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px 30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '18px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fas fa-tags" style={{ fontSize: '18px' }}></i> Manage Categories
        </h3>

        {catStatus && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', background: catStatus.type === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(255,68,68,0.1)', border: `1px solid ${catStatus.type === 'success' ? '#34d39944' : '#ff444444'}`, color: catStatus.type === 'success' ? '#34d399' : '#ff6666', fontSize: '13px' }}>
            {catStatus.msg}
          </div>
        )}

        {/* Add new category */}
        <form onSubmit={handleAddCategory} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'end', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gap: '5px' }}>
            <label style={{ fontSize: '12px', color: '#aaa' }}>Category Name (AR)</label>
            <input name="cat_name_ar" required placeholder="مثال: أفراح" style={{ padding: '9px 12px', background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#fff', borderRadius: '6px', fontSize: '14px' }} />
          </div>
          <div style={{ display: 'grid', gap: '5px' }}>
            <label style={{ fontSize: '12px', color: '#aaa' }}>Category Name (EN)</label>
            <input name="cat_name_en" required placeholder="e.g. Weddings" style={{ padding: '9px 12px', background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#fff', borderRadius: '6px', fontSize: '14px' }} />
          </div>
          <button type="submit" disabled={addingCat} style={{ padding: '9px 20px', background: addingCat ? '#555' : '#DBC07E', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: addingCat ? 'not-allowed' : 'pointer', height: '38px', whiteSpace: 'nowrap' }}>
            {addingCat ? '...' : '+ Add Category'}
          </button>
        </form>

        {/* Existing categories */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories.filter(c => c.name_en !== 'All').map(cat => (
            <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '20px' }}>
              <span style={{ color: '#fff', fontSize: '13px' }}>{cat.name_ar}</span>
              <span style={{ color: '#555', fontSize: '12px' }}>|</span>
              <span style={{ color: '#aaa', fontSize: '13px' }}>{cat.name_en}</span>
              <button onClick={() => handleDeleteCategory(cat.id, cat.name_en)} title={`Delete "${cat.name_en}"`} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '12px', padding: '0 2px', lineHeight: 1 }}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Add Image Form ── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '24px' }}>Add New Project / Image</h3>

        {status && (
          <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', background: status.type === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(255,68,68,0.1)', border: `1px solid ${status.type === 'success' ? '#34d39944' : '#ff444444'}`, color: status.type === 'success' ? '#34d399' : '#ff6666' }}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Arabic */}
            <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #222' }}>
              <h4 style={{ color: '#DBC07E', fontSize: '16px', margin: 0 }}>Arabic Content</h4>
              <div style={{ display: 'grid', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#aaa' }}>Title (AR)</label>
                <input name="title_ar" required style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#aaa' }}>Description (AR)</label>
                <textarea name="desc_ar" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            </div>
            {/* English */}
            <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #222' }}>
              <h4 style={{ color: '#DBC07E', fontSize: '16px', margin: 0 }}>English Content</h4>
              <div style={{ display: 'grid', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#aaa' }}>Title (EN)</label>
                <input name="title_en" required style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#aaa' }}>Description (EN)</label>
                <textarea name="desc_en" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '15px', alignItems: 'end' }}>
            <div style={{ display: 'grid', gap: '5px' }}>
              <label style={{ fontSize: '12px', color: '#aaa' }}>Upload Image</label>
              <input type="file" name="media_file" accept="image/*" required
                onChange={e => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : null) }}
                style={{ ...inputStyle, padding: '7px' }} />
              {preview && <img src={preview} alt="preview" style={{ height: '80px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px' }} />}
            </div>
            <div style={{ display: 'grid', gap: '5px' }}>
              <label style={{ fontSize: '12px', color: '#aaa' }}>Category</label>
              <select name="categoryId" required style={inputStyle}>
                {categories.filter(c => c.name_en !== 'All').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name_ar} | {cat.name_en}</option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={uploading} style={{ padding: '10px 28px', background: uploading ? '#555' : '#DBC07E', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: uploading ? 'not-allowed' : 'pointer', height: '42px', whiteSpace: 'nowrap' }}>
              {uploading ? '⏳ Uploading...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {gallery.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#555' }}>
            <i className="fas fa-images" style={{ fontSize: '36px', marginBottom: '12px', display: 'block' }}></i>
            No images yet. Add your first project above.
          </div>
        )}
        {gallery.map(item => (
          <div key={item.id} style={{ background: '#111', borderRadius: '10px', overflow: 'hidden', border: '1px solid #222' }}>
            <img src={item.image_url} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} alt={item.title_en} />
            <div style={{ padding: '15px' }}>
              <h5 style={{ color: '#fff', margin: '0 0 4px' }}>AR: {item.title_ar}</h5>
              <h5 style={{ color: '#aaa', margin: '0 0 12px', fontWeight: 400 }}>EN: {item.title_en}</h5>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', background: '#222', padding: '4px 8px', borderRadius: '4px', color: '#DBC07E' }}>
                  {item.category?.name_en}
                </span>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.2)', color: '#ff4444', cursor: 'pointer', padding: '6px 10px', borderRadius: '4px' }}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
