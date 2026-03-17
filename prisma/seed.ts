import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { universities, subjects, courses } from './data'

const prisma = new PrismaClient()


async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.course.deleteMany()
  await prisma.university.deleteMany()
  await prisma.subject.deleteMany()

  // Seed subjects
  const subjectRecords: Record<string, number> = {}
  for (const subject of subjects) {
    const s = await prisma.subject.create({ data: subject })
    subjectRecords[s.slug] = s.id
  }
  console.log(`✅ Seeded ${subjects.length} subjects`)

  // Seed universities
  const universityRecords: Record<string, number> = {}
  for (const uni of universities) {
    const u = await prisma.university.create({ data: uni })
    universityRecords[u.slug] = u.id
  }
  console.log(`✅ Seeded ${universities.length} universities`)

  // Seed courses
  for (const course of courses) {
    const { universitySlug, subjectSlug, ...courseData } = course as typeof course & { universitySlug: string; subjectSlug: string }
    await prisma.course.create({
      data: {
        ...courseData,
        universityId: universityRecords[universitySlug],
        subjectId: subjectRecords[subjectSlug],
      },
    })
  }
  console.log(`✅ Seeded ${courses.length} courses`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
