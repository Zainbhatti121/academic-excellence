import type { Metadata } from 'next'
import Link from 'next/link'
import { getSubjects } from '@/lib/search'
import Breadcrumb from '@/components/Breadcrumb'
import { buildMeta } from '@/lib/seo'
import { BookOpen } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return buildMeta({
    title: 'Academic Subjects',
    description: 'Browse UK university courses by subject area. Explore Computer Science, Law, Medicine, Engineering, Business, and more.',
    path: '/subjects',
  })
}

export const revalidate = 3600

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
}

const SUBJECT_DESCRIPTIONS: Record<string, string> = {
  'computer-science': 'Programming, AI, data structures, algorithms, software engineering and cybersecurity.',
  'law': 'Contract law, constitutional law, criminal law, international law, and legal theory.',
  'medicine': 'Clinical practice, pharmacology, anatomy, physiology, and medical sciences.',
  'engineering': 'Mechanical, electrical, structural, chemical, and civil engineering disciplines.',
  'business-management': 'Marketing, finance, strategy, entrepreneurship, and organisational behaviour.',
  'psychology': 'Cognitive, developmental, social, clinical, and neuropsychology.',
  'mathematics': 'Pure and applied mathematics, statistics, calculus, and number theory.',
  'physics': 'Classical mechanics, quantum physics, electromagnetism, and thermodynamics.',
  'economics': 'Microeconomics, macroeconomics, econometrics, and economic policy.',
  'history': 'British, European, and World history from ancient times to the modern era.',
}

export default async function SubjectsPage() {
  const subjects = await getSubjects()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: 'Subjects' }]} />

      <div className="mt-6 mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Academic Subjects</h1>
        </div>
        <p className="text-slate-500 text-lg">Browse UK university courses by discipline</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/search?subject=${subject.slug}`}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{SUBJECT_ICONS[subject.slug] || '📚'}</div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
                  {subject.name}
                </h2>
                <p className="text-xs text-slate-400">{subject._count.courses} course{subject._count.courses !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              {SUBJECT_DESCRIPTIONS[subject.slug] || `Explore ${subject.name} courses at top UK universities.`}
            </p>
            <div className="mt-4 text-xs font-medium text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
              Browse courses →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
