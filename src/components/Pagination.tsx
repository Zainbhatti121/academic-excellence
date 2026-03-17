'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
  )

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </Link>
      )}

      <div className="flex items-center gap-1">
        {visiblePages.map((page, i) => {
          const prevPage = visiblePages[i - 1]
          const showEllipsis = prevPage && page - prevPage > 1

          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="px-2 py-2 text-slate-400">…</span>
              )}
              <Link
                href={createPageUrl(page)}
                className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                  page === currentPage
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
                }`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            </span>
          )
        })}
      </div>

      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  )
}
