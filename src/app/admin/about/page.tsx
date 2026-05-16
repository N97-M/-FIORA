import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export default async function AdminAbout() {
  const about = await prisma.about.findFirst()

  async function updateAbout(formData: FormData) {
    'use server'
    
    // Handle Image Upload
    const file = formData.get('media_file') as File
    let finalImageUrl = about?.image_url

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      
      try { await mkdir(uploadDir, { recursive: true }) } catch (e) {}
      
      const filepath = path.join(uploadDir, filename)
      await writeFile(filepath, buffer)
      finalImageUrl = `/uploads/${filename}`
    }

    const data = {
        title_ar: formData.get('title_ar') as string || '',
        title_en: formData.get('title_en') as string || '',
        content_ar: formData.get('content_ar') as string || '',
        content_en: formData.get('content_en') as string || '',
        image_url: finalImageUrl || '/about-img.jpg'
    }

    await prisma.about.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data }
    })
    
    revalidatePath('/admin/about')
    revalidatePath('/')
  }

  return (
    <>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '24px' }}>Edit Our Story (About Us)</h3>
        <form action={updateAbout} encType="multipart/form-data" style={{ display: 'grid', gap: '25px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              {/* Arabic */}
              <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
                  <h4 style={{ color: '#DBC07E' }}>Arabic Content</h4>
                  <div style={{ display: 'grid', gap: '10px' }}>
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Section Title (AR)</label>
                      <input name="title_ar" defaultValue={about?.title_ar} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                  </div>
                  <div style={{ display: 'grid', gap: '10px' }}>
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Story Content (AR)</label>
                      <textarea name="content_ar" defaultValue={about?.content_ar} required rows={6} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', resize: 'vertical' }} />
                  </div>
              </div>

              {/* English */}
              <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
                  <h4 style={{ color: '#DBC07E' }}>English Content</h4>
                  <div style={{ display: 'grid', gap: '10px' }}>
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Section Title (EN)</label>
                      <input name="title_en" defaultValue={about?.title_en} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                  </div>
                  <div style={{ display: 'grid', gap: '10px' }}>
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Story Content (EN)</label>
                      <textarea name="content_en" defaultValue={about?.content_en} required rows={6} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', resize: 'vertical' }} />
                  </div>
              </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'end', marginTop: '10px' }}>
              <div style={{ display: 'grid', gap: '10px' }}>
                  <label style={{ color: '#aaa', fontSize: '13px' }}>Upload About Section Image</label>
                  <input type="file" name="media_file" accept="image/*" style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                  <small style={{ color: '#888', fontSize: '11px' }}>Leave empty to keep current image: {about?.image_url}</small>
              </div>

              <button type="submit" style={{ padding: '14px 40px', background: '#DBC07E', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
                  Save About Changes
              </button>
          </div>
        </form>
      </div>
    </>
  )
}
