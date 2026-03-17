import type { Metadata } from 'next'
import { searchAll } from '@/lib/search'
import { getCourses } from '@/lib/courses'
import UniversityCard from '@/components/UniversityCard'
import CourseCard from '@/components/CourseCard'
import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/Breadcrumb'
import { buildMeta } from '@/lib/seo'
import { Search, BookOpen, Building2 } from 'lucide-react'

interface PageProps {
  searchParams: Promise<{ q?: string; subject?: string; university?: string; page?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q, subject } = await searchParams
  const title = q ? `Search: "${q}"` : subject ? `${subject.replace(/-/g, ' ')} Courses` : 'Course Search'
  return buildMeta({
    title,
    description: q
      ? `Search results for "${q}" — find UK university courses and institutions`
      : 'Search UK university courses by course code, subject, or institution name.',
    path: '/search',
  })
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, subject, university, page: pageParam } = await searchParams
  const page = parseInt(pageParam || '1')

  // Fetch results
  let universities: Awaited<ReturnType<typeof searchAll>>['universities'] = []
  const coursesResult = await getCourses({ q, subject, university, page, pageSize: 12 })

  if (q && !subject && !university) {
    const search = await searchAll(q)
    universities = search.universities
  }

  const hasFilters = !!(q || subject || university)
  const subjectLabel = subject ? subject.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Course Search' }]} />

      {/* Header */}
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            {q ? `Results for "${q}"` : subjectLabel ? `${subjectLabel} Courses` : 'All Courses'}
          </h1>
        </div>
        <p className="text-slate-500 text-lg">
          {coursesResult.total} {coursesResult.total === 1 ? 'course' : 'courses'} found
        </p>
      </div>

      {/* Search form */}
      <form action="/search" method="get" className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="q" className="block text-xs font-medium text-slate-600 mb-1.5">Search term</label>
            <input
              id="q"
              name="q"
              type="text"
              defaultValue={q}
              placeholder="Course code, title, keyword…"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs font-medium text-slate-600 mb-1.5">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              defaultValue={subject}
              placeholder="e.g. computer-science"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" className="flex-1 py-2.5 bg-blue-700 text-white font-medium text-sm rounded-xl hover:bg-blue-800 transition-colors">
              Search
            </button>
            {hasFilters && (
              <a href="/search" className="px-4 py-2.5 border border-slate-200 bg-white text-slate-600 text-sm rounded-xl hover:bg-slate-50 transition-colors">
                Clear
              </a>
            )}
          </div>
        </div>
      </form>

      {/* University results (when doing full search) */}
      {universities.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-700" />
            Matching Universities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {universities.map((uni) => (
              <UniversityCard
                key={uni.id}
                name={uni.name}
                slug={uni.slug}
                location={uni.location}
                description={uni.description}
                established={uni.established}
                ranking={uni.ranking}
                courseCount={uni._count.courses}
              />
            ))}
          </div>
          <div className="border-t border-slate-200 my-8" />
        </section>
      )}

      {/* Course results */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-700" />
          Courses
        </h2>

        {coursesResult.data.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium text-slate-700">No courses found</p>
            <p className="text-sm text-slate-500 mt-2">Try different search terms or browse all subjects</p>
            <a href="/subjects" className="inline-block mt-6 px-6 py-2.5 bg-blue-700 text-white font-medium text-sm rounded-xl hover:bg-blue-800 transition-colors">
              Browse Subjects
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {coursesResult.data.map((course) => (
                <CourseCard
                  key={course.id}
                  code={course.code}
                  title={course.title}
                  description={course.description}
                  level={course.level}
                  credits={course.credits}
                  universityName={course.university.name}
                  universitySlug={course.university.slug}
                  subjectName={course.subject.name}
                />
              ))}
            </div>
            <Pagination currentPage={coursesResult.page} totalPages={coursesResult.totalPages} />
          </>
        )}
      </section>
    </div>
  )
}
