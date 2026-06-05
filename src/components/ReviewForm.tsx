'use client'

import { useState } from 'react'

export default function ReviewForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Convert to JSON
    const payload = {
      client_name_en: formData.get('name') as string,
      client_name_ar: formData.get('name') as string, // We can save the same name to both fields for simplicity from user
      content_en: formData.get('review') as string,
      content_ar: formData.get('review') as string,
      rating: parseInt(formData.get('rating') as string, 10),
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        throw new Error('Failed to submit review')
      }

      setMessage('Thank you! Your review has been submitted and is pending approval.')
      form.reset()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '50px', background: 'var(--bg-public-alt)', padding: '40px', border: '1px solid rgba(0,0,0,0.05)', maxWidth: '600px', margin: '50px auto 0' }}>
      <h3 style={{ fontFamily: 'var(--font-h1)', fontSize: '24px', color: 'var(--dark-black)', marginBottom: '20px', textAlign: 'center' }}>
        <span className="en-text">Leave a Review</span>
        <span className="ar-text">أضف تقييمك</span>
      </h3>
      
      {message && (
        <div style={{ padding: '15px', background: 'rgba(52,211,153,0.1)', color: '#10b981', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>
          {message}
        </div>
      )}
      
      {error && (
        <div style={{ padding: '15px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '14px' }}>
            <span className="en-text">Name</span>
            <span className="ar-text">الاسم</span>
          </label>
          <input name="name" required style={{ width: '100%', padding: '12px', background: 'var(--bg-public-main)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-main)', borderRadius: '4px' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '14px' }}>
            <span className="en-text">Review</span>
            <span className="ar-text">التقييم</span>
          </label>
          <textarea name="review" required rows={4} style={{ width: '100%', padding: '12px', background: 'var(--bg-public-main)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-main)', borderRadius: '4px', resize: 'vertical' }}></textarea>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '14px' }}>
            <span className="en-text">Rating</span>
            <span className="ar-text">النجوم</span>
          </label>
          <select name="rating" required style={{ width: '100%', padding: '12px', background: 'var(--bg-public-main)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-main)', borderRadius: '4px' }}>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ background: 'var(--dark-black)', color: '#fff', border: 'none', padding: '15px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Submitting...' : (
            <>
              <span className="en-text">Submit Review</span>
              <span className="ar-text">إرسال التقييم</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
