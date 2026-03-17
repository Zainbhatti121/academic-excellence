import Link from 'next/link'
import { GraduationCap, MapPin, BookOpen, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Academic<span className="text-blue-400">Excellence</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              The premier directory of UK universities and courses. Find your perfect academic path.
            </p>
          </div>

          {/* Universities */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              Top Universities
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ['University of Oxford', '/university/university-of-oxford'],
                ['University of Cambridge', '/university/university-of-cambridge'],
                ['Imperial College London', '/university/imperial-college-london'],
                ['University College London', '/university/university-college-london'],
                ['University of Edinburgh', '/university/university-of-edinburgh'],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-blue-400 transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Subjects
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ['Computer Science', '/search?subject=computer-science'],
                ['Law', '/search?subject=law'],
                ['Medicine', '/search?subject=medicine'],
                ['Engineering', '/search?subject=engineering'],
                ['Business & Management', '/search?subject=business-management'],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-blue-400 transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/universities" className="hover:text-blue-400 transition-colors">All Universities</Link></li>
              <li><Link href="/subjects" className="hover:text-blue-400 transition-colors">All Subjects</Link></li>
              <li><Link href="/search" className="hover:text-blue-400 transition-colors">Course Search</Link></li>
              <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Academic Excellence. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Focused exclusively on UK universities and courses.
          </p>
        </div>
      </div>
    </footer>
  )
}
