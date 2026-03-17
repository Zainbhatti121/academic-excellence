import Link from 'next/link'
import { Building2, BookOpen, Award } from 'lucide-react'

const LEVEL_COLORS: Record<string, string> = {
  Undergraduate: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Postgraduate: 'bg-purple-50 text-purple-700 border-purple-200',
  Doctoral: 'bg-orange-50 text-orange-700 border-orange-200',
}

interface CourseCardProps {
  code: string
  title: string
  description: string
  level: string
  credits: number
  universityName: string
  universitySlug: string
  subjectName: string
}

export default function CourseCard({
  code, title, description, level, credits, universityName, universitySlug, subjectName,
}: CourseCardProps) {
  return (
    <Link href={`/course/${code.toLowerCase()}`} className="group block">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-blue-700 text-white text-xs font-bold px-2.5 py-1 rounded-lg font-mono tracking-wide">
              {code}
            </span>
            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${LEVEL_COLORS[level] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
              {level}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
            <Award className="w-3 h-3" />
            {credits} credits
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Building2 className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-medium truncate">
              {universityName}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{subjectName}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
