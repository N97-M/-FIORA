'use client'

import { useState } from 'react'

export default function AboutForm({ initialAbout }: { initialAbout: any }) {
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
      const res = await fetch('/api/about', {
        method: 'POST',
        body: formData
      })

      let result: any = {}
      if (res.ok) {
        result = await res.json()
      } else {
        if (res.status === 413) {
          throw new Error('The selected image file is too large (Vercel limits uploads to 4.5MB). Please compress the image or use a smaller file.')
        }
        try {
          result = await res.json()
        } catch {
          const text = await res.text()
          throw new Error(text || 'Something went wrong')
        }
        throw new Error(result.error || 'Something went wrong')
      }

      setMessage('Changes saved successfully!')
      // Refresh the page so the new image URL displays
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
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h3 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '24px' }}>Edit Our Story (About Us)</h3>
      
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

      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'grid', gap: '25px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Arabic */}
            <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
                <h4 style={{ color: '#DBC07E' }}>Arabic Content</h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Section Title (AR)</label>
                    <input name="title_ar" defaultValue={initialAbout?.title_ar} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                </div>
                <div style={{ display: 'grid', gap: '10px' }}>
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Story Content (AR)</label>
                    <textarea name="content_ar" defaultValue={initialAbout?.content_ar} required rows={6} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', resize: 'vertical' }} />
                </div>
            </div>

            {/* English */}
            <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
                <h4 style={{ color: '#DBC07E' }}>English Content</h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Section Title (EN)</label>
                    <input name="title_en" defaultValue={initialAbout?.title_en} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                </div>
                <div style={{ display: 'grid', gap: '10px' }}>
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Story Content (EN)</label>
                    <textarea name="content_en" defaultValue={initialAbout?.content_en} required rows={6} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', resize: 'vertical' }} />
                </div>
            </div>
        </div>

        <div style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
            <label style={{ color: '#aaa', fontSize: '13px' }}>Upload About Section Image</label>
            <input type="file" name="media_file" accept="image/*" style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
            <small style={{ color: '#888', fontSize: '11px' }}>Leave empty to keep current image: {initialAbout?.image_url}</small>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            justifySelf: 'start', 
            marginTop: '10px', 
            padding: '14px 50px', 
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
            'Save About Changes'
          )}
        </button>
      </form>
    </div>
  )
}
