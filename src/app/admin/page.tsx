import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Building2, BookOpen, Grid3X3, Plus, ArrowRight } from 'lucide-react'

export default async function AdminPage() {
  const [uniCount, courseCount, subjectCount] = await Promise.all([
    prisma.university.count(),
    prisma.course.count(),
    prisma.subject.count(),
  ])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Panel</h1>
        <p className="text-slate-500">Manage universities, courses, and academic subjects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Universities', count: uniCount, icon: Building2, href: '/admin/universities' },
          { label: 'Courses', count: courseCount, icon: BookOpen, href: '/admin/courses' },
          { label: 'Subjects', count: subjectCount, icon: Grid3X3, href: '/admin/universities' },
        ].map(({ label, count, icon: Icon, href }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Icon className="w-5 h-5 text-blue-700" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{count}</div>
            <div className="text-sm text-slate-500">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-700" />
            Universities
          </h2>
          <div className="space-y-2">
            <Link href="/admin/universities" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <span className="text-sm text-slate-700">View all universities</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link href="/admin/universities/new" className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add new university</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-700" />
            Courses
          </h2>
          <div className="space-y-2">
            <Link href="/admin/courses" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <span className="text-sm text-slate-700">View all courses</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link href="/admin/courses/new" className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add new course</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Note:</strong> This admin panel is for development use. For production, add proper authentication before deploying.
      </div>
    </div>
  )
}
