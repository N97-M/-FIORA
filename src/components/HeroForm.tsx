'use client'

import { useState } from 'react'

const InputField = ({ label, name, value, onChange }: { label: string, name: string, value?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div style={{ display: 'grid', gap: '8px' }}>
    <label style={{ color: '#aaa', fontSize: '13px' }}>{label}</label>
    <input name={name} value={value || ''} onChange={onChange} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }} />
  </div>
)

export default function HeroForm({ initialHero }: { initialHero: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [desktopMediaFile, setDesktopMediaFile] = useState<File | null>(null)
  const [mobileMediaFile, setMobileMediaFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    title_ar: initialHero?.title_ar || '',
    title_en: initialHero?.title_en || '',
    tagline_ar: initialHero?.tagline_ar || '',
    tagline_en: initialHero?.tagline_en || '',
    btn_gallery_ar: initialHero?.btn_gallery_ar || '',
    btn_gallery_en: initialHero?.btn_gallery_en || '',
    btn_contact_ar: initialHero?.btn_contact_ar || '',
    btn_contact_en: initialHero?.btn_contact_en || '',
    feat_1_ar: initialHero?.feat_1_ar || '',
    feat_1_en: initialHero?.feat_1_en || '',
    feat_2_ar: initialHero?.feat_2_ar || '',
    feat_2_en: initialHero?.feat_2_en || '',
    feat_3_ar: initialHero?.feat_3_ar || '',
    feat_3_en: initialHero?.feat_3_en || '',
    bg_type: initialHero?.bg_type || 'IMAGE',
    mobile_bg_type: initialHero?.mobile_bg_type || 'IMAGE',
    overlay: initialHero?.overlay_opacity?.toString() || '0.5',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      // Step 1: Upload Desktop Media
      let imageUrl = initialHero?.image_url || '/hero-bg.jpg'
      const MAX_FILE_SIZE = 4.5 * 1024 * 1024 // 4.5 MB

      if (desktopMediaFile && desktopMediaFile.size > 0) {
        if (desktopMediaFile.size > MAX_FILE_SIZE) {
          throw new Error('Desktop media file is too large. Max allowed size is 4.5MB.')
        }
        const uploadForm = new FormData()
        uploadForm.append('file', desktopMediaFile)

        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadForm })
        if (!uploadRes.ok) {
          if (uploadRes.status === 413) throw new Error('Desktop media file is too large.')
          const uploadErr = await uploadRes.json().catch(() => ({}))
          throw new Error(uploadErr.error || 'Failed to upload desktop media')
        }
        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
      }

      // Step 1.5: Upload Mobile Media
      let mobileImageUrl = initialHero?.mobile_image_url || ''

      if (mobileMediaFile && mobileMediaFile.size > 0) {
        if (mobileMediaFile.size > MAX_FILE_SIZE) {
          throw new Error('Mobile media file is too large. Max allowed size is 4.5MB.')
        }
        const uploadForm = new FormData()
        uploadForm.append('file', mobileMediaFile)

        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadForm })
        if (!uploadRes.ok) {
          if (uploadRes.status === 413) throw new Error('Mobile media file is too large.')
          const uploadErr = await uploadRes.json().catch(() => ({}))
          throw new Error(uploadErr.error || 'Failed to upload mobile media')
        }
        const uploadData = await uploadRes.json()
        mobileImageUrl = uploadData.url
      }

      // Step 2: Send all hero data as JSON
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image_url: imageUrl,
          mobile_image_url: mobileImageUrl,
        })
      })

      if (!res.ok) {
        const result = await res.json().catch(() => ({}))
        throw new Error(result.error || 'Something went wrong')
      }

      setMessage('Hero section updated successfully!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to save changes')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display' }}>Manage Hero Section</h2>
      
      {message && (
        <div style={{ padding: '15px', background: 'rgba(40, 167, 69, 0.1)', border: '1px solid rgba(40, 167, 69, 0.3)', color: '#28a745', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold' }}>
          <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i> {message}
        </div>
      )}

      {error && (
        <div style={{ padding: '15px', background: 'rgba(220, 53, 69, 0.1)', border: '1px solid rgba(220, 53, 69, 0.3)', color: '#dc3545', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold' }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '30px' }}>
        {/* Background Settings */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
          <h4 style={{ marginBottom: '15px', color: '#DBC07E' }}>Background Settings</h4>
          
          <div className="admin-grid-2" style={{ marginBottom: '20px' }}>
            {/* Desktop Media */}
            <div style={{ display: 'grid', gap: '8px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
              <h5 style={{ margin: 0, color: '#fff' }}>Desktop (Laptop/PC View)</h5>
              <label style={{ color: '#aaa', fontSize: '13px' }}>Background Type</label>
              <select name="bg_type" value={formData.bg_type} onChange={handleChange} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}>
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
              <label style={{ color: '#aaa', fontSize: '13px', marginTop: '10px' }}>Upload Media</label>
              <input
                type="file"
                accept="image/*,video/mp4,video/webm"
                onChange={(e) => setDesktopMediaFile(e.target.files?.[0] || null)}
                style={{ padding: '7px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
              />
              <small style={{ color: '#888', fontSize: '11px', wordBreak: 'break-all' }}>Current: {initialHero?.image_url}</small>
            </div>

            {/* Mobile Media */}
            <div style={{ display: 'grid', gap: '8px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
              <h5 style={{ margin: 0, color: '#fff' }}>Mobile (Phone View)</h5>
              <label style={{ color: '#aaa', fontSize: '13px' }}>Background Type</label>
              <select name="mobile_bg_type" value={formData.mobile_bg_type} onChange={handleChange} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}>
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
              <label style={{ color: '#aaa', fontSize: '13px', marginTop: '10px' }}>Upload Media</label>
              <input
                type="file"
                accept="image/*,video/mp4,video/webm"
                onChange={(e) => setMobileMediaFile(e.target.files?.[0] || null)}
                style={{ padding: '7px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
              />
              <small style={{ color: '#888', fontSize: '11px', wordBreak: 'break-all' }}>Current: {initialHero?.mobile_image_url || 'None'}</small>
            </div>
          </div>

          <div style={{ maxWidth: '300px' }}>
            <InputField label="Dark Overlay (0.0 - 1.0)" name="overlay" value={formData.overlay} onChange={handleChange} />
          </div>
        </div>

        {/* Text Settings */}
        <div className="admin-grid-2">
          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>Arabic Content</h4>
            <InputField label="Title" name="title_ar" value={formData.title_ar} onChange={handleChange} />
            <InputField label="Tagline" name="tagline_ar" value={formData.tagline_ar} onChange={handleChange} />
            <InputField label="Button 1 (Gallery)" name="btn_gallery_ar" value={formData.btn_gallery_ar} onChange={handleChange} />
            <InputField label="Button 2 (Contact)" name="btn_contact_ar" value={formData.btn_contact_ar} onChange={handleChange} />
            <InputField label="Feature 1 (Rental)" name="feat_1_ar" value={formData.feat_1_ar} onChange={handleChange} />
            <InputField label="Feature 2 (Design)" name="feat_2_ar" value={formData.feat_2_ar} onChange={handleChange} />
            <InputField label="Feature 3 (Delivery)" name="feat_3_ar" value={formData.feat_3_ar} onChange={handleChange} />
          </div>

          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>English Content</h4>
            <InputField label="Title" name="title_en" value={formData.title_en} onChange={handleChange} />
            <InputField label="Tagline" name="tagline_en" value={formData.tagline_en} onChange={handleChange} />
            <InputField label="Button 1 (Gallery)" name="btn_gallery_en" value={formData.btn_gallery_en} onChange={handleChange} />
            <InputField label="Button 2 (Contact)" name="btn_contact_en" value={formData.btn_contact_en} onChange={handleChange} />
            <InputField label="Feature 1 (Rental)" name="feat_1_en" value={formData.feat_1_en} onChange={handleChange} />
            <InputField label="Feature 2 (Design)" name="feat_2_en" value={formData.feat_2_en} onChange={handleChange} />
            <InputField label="Feature 3 (Delivery)" name="feat_3_en" value={formData.feat_3_en} onChange={handleChange} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            justifySelf: 'start', 
            padding: '12px 50px', 
            background: loading ? '#666' : '#DBC07E', 
            color: '#000', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            transition: '0.3s',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Saving...
            </>
          ) : (
            'Save All Changes'
          )}
        </button>
      </form>
    </>
  )
}
