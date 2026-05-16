import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminNavbar() {
  const navbar = await prisma.navbar.findFirst()

  async function updateNavbar(formData: FormData) {
    'use server'
    const data = {
      nav_home_ar: formData.get('nav_home_ar') as string,
      nav_home_en: formData.get('nav_home_en') as string,
      nav_about_ar: formData.get('nav_about_ar') as string,
      nav_about_en: formData.get('nav_about_en') as string,
      nav_services_ar: formData.get('nav_services_ar') as string,
      nav_services_en: formData.get('nav_services_en') as string,
      nav_gallery_ar: formData.get('nav_gallery_ar') as string,
      nav_gallery_en: formData.get('nav_gallery_en') as string,
      nav_how_ar: formData.get('nav_how_ar') as string,
      nav_how_en: formData.get('nav_how_en') as string,
      nav_contact_ar: formData.get('nav_contact_ar') as string,
      nav_contact_en: formData.get('nav_contact_en') as string,
    }

    await prisma.navbar.upsert({ 
      where: { id: 1 }, 
      update: data,
      create: { id: 1, ...data }
    })
    revalidatePath('/')
    revalidatePath('/admin/navbar')
  }

  const InputField = ({ label, name, defaultValue }: any) => (
    <div style={{ display: 'grid', gap: '8px' }}>
      <label style={{ color: '#aaa', fontSize: '13px' }}>{label}</label>
      <input name={name} defaultValue={defaultValue} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }} />
    </div>
  )

  return (
    <>
      <h2 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display' }}>Manage Top Navigation</h2>
      
      <form action={updateNavbar} encType="multipart/form-data" style={{ display: 'grid', gap: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>Arabic Menu Links</h4>
            <InputField label="Home" name="nav_home_ar" defaultValue={navbar?.nav_home_ar} />
            <InputField label="About Us" name="nav_about_ar" defaultValue={navbar?.nav_about_ar} />
            <InputField label="Services" name="nav_services_ar" defaultValue={navbar?.nav_services_ar} />
            <InputField label="Our Work" name="nav_gallery_ar" defaultValue={navbar?.nav_gallery_ar} />
            <InputField label="How to Rent" name="nav_how_ar" defaultValue={navbar?.nav_how_ar} />
            <InputField label="Contact Us" name="nav_contact_ar" defaultValue={navbar?.nav_contact_ar} />
          </div>

          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>English Menu Links</h4>
            <InputField label="Home" name="nav_home_en" defaultValue={navbar?.nav_home_en} />
            <InputField label="About Us" name="nav_about_en" defaultValue={navbar?.nav_about_en} />
            <InputField label="Services" name="nav_services_en" defaultValue={navbar?.nav_services_en} />
            <InputField label="Our Work" name="nav_gallery_en" defaultValue={navbar?.nav_gallery_en} />
            <InputField label="How to Rent" name="nav_how_en" defaultValue={navbar?.nav_how_en} />
            <InputField label="Contact Us" name="nav_contact_en" defaultValue={navbar?.nav_contact_en} />
          </div>
        </div>

        <button type="submit" style={{ justifySelf: 'start', padding: '12px 50px', background: '#DBC07E', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
          Save Navigation
        </button>
      </form>
    </>
  )
}
