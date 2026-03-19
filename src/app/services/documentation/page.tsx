import type { Metadata } from 'next'
import ContactCTA from '@/components/ContactCTA'
import Breadcrumb from '@/components/Breadcrumb'
import { MessageCircle, FileCode2, Layers, PenTool, LayoutTemplate, FileJson, FileText
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Project Documentation & Technical Writing | ZeeTech',
  description: 'Professional documentation services for computer science students. SRS, UML diagrams, architecture documents, and technical reports.',
  keywords: ['project documentation', 'SRS document', 'UML diagrams', 'technical writing', 'CS docs'],
}

const WHATSAPP_URL = 'https://wa.me/923218344663?text=Hi%20ZeeTech%2C%20I%20need%20help%20writing%20documentation%20for%20my%20project.'

export default function DocumentationPage() {
  return (
    <div className="pb-24">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Services', href: '#' }, { label: 'Documentation' }]} />
          
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Flawless <span className="text-blue-600">Technical Documentation.</span>
              </h1>
              <p className="text-slate-600 text-lg sm:text-xl mb-8 leading-relaxed">
                You built the code, we'll write the docs. Get professional, university-grade documentation including UML diagrams, SRS, architecture specs, and user manuals.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl transition-all shadow-lg hover:shadow-blue-600/30">
                <FileCode2 className="w-5 h-5" />
                Request Documentation
              </a>
            </div>
            
            {/* Visual Element */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3" />
              <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="h-8 bg-slate-100 rounded w-3/4 mb-6" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-5/6" />
                  </div>
                  <div className="flex gap-4 mt-8">
                    <div className="w-24 h-24 bg-blue-50 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-50 rounded w-full" />
                      <div className="h-3 bg-slate-50 rounded w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Document</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Software Requirement Specification (SRS)', icon: FileText, desc: 'Comprehensive functional and non-functional requirements, use cases, and system scope formatted to IEEE standards.' },
              { title: 'System Architecture & Diagrams', icon: Layers, desc: 'Professional UML diagrams including class, sequence, activity, ERD, and deployment diagrams using industry tools.' },
              { title: 'API Documentation', icon: FileJson, desc: 'Clean, developer-friendly Swagger/OpenAPI documentation for your backend endpoints, complete with request/response schemas.' },
              { title: 'UI/UX Design Specs', icon: LayoutTemplate, desc: 'Wireframes, user flows, and interface documentation to support frontend and mobile application projects.' },
            ].map((service, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ContactCTA />
    </div>
  )
}
