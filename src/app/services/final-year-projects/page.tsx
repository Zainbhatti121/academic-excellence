import type { Metadata } from 'next'
import ContactCTA from '@/components/ContactCTA'
import Breadcrumb from '@/components/Breadcrumb'
import { MessageCircle, Code, Briefcase, FileText, CheckCircle2, Monitor, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Final Year Projects & FYP Help | ZeeTech',
  description: 'Complete Final Year Project (FYP) assistance for Computer Science and Business students. Get expert development, coding, and write-up support.',
  keywords: ['final year project', 'FYP help', 'computer science project', 'capstone project'],
}

const WHATSAPP_URL = 'https://wa.me/923218344663?text=Hi%20ZeeTech%2C%20I%20am%20looking%20for%20help%20with%20my%20Final%20Year%20Project%20(FYP)!'

export default function FypPage() {
  return (
    <div className="pb-24">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl shadow-2xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl shadow-2xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Services', href: '#' }, { label: 'Final Year Projects' }]} />
          
          <div className="mt-10 lg:w-2/3">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg">
              End-to-End Capstone Support
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
              Aced Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Final Year Project.</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl mb-10 leading-relaxed font-light">
              From the initial proposal to the final working prototype and dissertation. We design, code, and document complete Final Year Projects (FYPs) for CS and Engineering students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold text-lg rounded-2xl transition-all hover:bg-slate-100 hover:scale-105 shadow-xl">
                <Rocket className="w-5 h-5 text-blue-600" />
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Features ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything You Need for a Perfect Grade</h2>
            <p className="text-slate-500 text-lg">We handle the technical complexity so you can focus on presenting.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: 'Development', desc: 'Full-stack web apps, mobile apps, AI/ML models, and system architecture built from scratch.' },
              { icon: FileText, title: 'Documentation', desc: 'SRS, Design Docs, UML Diagrams, and the final dissertation written to academic standards.' },
              { icon: Briefcase, title: 'Project Management', desc: 'Agile sprints, Gantt charts, and regular updates to show your supervisor steady progress.' },
              { icon: Monitor, title: 'Presentation Prep', desc: 'Slide decks, demo videos, and viva preparation Q&A to help you defend your project confidently.' }
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5 group-hover:bg-purple-600 transition-colors">
                  <f.icon className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Have a Project Idea? Let's Build It.</h2>
          <p className="text-slate-600 text-lg mb-10">
            Share your university guidelines or project proposal. We'll evaluate the technical feasibility and provide a comprehensive timeline and quote.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-lg rounded-2xl transition-all hover:scale-105 shadow-xl shadow-green-500/20">
            <MessageCircle className="w-5 h-5" /> Talk to a Developer on WhatsApp
          </a>
        </div>
      </section>

      <ContactCTA />
    </div>
  )
}
