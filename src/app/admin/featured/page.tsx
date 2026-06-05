import { prisma } from '@/lib/prisma'
import GalleryClient from '../gallery/GalleryClient'

export default async function AdminFeaturedProjects() {
  const featuredProjects = await prisma.galleryItem.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { updatedAt: 'desc' }
  })
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 className="text-2xl" style={{ color: '#DBC07E' }}>Featured Projects</h2>
        <p className="text-gray-400 text-sm mt-1">Manage the projects that appear in the 'Featured Projects' section on the homepage.</p>
      </div>
      <GalleryClient gallery={featuredProjects} categories={categories} isFeaturedMode={true} />
    </div>
  )
}
