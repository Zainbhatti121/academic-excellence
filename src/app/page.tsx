export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { getFeaturedUniversities } from '@/lib/universities'
import { getFeaturedCourses } from '@/lib/courses'
import { getSubjects } from '@/lib/search'
import ContactCTA from '@/components/ContactCTA'
import { MessageCircle, Hash, CheckCircle2, Star, Clock, Shield, Globe, ChevronRight, PenTool, Code, FileText, PhoneCall, Rocket, ArrowRight } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/923218344663?text=Hi%20ZeeTech%2C%20I%20need%20help%20with%20my%20university%20assignment!'
const DISCORD_URL = 'https://discord.com/users/zeetech_pro'

export const revalidate = 3600

const COUNTRY_FLAG: Record<string, string> = {
  UK: '🇬🇧',
  USA: '🇺🇸',
  Canada: '🇨🇦',
  Australia: '🇦🇺',
}

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
  'nursing': '🩺',
  'accounting-finance': '💰',
  'marketing': '📣',
  'data-science': '🤖',
  'architecture': '🏗️',
}

export default async function HomePage() {
  const [subjects, universities, courses] = await Promise.all([
    getSubjects(),
    getFeaturedUniversities(8),
    getFeaturedCourses(6),
  ])

  return (
    <div className="pb-24">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Globe className="w-4 h-4 text-yellow-400" />
            Serving students in 🇬🇧 UK · 🇺🇸 USA · 🇨🇦 Canada · 🇦🇺 Australia & beyond
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Need Help With Your
            <span className="block text-yellow-400">University Assignment?</span>
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert freelancers ready to help you complete assignments, essays, final year projects, and dissertations across <strong className="text-white">500+ courses worldwide</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-lg rounded-2xl transition-all duration-200 shadow-xl hover:shadow-green-500/40 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us Now
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-bold text-lg rounded-2xl border border-white/30 transition-all duration-200 hover:scale-105"
            >
              <Hash className="w-5 h-5" />
              Chat on Discord
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: '500+', label: 'Courses Covered' },
              { value: '25+', label: 'Universities' },
              { value: '4', label: 'Countries' },
              { value: '24/7', label: 'Support' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-white">{value}</div>
                <div className="text-blue-300 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Shield, label: '100% Original', sub: 'Plagiarism-free work' },
            { icon: Clock, label: 'On-Time Delivery', sub: 'Never miss a deadline' },
            { icon: Star, label: 'Expert Writers', sub: 'Subject specialists' },
            { icon: CheckCircle2, label: 'Affordable', sub: 'Student-friendly prices' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-700/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-white font-semibold text-sm">{label}</div>
              <div className="text-slate-400 text-xs">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Core Services ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold mb-3 block tracking-wider uppercase text-sm">What We Do</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight">Our Core Services</h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">Expert academic assistance tailored to global students. Pick your required service below.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1: Assignments */}
            <Link href="/services/assignments" className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 relative z-10 text-white shadow-lg shadow-blue-600/30">
                <PenTool className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">University Assignments</h3>
              <p className="text-slate-600 mb-8 leading-relaxed relative z-10">
                Struggling with deadlines? Get custom, 100% plagiarism-free assignments written exactly to your marking rubric by subject specialists.
              </p>
              <div className="flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform relative z-10">
                Explore Assignments <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            {/* Service 2: FYP */}
            <Link href="/services/final-year-projects" className="group bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-900/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-900/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 rounded-2xl bg-purple-500 flex items-center justify-center mb-8 relative z-10 text-white shadow-lg shadow-purple-500/30">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Final Year Projects</h3>
              <p className="text-slate-400 mb-8 leading-relaxed relative z-10">
                Complete end-to-end development for Computer Science FYPs. From the initial code to the final working prototype and slides.
              </p>
              <div className="flex items-center text-purple-400 font-bold group-hover:translate-x-2 transition-transform relative z-10">
                View Project Help <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            {/* Service 3: Documentation */}
            <Link href="/services/documentation" className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mb-8 relative z-10 text-white shadow-lg shadow-emerald-500/30">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Project Documentation</h3>
              <p className="text-slate-600 mb-8 leading-relaxed relative z-10">
                Need SRS or UML diagrams? We provide university-grade technical documentation, architecture specs, and user manuals.
              </p>
              <div className="flex items-center text-emerald-600 font-bold group-hover:translate-x-2 transition-transform relative z-10">
                See Documentation <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Browse by Country ─────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Browse by Country</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {([['UK', 'United Kingdom'], ['USA', 'United States'], ['Canada', 'Canada'], ['Australia', 'Australia']] as [string, string][]).map(([country, label]) => (
              <Link
                key={country}
                href={`/universities?country=${country}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="text-5xl mb-3">{COUNTRY_FLAG[country]}</div>
                <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{label}</div>
                <div className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
                  View universities <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Browse by Subject</h2>
          <Link href="/subjects" className="text-blue-700 font-medium text-sm hover:underline flex items-center gap-1">All subjects <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {subjects.slice(0, 10).map((s) => (
            <Link
              key={s.id}
              href={`/search?subject=${s.slug}`}
              className="bg-white border border-slate-200 rounded-2xl p-5 text-center hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-2">{SUBJECT_ICONS[s.slug] || '📚'}</div>
              <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{s.name}</div>
              <div className="text-xs text-slate-400 mt-1">{s._count.courses} courses</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Courses ─────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Popular Assignment Courses</h2>
            <Link href="/search" className="text-blue-700 font-medium text-sm hover:underline flex items-center gap-1">All courses <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <Link key={course.id} href={`/course/${course.code.toLowerCase()}`} className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all group">
                <span className="inline-block bg-blue-700 text-white text-xs font-bold px-2.5 py-1 rounded font-mono mb-3">{course.code}</span>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors line-clamp-1">{course.title}</h3>
                <p className="text-slate-500 text-xs mb-3 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{course.university.name}</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Help Available</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Talk to an Expert ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
            <PhoneCall className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Talk to an Academic Expert</h2>
          <p className="text-blue-200 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Not sure what you need? Send us your brief and we will evaluate it for free. Our freelance consultants reply within minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-400 text-white font-bold text-lg rounded-full transition-all hover:scale-105 shadow-xl shadow-green-500/30"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp Now
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg rounded-full transition-all hover:scale-105"
            >
              <Hash className="w-6 h-6" />
              Add us on Discord
            </a>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <ContactCTA />
    </div>
  )
}
