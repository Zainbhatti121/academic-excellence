import type { Metadata } from 'next'
import { getUniversities } from '@/lib/universities'
import UniversityCard from '@/components/UniversityCard'
import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/Breadcrumb'
import { buildMeta } from '@/lib/seo'
import { Building2 } from 'lucide-react'

export const revalidate = 3600

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams
  if (q) {
    return buildMeta({
      title: `Search results for "${q}" — UK Universities`,
      description: `Browse UK universities matching "${q}". Find courses, rankings, and more.`,
      path: `/universities?q=${encodeURIComponent(q)}`,
    })
  }
  return buildMeta({
    title: 'UK Universities Directory',
    description: 'Explore all leading UK universities. Browse by ranking, location, and available courses. Find your perfect institution for higher education.',
    path: '/universities',
  })
}

export default async function UniversitiesPage({ searchParams }: PageProps) {
  const { page: pageParam, q } = await searchParams
  const page = parseInt(pageParam || '1')
  const result = await getUniversities({ page, pageSize: 12, q })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Universities' }]} />

      {/* Header */}
      <div className="mt-6 mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">UK Universities</h1>
        </div>
        <p className="text-slate-500 text-lg ml-13">
          {q
            ? `Showing results for "${q}" — ${result.total} ${result.total === 1 ? 'university' : 'universities'} found`
            : `Explore all ${result.total} leading UK universities`}
        </p>
      </div>

      {/* Search hint */}
      <form action="/universities" method="get" className="mb-8 flex gap-2 max-w-md">
        <input
          name="q"
          type="text"
          defaultValue={q}
          placeholder="Filter universities…"
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <button type="submit" className="px-5 py-2.5 bg-blue-700 text-white font-medium text-sm rounded-xl hover:bg-blue-800 transition-colors">
          Filter
        </button>
        {q && (
          <a href="/universities" className="px-4 py-2.5 border border-slate-200 bg-white text-slate-600 text-sm rounded-xl hover:bg-slate-50 transition-colors">
            Clear
          </a>
        )}
      </form>

      {/* Grid */}
      {result.data.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium">No universities found</p>
          <p className="text-sm mt-2">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {result.data.map((uni) => (
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
      )}

      {/* Pagination */}
      <Pagination currentPage={result.page} totalPages={result.totalPages} />
    </div>
  )
}
