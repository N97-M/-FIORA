'use client'

import { useState } from 'react'

export default function HeroForm({ initialHero }: { initialHero: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        body: formData
      })

      let result: any = {}
      if (res.ok) {
        result = await res.json()
      } else {
        if (res.status === 413) {
          throw new Error('The selected background media file is too large (Vercel limits uploads to 4.5MB). Please compress the file or use a smaller version.')
        }
        try {
          result = await res.json()
        } catch {
          const text = await res.text()
          throw new Error(text || 'Something went wrong')
        }
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

  const InputField = ({ label, name, defaultValue }: any) => (
    <div style={{ display: 'grid', gap: '8px' }}>
      <label style={{ color: '#aaa', fontSize: '13px' }}>{label}</label>
      <input name={name} defaultValue={defaultValue} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }} />
    </div>
  )

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

      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'grid', gap: '30px' }}>
        {/* Background Settings */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
          <h4 style={{ marginBottom: '15px', color: '#DBC07E' }}>Background Settings</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px' }}>
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ color: '#aaa', fontSize: '13px' }}>Background Type</label>
              <select name="bg_type" defaultValue={initialHero?.bg_type || 'IMAGE'} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}>
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
            </div>
            
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ color: '#aaa', fontSize: '13px' }}>Upload Media (Image or Video)</label>
              <input type="file" name="media_file" accept="image/*,video/mp4,video/webm" style={{ padding: '7px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }} />
              <small style={{ color: '#888', fontSize: '11px', wordBreak: 'break-all' }}>Leave empty to keep current background: {initialHero?.image_url}</small>
            </div>

            <InputField label="Dark Overlay (0.0 - 1.0)" name="overlay" defaultValue={initialHero?.overlay_opacity || '0.5'} />
          </div>
        </div>

        {/* Text Settings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>Arabic Content</h4>
            <InputField label="Title" name="title_ar" defaultValue={initialHero?.title_ar} />
            <InputField label="Tagline" name="tagline_ar" defaultValue={initialHero?.tagline_ar} />
            <InputField label="Button 1 (Gallery)" name="btn_gallery_ar" defaultValue={initialHero?.btn_gallery_ar} />
            <InputField label="Button 2 (Contact)" name="btn_contact_ar" defaultValue={initialHero?.btn_contact_ar} />
            <InputField label="Feature 1 (Rental)" name="feat_1_ar" defaultValue={initialHero?.feat_1_ar} />
            <InputField label="Feature 2 (Design)" name="feat_2_ar" defaultValue={initialHero?.feat_2_ar} />
            <InputField label="Feature 3 (Delivery)" name="feat_3_ar" defaultValue={initialHero?.feat_3_ar} />
          </div>

          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>English Content</h4>
            <InputField label="Title" name="title_en" defaultValue={initialHero?.title_en} />
            <InputField label="Tagline" name="tagline_en" defaultValue={initialHero?.tagline_en} />
            <InputField label="Button 1 (Gallery)" name="btn_gallery_en" defaultValue={initialHero?.btn_gallery_en} />
            <InputField label="Button 2 (Contact)" name="btn_contact_en" defaultValue={initialHero?.btn_contact_en} />
            <InputField label="Feature 1 (Rental)" name="feat_1_en" defaultValue={initialHero?.feat_1_en} />
            <InputField label="Feature 2 (Design)" name="feat_2_en" defaultValue={initialHero?.feat_2_en} />
            <InputField label="Feature 3 (Delivery)" name="feat_3_en" defaultValue={initialHero?.feat_3_en} />
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
