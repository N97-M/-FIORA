import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminSettings() {
  const settings = await prisma.settings.findFirst()

  async function updateSettings(formData: FormData) {
    'use server'
    const data = {
        whatsapp_number: formData.get('whatsapp_number') as string || '',
        whatsapp_msg_ar: formData.get('whatsapp_msg_ar') as string || '',
        whatsapp_msg_en: formData.get('whatsapp_msg_en') as string || '',
        tiktok_url: formData.get('tiktok_url') as string || '',
        instagram_url: formData.get('instagram_url') as string || '',
        snapchat_url: formData.get('snapchat_url') as string || '',
        status: formData.get('status') as string || 'AVAILABLE',
    }

    await prisma.settings.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data }
    })
    
    revalidatePath('/admin/settings')
    revalidatePath('/')
  }

  return (
    <>
      <h3 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '24px' }}>Update Website Connections</h3>
      <form action={updateSettings} encType="multipart/form-data" style={{ display: 'grid', gap: '25px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>WhatsApp Number</label>
                <input name="whatsapp_number" defaultValue={settings?.whatsapp_number} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>Business Status</label>
                <select name="status" defaultValue={settings?.status} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }}>
                    <option value="AVAILABLE">Available (Website Open)</option>
                    <option value="BUSY">Busy</option>
                    <option value="CLOSED">Closed (Maintenance)</option>
                </select>
            </div>
        </div>

        {/* WhatsApp Default Messages */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#DBC07E', fontSize: '14px' }}>Default WhatsApp Message (AR)</label>
                <textarea name="whatsapp_msg_ar" defaultValue={settings?.whatsapp_msg_ar} rows={3} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', resize: 'vertical' }} />
                <small style={{ color: '#888', fontSize: '11px' }}>This text is auto-filled when an Arabic user clicks contact.</small>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#DBC07E', fontSize: '14px' }}>Default WhatsApp Message (EN)</label>
                <textarea name="whatsapp_msg_en" defaultValue={settings?.whatsapp_msg_en} rows={3} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', resize: 'vertical' }} />
                <small style={{ color: '#888', fontSize: '11px' }}>This text is auto-filled when an English user clicks contact.</small>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>TikTok Link</label>
                <input name="tiktok_url" defaultValue={settings?.tiktok_url} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>Instagram Link</label>
                <input name="instagram_url" defaultValue={settings?.instagram_url} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>Snapchat Link</label>
                <input name="snapchat_url" defaultValue={settings?.snapchat_url} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
            </div>
        </div>
        <button type="submit" style={{ alignSelf: 'flex-start', padding: '12px 40px', background: '#DBC07E', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>Save Connections</button>
      </form>
    </>
  )
}
