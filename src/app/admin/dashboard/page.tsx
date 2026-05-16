import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export default async function AdminDashboard() {
  const hero = await prisma.hero.findFirst()

  async function updateHero(formData: FormData) {
    'use server'
    
    // Handle File Upload
    const file = formData.get('media_file') as File
    let finalImageUrl = hero?.image_url

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      
      try {
        await mkdir(uploadDir, { recursive: true })
      } catch (e) {} // Ignore if folder exists
      
      const filepath = path.join(uploadDir, filename)
      await writeFile(filepath, buffer)
      finalImageUrl = `/uploads/${filename}`
    }

    const data = {
      title_ar: formData.get('title_ar') as string,
      title_en: formData.get('title_en') as string,
      tagline_ar: formData.get('tagline_ar') as string,
      tagline_en: formData.get('tagline_en') as string,
      btn_gallery_ar: formData.get('btn_gallery_ar') as string,
      btn_gallery_en: formData.get('btn_gallery_en') as string,
      btn_contact_ar: formData.get('btn_contact_ar') as string,
      btn_contact_en: formData.get('btn_contact_en') as string,
      feat_1_ar: formData.get('feat_1_ar') as string,
      feat_1_en: formData.get('feat_1_en') as string,
      feat_2_ar: formData.get('feat_2_ar') as string,
      feat_2_en: formData.get('feat_2_en') as string,
      feat_3_ar: formData.get('feat_3_ar') as string,
      feat_3_en: formData.get('feat_3_en') as string,
      bg_type: formData.get('bg_type') as string,
      image_url: finalImageUrl,
      overlay_opacity: parseFloat(formData.get('overlay') as string) || 0.5
    }

    const fallbackImageUrl = finalImageUrl || '/hero-bg.jpg'
    
    await prisma.hero.upsert({ 
      where: { id: 1 }, 
      update: data,
      create: { 
        id: 1, 
        ...data,
        image_url: fallbackImageUrl 
      }
    })
    revalidatePath('/')
    revalidatePath('/admin/dashboard')
  }

  const InputField = ({ label, name, defaultValue }: any) => (
    <div style={{ display: 'grid', gap: '8px' }}>
      <label style={{ color: '#aaa', fontSize: '13px' }}>{label}</label>
      <input name={name} defaultValue={defaultValue} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }} />
    </div>
  )

  return (
    <>
      <h2 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display' }}>Manage Hero Section</h2>
      
      <form action={updateHero} encType="multipart/form-data" style={{ display: 'grid', gap: '30px' }}>
        {/* Background Settings */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
          <h4 style={{ marginBottom: '15px', color: '#DBC07E' }}>Background Settings</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px' }}>
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ color: '#aaa', fontSize: '13px' }}>Background Type</label>
              <select name="bg_type" defaultValue={hero?.bg_type} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}>
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
            </div>
            
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ color: '#aaa', fontSize: '13px' }}>Upload Media (Image or Video)</label>
              <input type="file" name="media_file" accept="image/*,video/mp4,video/webm" style={{ padding: '7px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }} />
              <small style={{ color: '#888', fontSize: '11px' }}>Leave empty to keep the current background: {hero?.image_url}</small>
            </div>

            <InputField label="Dark Overlay (0.0 - 1.0)" name="overlay" defaultValue={hero?.overlay_opacity} />
          </div>
        </div>

        {/* Text Settings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>Arabic Content</h4>
            <InputField label="Title" name="title_ar" defaultValue={hero?.title_ar} />
            <InputField label="Tagline" name="tagline_ar" defaultValue={hero?.tagline_ar} />
            <InputField label="Button 1 (Gallery)" name="btn_gallery_ar" defaultValue={hero?.btn_gallery_ar} />
            <InputField label="Button 2 (Contact)" name="btn_contact_ar" defaultValue={hero?.btn_contact_ar} />
            <InputField label="Feature 1 (Rental)" name="feat_1_ar" defaultValue={hero?.feat_1_ar} />
            <InputField label="Feature 2 (Design)" name="feat_2_ar" defaultValue={hero?.feat_2_ar} />
            <InputField label="Feature 3 (Delivery)" name="feat_3_ar" defaultValue={hero?.feat_3_ar} />
          </div>

          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>English Content</h4>
            <InputField label="Title" name="title_en" defaultValue={hero?.title_en} />
            <InputField label="Tagline" name="tagline_en" defaultValue={hero?.tagline_en} />
            <InputField label="Button 1 (Gallery)" name="btn_gallery_en" defaultValue={hero?.btn_gallery_en} />
            <InputField label="Button 2 (Contact)" name="btn_contact_en" defaultValue={hero?.btn_contact_en} />
            <InputField label="Feature 1 (Rental)" name="feat_1_en" defaultValue={hero?.feat_1_en} />
            <InputField label="Feature 2 (Design)" name="feat_2_en" defaultValue={hero?.feat_2_en} />
            <InputField label="Feature 3 (Delivery)" name="feat_3_en" defaultValue={hero?.feat_3_en} />
          </div>
        </div>

        <button type="submit" style={{ justifySelf: 'start', padding: '12px 50px', background: '#DBC07E', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
          Save All Changes
        </button>
      </form>
    </>
  )
}
