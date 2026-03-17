import { prisma } from './prisma'

export async function getSubjects() {
  return prisma.subject.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { courses: true } } },
  })
}

export async function searchAll(q: string) {
  const [universities, courses] = await Promise.all([
    prisma.university.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { location: { contains: q, mode: 'insensitive' as const } },
          { description: { contains: q, mode: 'insensitive' as const } },
        ],
      },
      take: 5,
      include: { _count: { select: { courses: true } } },
    }),
    prisma.course.findMany({
      where: {
        OR: [
          { code: { contains: q, mode: 'insensitive' as const } },
          { title: { contains: q, mode: 'insensitive' as const } },
          { description: { contains: q, mode: 'insensitive' as const } },
        ],
      },
      take: 10,
      include: {
        university: { select: { name: true, slug: true, location: true } },
        subject: { select: { name: true, slug: true } },
      },
    }),
  ])

  return { universities, courses }
}
