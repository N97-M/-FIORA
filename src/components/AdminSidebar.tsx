'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { name: 'Hero Section',  href: '/admin/dashboard', icon: 'fa-home' },
    { name: 'Navigation',    href: '/admin/navbar',    icon: 'fa-compass' },
    { name: 'About Us',      href: '/admin/about',     icon: 'fa-info-circle' },
    { name: 'Services',      href: '/admin/services',  icon: 'fa-concierge-bell' },
    { name: 'Gallery',       href: '/admin/gallery',   icon: 'fa-images' },
    { name: 'Settings',      href: '/admin/settings',  icon: 'fa-cog' },
  ]

  const secureLinks = [
    { name: 'Admin Access',  href: '/admin/admins',    icon: 'fa-shield-alt' },
  ]

  const linkStyle = (href: string) => ({
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: pathname === href ? '#DBC07E' : '#aaa',
    background: pathname === href ? 'rgba(219, 192, 126, 0.1)' : 'transparent',
    border: pathname === href ? '1px solid rgba(219, 192, 126, 0.2)' : '1px solid transparent',
  } as React.CSSProperties)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {links.map(link => (
        <Link key={link.href} href={link.href} style={linkStyle(link.href)}>
          <i className={`fas ${link.icon}`}></i>
          {link.name}
        </Link>
      ))}

      {/* Security separator */}
      <div style={{ borderTop: '1px solid #1a1a1a', margin: '12px 0 6px' }}></div>
      <div style={{ fontSize: '10px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 20px 4px' }}>Security</div>

      {secureLinks.map(link => (
        <Link key={link.href} href={link.href} style={linkStyle(link.href)}>
          <i className={`fas ${link.icon}`} style={{ color: pathname === link.href ? '#DBC07E' : '#f59e0b' }}></i>
          {link.name}
        </Link>
      ))}
    </div>
  )
}
