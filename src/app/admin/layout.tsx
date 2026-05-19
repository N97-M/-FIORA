import AdminSidebar from '@/components/AdminSidebar'

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" style={{ direction: 'ltr', background: '#050505', minHeight: '100vh', color: '#fff', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', direction: 'ltr', textAlign: 'left' }}>
        {/* Global Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', borderBottom: '1px solid rgba(219,192,126,0.1)', paddingBottom: '20px' }}>
          <h1 style={{ color: '#DBC07E', fontFamily: 'Playfair Display', margin: 0, fontSize: '28px' }}>FIORA Studio Dashboard</h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
             <a href="/" target="_blank" style={{ color: '#aaa', textDecoration: 'none', transition: '0.3s' }}>
                <i className="fas fa-external-link-alt" style={{ marginRight: '8px' }}></i>
                View Site
             </a>
             <button style={{ background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', border: '1px solid rgba(255, 68, 68, 0.2)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>
                Logout
             </button>
          </div>
        </div>

        {/* Global Admin Grid layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px', alignItems: 'start' }}>
          <AdminSidebar />
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
