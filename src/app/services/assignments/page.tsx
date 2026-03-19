import type { Metadata } from 'next'
import Link from 'next/link'
import ContactCTA from '@/components/ContactCTA'
import Breadcrumb from '@/components/Breadcrumb'
import { MessageCircle, CheckCircle2, Shield, Clock, BookOpen, GraduationCap, ChevronRight, Hash } from 'lucide-react'

export const metadata: Metadata = {
  title: 'University Assignment Help — Expert Assistance | ZeeTech',
  description: 'Struggling with your university assignments? Get expert help from ZeeTech Academic Help. High-quality, plagiarism-free assignments delivered on time.',
  keywords: ['assignment help', 'university assignments', 'coursework help', 'essay writing service'],
}

const WHATSAPP_URL = 'https://wa.me/923218344663?text=Hi%20ZeeTech%2C%20I%20need%20help%20with%20my%20university%20assignment!'
const DISCORD_URL = 'https://discord.com/users/zeetech_pro'

export default function AssignmentsPage() {
  return (
    <div className="pb-24">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Services', href: '#' }, { label: 'University Assignments' }]} />
          
          <div className="mt-10 max-w-3xl">
            <span className="inline-block bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-bold px-3 py-1 rounded-full mb-4">
              Premium Academic Assistance
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Expert <span className="text-yellow-400">Assignment Help</span> For University Students
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl mb-10 leading-relaxed">
              Don't let tight deadlines ruin your grades. Our team of subject experts provides custom, plagiarism-free assignments tailored perfectly to your university's rubric. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-lg rounded-2xl transition-all hover:scale-105 shadow-xl hover:shadow-green-500/40">
                <MessageCircle className="w-5 h-5" />
                Discuss Your Assignment
              </a>
              <Link href="/search" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg rounded-2xl transition-all">
                Search Your Course Code <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose ZeeTech For Assignments?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">We understand exactly what professors are looking for.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: '100% Original Content', desc: 'Every assignment is written from scratch specifically for your prompt. Zero plagiarism, guaranteed.' },
              { icon: Clock, title: 'Lightning Fast Turnaround', desc: 'Got a deadline tomorrow? We offer rush services to ensure you submit on time, every time.' },
              { icon: GraduationCap, title: 'Subject Experts', desc: 'Your work is handled by experienced freelancers with specific degrees in your field of study.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Types of Assignments ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-20 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">What We Can Do</h2>
                <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                  Whether you're in your first year or finishing your masters, we cover all formats and disciplines.
                </p>
                <ul className="space-y-4">
                  {['Essays & Research Papers', 'Case Study Analysis', 'Programming Assignments (Java, C++, Python)', 'Lab Reports & Technical Writing', 'Data Analysis (SPSS, Excel, SQL)', 'Dissertation Chapters'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900 p-12 lg:p-20 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <BookOpen className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Start Your Assignment</h3>
                <p className="text-slate-400 mb-8">Send us your university prompt and grading rubric. We'll give you a free, instant quote.</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-500 max-w-sm hover:bg-green-400 text-white font-bold rounded-2xl transition-all">
                  <MessageCircle className="w-5 h-5" /> Send Prompt on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  )
}
