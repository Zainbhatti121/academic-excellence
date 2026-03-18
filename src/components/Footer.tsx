import Link from 'next/link'
import { MessageCircle, Hash, GraduationCap } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/923218344663?text=Hi%20ZeeTech%2C%20I%20need%20help%20with%20my%20university%20assignment!'
const DISCORD_URL = 'https://discord.com/users/zeetech_pro'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-extrabold text-base">ZeeTech</span>
                <span className="block text-[10px] text-slate-400">Academic Help</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Your trusted partner for university assignments, essays, projects, and dissertations — worldwide.
            </p>
            <div className="flex flex-col gap-2">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors">
                <MessageCircle className="w-4 h-4" /> +92 321 8344663
              </a>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-colors">
                <Hash className="w-4 h-4" /> zeetech_pro
              </a>
            </div>
          </div>

          {/* Universities */}
          <div>
            <h3 className="text-white font-semibold mb-4">Top Universities</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['MIT', '/university/mit'],
                ['Oxford', '/university/university-of-oxford'],
                ['Harvard', '/university/harvard-university'],
                ['Stanford', '/university/stanford-university'],
                ['Cambridge', '/university/university-of-cambridge'],
                ['University of Toronto', '/university/university-of-toronto'],
              ].map(([name, href]) => (
                <li key={name}><Link href={href} className="hover:text-white transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Subjects</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['Computer Science', 'computer-science'],
                ['Business & Management', 'business-management'],
                ['Law', 'law'],
                ['Economics', 'economics'],
                ['Accounting & Finance', 'accounting-finance'],
                ['Psychology', 'psychology'],
              ].map(([name, slug]) => (
                <li key={slug}><Link href={`/search?subject=${slug}`} className="hover:text-white transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-white font-semibold mb-4">Countries We Cover</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['🇬🇧 United Kingdom', 'UK'],
                ['🇺🇸 United States', 'USA'],
                ['🇨🇦 Canada', 'Canada'],
                ['🇦🇺 Australia', 'Australia'],
              ].map(([label, country]) => (
                <li key={country}><Link href={`/universities?country=${country}`} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/universities" className="hover:text-white transition-colors">All Universities</Link></li>
                <li><Link href="/subjects" className="hover:text-white transition-colors">All Subjects</Link></li>
                <li><Link href="/search" className="hover:text-white transition-colors">Search Courses</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} ZeeTech Academic Help. All rights reserved.</p>
          <p>Helping students worldwide complete their assignments.</p>
        </div>
      </div>
    </footer>
  )
}
