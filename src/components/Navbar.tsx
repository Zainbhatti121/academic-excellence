'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, MessageCircle, Hash, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'

const WHATSAPP_URL = 'https://wa.me/923218344663?text=Hi%20ZeeTech%2C%20I%20need%20help%20with%20my%20university%20assignment!'
const DISCORD_URL = 'https://discord.com/users/zeetech_pro'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <span className="text-base font-extrabold text-slate-900">ZeeTech</span>
              <span className="block text-[10px] text-slate-400 font-medium">Academic Help</span>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search course code e.g. CS101…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </form>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/universities" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">Universities</Link>
            <Link href="/subjects" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">Subjects</Link>
            <Link href="/search" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">All Courses</Link>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Hash className="w-4 h-4" />
              Discord
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search course code…"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
          <nav className="space-y-1">
            {[['/', 'Home'], ['/universities', 'Universities'], ['/subjects', 'Subjects'], ['/search', 'All Courses']].map(([href, label]) => (
              <Link key={href} href={href} className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => setMobileOpen(false)}>{label}</Link>
            ))}
          </nav>
          <div className="flex gap-2 pt-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white text-sm font-bold rounded-xl">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl">
              <Hash className="w-4 h-4" /> Discord
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
