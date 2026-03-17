import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCourse, getRelatedCourses } from '@/lib/courses'
import Breadcrumb from '@/components/Breadcrumb'
import CourseCard from '@/components/CourseCard'
import { buildMeta, courseJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { Building2, BookOpen, Award, CheckCircle, ArrowRight } from 'lucide-react'

export const revalidate = 86400 // Cache for 24 hours (ISR)

interface PageProps {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params
  const course = await getCourse(code)
  if (!course) return {}
  return buildMeta({
    title: `${course.code} — ${course.title}`,
    description: `${course.title} (${course.code}) at ${course.university.name}. ${course.level} course worth ${course.credits} credits. ${course.description.slice(0, 120)}…`,
    path: `/course/${course.code.toLowerCase()}`,
  })
}

export default async function CoursePage({ params }: PageProps) {
  const { code } = await params
  const course = await getCourse(code)
  if (!course) notFound()

  const relatedCourses = await getRelatedCourses(course.code, course.subjectId, 4)

  const courseJd = courseJsonLd({
    code: course.code,
    title: course.title,
    description: course.description,
    level: course.level,
    credits: course.credits,
    university: course.university,
    subject: course.subject,
  })

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' },
    { name: 'Courses', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search` },
    { name: course.subject.name, url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search?subject=${course.subject.slug}` },
    { name: course.code, url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/course/${course.code.toLowerCase()}` },
  ])

  const outcomes = course.outcomes.split(';').map((o) => o.trim()).filter(Boolean)

  const LEVEL_COLORS: Record<string, string> = {
    Undergraduate: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Postgraduate: 'bg-purple-100 text-purple-800 border-purple-200',
    Doctoral: 'bg-orange-100 text-orange-800 border-orange-200',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[
            { label: 'Courses', href: '/search' },
            { label: course.subject.name, href: `/search?subject=${course.subject.slug}` },
            { label: course.code },
          ]} />

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center bg-blue-700 text-white text-sm font-bold px-3 py-1.5 rounded-lg font-mono tracking-wide">
                {course.code}
              </span>
              <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${LEVEL_COLORS[course.level] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                {course.level}
              </span>
              <span className="flex items-center gap-1 text-blue-300 text-sm">
                <Award className="w-4 h-4" />
                {course.credits} credits
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight max-w-4xl">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
              <Link
                href={`/university/${course.university.slug}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Building2 className="w-4 h-4" />
                {course.university.name}
              </Link>
              <Link
                href={`/search?subject=${course.subject.slug}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                {course.subject.name}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Course Overview</h2>
              <p className="text-slate-600 leading-relaxed text-base">{course.description}</p>
            </section>

            {/* Learning outcomes */}
            {outcomes.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Learning Outcomes</h2>
                <p className="text-slate-500 text-sm mb-4">Upon successful completion of this course, students will be able to:</p>
                <ul className="space-y-3">
                  {outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related courses */}
            {relatedCourses.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Related Courses</h2>
                  <Link
                    href={`/search?subject=${course.subject.slug}`}
                    className="text-sm text-blue-700 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                  >
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedCourses.map((rc) => (
                    <CourseCard
                      key={rc.id}
                      code={rc.code}
                      title={rc.title}
                      description={rc.description}
                      level={rc.level}
                      credits={rc.credits}
                      universityName={rc.university.name}
                      universitySlug={rc.university.slug}
                      subjectName={rc.subject.name}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Course Details</h3>
              <dl className="space-y-3">
                {[
                  { label: 'Course Code', value: course.code },
                  { label: 'Level', value: course.level },
                  { label: 'Credits', value: `${course.credits} credits` },
                  { label: 'Subject', value: course.subject.name },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="font-semibold text-slate-800 text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* University info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Offered by</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {course.university.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm leading-tight">{course.university.name}</p>
                  <p className="text-slate-500 text-xs">{course.university.location}</p>
                </div>
              </div>
              <Link
                href={`/university/${course.university.slug}`}
                className="block w-full text-center py-2.5 bg-blue-700 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
              >
                View All Courses at This University
              </Link>
            </div>

            {/* Subject quick link */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="font-bold text-slate-900 mb-2">Explore {course.subject.name}</h3>
              <p className="text-slate-500 text-sm mb-4">Browse all courses in this subject area.</p>
              <Link
                href={`/search?subject=${course.subject.slug}`}
                className="block w-full text-center py-2.5 bg-white text-blue-700 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors border border-blue-200"
              >
                Browse {course.subject.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
