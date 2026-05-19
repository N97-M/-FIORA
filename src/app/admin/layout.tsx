import AdminSidebar from '@/components/AdminSidebar'
import LogoutButton from '@/components/LogoutButton'

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" style={{ direction: 'ltr', background: '#050505', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', direction: 'ltr', textAlign: 'left' }}>
        {/* Global Admin Header */}
        <div className="admin-header">
          <h1 style={{ color: '#DBC07E', fontFamily: 'Playfair Display', margin: 0, fontSize: '28px' }}>FIORA Studio Dashboard</h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
             <a href="/" target="_blank" style={{ color: '#aaa', textDecoration: 'none', transition: '0.3s' }}>
                <i className="fas fa-external-link-alt" style={{ marginRight: '8px' }}></i>
                View Site
             </a>
             <LogoutButton />
          </div>
        </div>

        {/* Global Admin Grid layout */}
        <div className="admin-layout-grid">
          <AdminSidebar />
          <div className="admin-content-card">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
