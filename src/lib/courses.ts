import { prisma } from './prisma'
import type { PaginatedResult, SearchFilters } from '@/types'

export async function getCourses(filters: SearchFilters = {}) {
  const { page = 1, pageSize = 12, q, subject, university } = filters
  const skip = (page - 1) * pageSize

  const where: Record<string, unknown> = {}
  if (q) {
    where.OR = [
      { code: { contains: q, mode: 'insensitive' as const } },
      { title: { contains: q, mode: 'insensitive' as const } },
      { description: { contains: q, mode: 'insensitive' as const } },
    ]
  }
  if (subject) where.subject = { slug: subject }
  if (university) where.university = { slug: university }

  const [data, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { code: 'asc' },
      include: {
        university: { select: { id: true, name: true, slug: true, location: true } },
        subject: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.course.count({ where }),
  ])

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  } as PaginatedResult<typeof data[0]>
}

export async function getCourse(code: string) {
  return prisma.course.findUnique({
    where: { code: code.toUpperCase() },
    include: {
      university: { select: { id: true, name: true, slug: true, location: true, established: true } },
      subject: { select: { id: true, name: true, slug: true } },
    },
  })
}

export async function getAllCourseCodes() {
  const courses = await prisma.course.findMany({ select: { code: true } })
  return courses.map((c) => c.code)
}

export async function getRelatedCourses(code: string, subjectId: number, limit = 4) {
  return prisma.course.findMany({
    where: {
      subjectId,
      NOT: { code },
    },
    take: limit,
    orderBy: { code: 'asc' },
    include: {
      university: { select: { name: true, slug: true } },
      subject: { select: { name: true, slug: true } },
    },
  })
}

export async function getFeaturedCourses(limit = 6) {
  return prisma.course.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      university: { select: { name: true, slug: true, location: true } },
      subject: { select: { name: true, slug: true } },
    },
  })
}
