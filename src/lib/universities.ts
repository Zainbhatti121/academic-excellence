import { prisma } from './prisma'
import type { PaginatedResult, SearchFilters } from '@/types'

export async function getUniversities(filters: SearchFilters = {}) {
  const { page = 1, pageSize = 12, q, country } = filters
  const skip = (page - 1) * pageSize

  const where: Record<string, unknown> = {}
  if (country) where.country = country
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' as const } },
      { location: { contains: q, mode: 'insensitive' as const } },
      { description: { contains: q, mode: 'insensitive' as const } },
    ]
  }

  const [data, total] = await Promise.all([
    prisma.university.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { ranking: 'asc' },
      include: { _count: { select: { courses: true } } },
    }),
    prisma.university.count({ where }),
  ])

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  } as PaginatedResult<typeof data[0]>
}

export async function getUniversity(slug: string) {
  return prisma.university.findUnique({
    where: { slug },
    include: {
      courses: {
        include: { subject: true },
        orderBy: { code: 'asc' },
      },
      _count: { select: { courses: true } },
    },
  })
}

export async function getAllUniversitySlugs() {
  const universities = await prisma.university.findMany({
    select: { slug: true },
  })
  return universities.map((u) => u.slug)
}

export async function getFeaturedUniversities(limit = 6) {
  return prisma.university.findMany({
    take: limit,
    orderBy: { ranking: 'asc' },
    include: { _count: { select: { courses: true } } },
  })
}
