export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getUniversity } from '@/lib/universities'
import Breadcrumb from '@/components/Breadcrumb'
import CourseCard from '@/components/CourseCard'
import { buildMeta, universityJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { MapPin, Globe, Calendar, BookOpen, Award } from 'lucide-react'

export const revalidate = 86400 // Cache for 24 hours (ISR)

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const uni = await getUniversity(slug)
  if (!uni) return {}
  return buildMeta({
    title: `${uni.name} — Courses & Information`,
    description: `Explore courses at ${uni.name} in ${uni.location}. Established in ${uni.established}. View all available programmes and course codes.`,
    path: `/university/${uni.slug}`,
  })
}

export default async function UniversityPage({ params }: PageProps) {
  const { slug } = await params
  const uni = await getUniversity(slug)
  if (!uni) notFound()

  const uniJsonLd = universityJsonLd({
    name: uni.name,
    slug: uni.slug,
    description: uni.description,
    location: uni.location,
    website: uni.website,
    established: uni.established,
  })

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' },
    { name: 'Universities', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/universities` },
    { name: uni.name, url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/university/${uni.slug}` },
  ])

  // Group courses by subject
  const coursesBySubject = uni.courses.reduce((acc, course) => {
    const subjectName = course.subject.name
    if (!acc[subjectName]) acc[subjectName] = []
    acc[subjectName].push(course)
    return acc
  }, {} as Record<string, typeof uni.courses>)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(uniJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[
            { label: 'Universities', href: '/universities' },
            { label: uni.name },
          ]} />

          <div className="mt-8 flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-3xl">
                {uni.name.split(' ').filter(w => w.length > 3).slice(0, 1)[0]?.[0] || uni.name[0]}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Ranked #{uni.ranking}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
                {uni.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {uni.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Est. {uni.established}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {uni._count.courses} courses listed
                </span>
                {uni.website && (
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Official website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* About */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About {uni.name}</h2>
              <p className="text-slate-600 leading-relaxed">{uni.description}</p>
            </section>

            {/* Courses */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Available Courses</h2>
              {Object.entries(coursesBySubject).map(([subjectName, courses]) => (
                <div key={subjectName} className="mb-8">
                  <h3 className="text-base font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {subjectName}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses.map((course) => (
                      <CourseCard
                        key={course.id}
                        code={course.code}
                        title={course.title}
                        description={course.description}
                        level={course.level}
                        credits={course.credits}
                        universityName={uni.name}
                        universitySlug={uni.slug}
                        subjectName={course.subject.name}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick facts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Facts</h3>
              <dl className="space-y-3">
                {[
                  { label: 'Location', value: uni.location },
                  { label: 'Established', value: uni.established.toString() },
                  { label: 'UK Ranking', value: `#${uni.ranking}` },
                  { label: 'Total Courses', value: uni._count.courses.toString() },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="font-semibold text-slate-800">{value}</dd>
                  </div>
                ))}
              </dl>
              {uni.website && (
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full text-center py-2.5 bg-blue-700 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Visit Official Website
                </a>
              )}
            </div>

            {/* Browse subjects */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Browse Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(coursesBySubject).map((subject) => (
                  <Link
                    key={subject}
                    href={`/search?subject=${subject.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-xs font-medium px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                  >
                    {subject}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
