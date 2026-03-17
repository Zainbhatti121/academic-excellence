import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Building2, MapPin, BookOpen, Plus, Edit } from 'lucide-react'

export default async function AdminUniversitiesPage() {
  const universities = await prisma.university.findMany({
    orderBy: { ranking: 'asc' },
    include: { _count: { select: { courses: true } } },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link href="/admin" className="hover:text-blue-700">Admin</Link>
            <span>/</span>
            <span>Universities</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Universities</h1>
        </div>
        <Link
          href="/admin/universities/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add University
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left font-semibold text-slate-600 px-6 py-4">#</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4">University</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4 hidden sm:table-cell">Location</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4 hidden md:table-cell">Courses</th>
                <th className="text-left font-semibold text-slate-600 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {universities.map((uni) => (
                <tr key={uni.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">#{uni.ranking}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{uni.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{uni.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{uni.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {uni.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-slate-500">
                      <BookOpen className="w-3.5 h-3.5" />
                      {uni._count.courses}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/university/${uni.slug}`}
                        className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1"
                        target="_blank"
                      >
                        <Building2 className="w-3 h-3" />
                        View
                      </Link>
                      <Link
                        href={`/admin/universities/${uni.id}/edit`}
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
