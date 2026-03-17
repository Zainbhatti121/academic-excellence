import Link from 'next/link'
import type { Metadata } from 'next'
import { Search, GraduationCap, BookOpen, Building2, ArrowRight, Star, TrendingUp, Users } from 'lucide-react'
import { getFeaturedUniversities } from '@/lib/universities'
import { getFeaturedCourses } from '@/lib/courses'
import { getSubjects } from '@/lib/search'
import UniversityCard from '@/components/UniversityCard'
import CourseCard from '@/components/CourseCard'
import { websiteJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Academic Excellence — UK University & Course Directory',
  description: 'Find top UK universities, browse courses by code or subject. Your definitive guide to UK higher education with 20+ universities and hundreds of courses.',
  openGraph: {
    title: 'Academic Excellence — UK University & Course Directory',
    description: 'Find top UK universities, browse courses by code or subject.',
  },
}

export const revalidate = 3600

const SUBJECT_ICONS: Record<string, string> = {
  'computer-science': '💻',
  'law': '⚖️',
  'medicine': '🏥',
  'engineering': '⚙️',
  'business-management': '📊',
  'psychology': '🧠',
  'mathematics': '📐',
  'physics': '⚛️',
  'economics': '📈',
  'history': '📜',
}

export default async function HomePage() {
  const [universities, courses, subjects] = await Promise.all([
    getFeaturedUniversities(6),
    getFeaturedCourses(6),
    getSubjects(),
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-300 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500 rounded-full translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800/60 backdrop-blur-sm border border-blue-600/50 rounded-full px-4 py-2 text-sm font-medium text-blue-200 mb-8">
            <Star className="w-3.5 h-3.5 text-yellow-400" />
            UK&apos;s premier university &amp; course directory
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-none">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
              Academic Path
            </span>
          </h1>

          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore {universities.length > 0 ? '20+' : ''} top UK universities and hundreds of courses. Search by course code, subject, or institution to find your perfect programme.
          </p>

          {/* Search box */}
          <form action="/search" method="get" className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl">
              <div className="flex-1 flex items-center gap-3 pl-3">
                <Search className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <input
                  name="q"
                  type="text"
                  placeholder="Search by course code (e.g. CSC232), university, or subject…"
                  className="flex-1 bg-transparent text-white placeholder-blue-300/70 outline-none text-sm py-2"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-900 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2 flex-shrink-0"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 text-sm">
            {[
              { icon: Building2, label: '20+ Universities', value: 'Russell Group & More' },
              { icon: BookOpen, label: '30+ Courses', value: 'All Subjects' },
              { icon: GraduationCap, label: '100% UK', value: 'Focused' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-200" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-bold text-white text-base">{label}</div>
                  <div className="text-blue-300 text-xs">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Browse by Subject</h2>
              <p className="text-slate-500 mt-1">Find courses in your area of interest</p>
            </div>
            <Link href="/subjects" className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors">
              All subjects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/search?subject=${subject.slug}`}
                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all group text-center"
              >
                <span className="text-3xl">{SUBJECT_ICONS[subject.slug] || '📚'}</span>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors leading-tight">
                  {subject.name}
                </span>
                <span className="text-xs text-slate-400">{subject._count.courses} courses</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Universities */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Top UK Universities</h2>
              <p className="text-slate-500 mt-1">Ranked by academic prestige</p>
            </div>
            <Link href="/universities" className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Courses</h2>
              <p className="text-slate-500 mt-1">Browse courses across all disciplines</p>
            </div>
            <Link href="/search" className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors">
              All courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
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
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-12 h-12 text-blue-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Course?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Search through hundreds of courses at top UK universities by course code, subject, or keyword.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Search className="w-5 h-5" />
              Search Courses
            </Link>
            <Link
              href="/universities"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors border border-blue-600"
            >
              <Building2 className="w-5 h-5" />
              Browse Universities
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
