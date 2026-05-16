import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminServices() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  })

  async function addService(formData: FormData) {
    'use server'
    
    await prisma.service.create({
      data: {
        title_ar: formData.get('title_ar') as string || '',
        title_en: formData.get('title_en') as string || '',
        desc_ar: formData.get('desc_ar') as string || '',
        desc_en: formData.get('desc_en') as string || '',
        icon: formData.get('icon') as string || 'fas fa-star',
      }
    })
    revalidatePath('/admin/services')
    revalidatePath('/')
  }

  async function deleteService(id: string) {
    'use server'
    await prisma.service.delete({ where: { id } })
    revalidatePath('/admin/services')
    revalidatePath('/')
  }

  return (
    <>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '24px' }}>Add New Service</h3>
        <form action={addService} style={{ display: 'grid', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Arabic Fields */}
            <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #222' }}>
                <h4 style={{ color: '#DBC07E', fontSize: '16px' }}>Arabic Content</h4>
                <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Title (AR)</label>
                  <input name="title_ar" required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} />
                </div>
                <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Description (AR)</label>
                  <textarea name="desc_ar" rows={2} required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} />
                </div>
            </div>

            {/* English Fields */}
            <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #222' }}>
                <h4 style={{ color: '#DBC07E', fontSize: '16px' }}>English Content</h4>
                <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Title (EN)</label>
                  <input name="title_en" required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} />
                </div>
                <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Description (EN)</label>
                  <textarea name="desc_en" rows={2} required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} />
                </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '15px', alignItems: 'end' }}>
            <div style={{ display: 'grid', gap: '5px' }}>
              <label style={{ fontSize: '12px', color: '#aaa' }}>Icon (FontAwesome Class)</label>
              <input name="icon" defaultValue="fas fa-star" required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} />
            </div>
            <button type="submit" style={{ padding: '10px 35px', background: '#DBC07E', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', height: '40px' }}>Add Service</button>
          </div>
        </form>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {services.map(service => (
          <div key={service.id} style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <i className={service.icon} style={{ fontSize: '28px', color: '#DBC07E', marginTop: '5px' }}></i>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#fff' }}>AR: {service.title_ar}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>{service.desc_ar}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#fff' }}>EN: {service.title_en}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>{service.desc_en}</p>
                </div>
              </div>
            </div>
            <form action={deleteService.bind(null, service.id)}>
              <button type="submit" style={{ background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.2)', color: '#ff4444', cursor: 'pointer', padding: '10px 15px', borderRadius: '6px', transition: '0.3s' }}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </>
  )
}
