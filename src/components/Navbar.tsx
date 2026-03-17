'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, GraduationCap, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center shadow-md group-hover:shadow-blue-200 transition-shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">
              Academic<span className="text-blue-700">Excellence</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/universities" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
              Universities
            </Link>
            <Link href="/subjects" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
              Subjects
            </Link>
            <Link href="/search" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
              Courses
            </Link>
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, universities…"
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-full bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-full hover:bg-blue-800 transition-colors shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
            <Link href="/universities" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-blue-700 py-1">Universities</Link>
            <Link href="/subjects" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-blue-700 py-1">Subjects</Link>
            <Link href="/search" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-blue-700 py-1">Courses</Link>
            <form onSubmit={handleSearch} className="flex gap-2 pt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg">
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
