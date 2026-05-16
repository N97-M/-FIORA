import { prisma } from '@/lib/prisma'
import GalleryClient from './GalleryClient'

export default async function AdminGallery() {
  const gallery = await prisma.galleryItem.findMany({
    include: { category: true },
    orderBy: { updatedAt: 'desc' }
  })
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } })

  return <GalleryClient gallery={gallery} categories={categories} />
}
