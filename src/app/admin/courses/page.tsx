import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { BookOpen, Building2, Plus, Edit, Code2 } from 'lucide-react'

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { code: 'asc' },
    include: {
      university: { select: { name: true, slug: true } },
      subject: { select: { name: true } },
    },
  })

  const LEVEL_COLORS: Record<string, string> = {
    Undergraduate: 'bg-emerald-50 text-emerald-700',
    Postgraduate: 'bg-purple-50 text-purple-700',
    Doctoral: 'bg-orange-50 text-orange-700',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link href="/admin" className="hover:text-blue-700">Admin</Link>
            <span>/</span>
            <span>Courses</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Courses ({courses.length})</h1>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left font-semibold text-slate-600 px-6 py-4">Code</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4">Title</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4 hidden sm:table-cell">University</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4 hidden md:table-cell">Subject</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4 hidden lg:table-cell">Level</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded font-mono">
                      <Code2 className="w-3 h-3" />
                      {course.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 max-w-xs truncate">{course.title}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[140px]">{course.university.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <BookOpen className="w-3.5 h-3.5" />
                      {course.subject.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${LEVEL_COLORS[course.level] || 'bg-slate-50 text-slate-600'}`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/course/${course.code.toLowerCase()}`}
                        className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                        target="_blank"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
