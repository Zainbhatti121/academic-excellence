import Link from 'next/link'
import { MapPin, BookOpen, ExternalLink, Award } from 'lucide-react'

interface UniversityCardProps {
  name: string
  slug: string
  location: string
  description: string
  established: number
  ranking: number
  courseCount: number
}

export default function UniversityCard({
  name, slug, location, description, established, ranking, courseCount,
}: UniversityCardProps) {
  return (
    <Link href={`/university/${slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 relative overflow-hidden">
        {/* Rank badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full border border-blue-100">
          <Award className="w-3 h-3" />
          #{ranking}
        </div>

        {/* Logo placeholder */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-4 shadow-md group-hover:shadow-blue-200 transition-shadow">
          <span className="text-white font-bold text-xl">
            {name.split(' ').filter(w => w.length > 3).slice(0, 1)[0]?.[0] || name[0]}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{location}</span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{courseCount} courses</span>
          </div>
          <div className="text-slate-400 text-xs">
            Est. {established}
          </div>
          <div className="flex items-center gap-1 text-blue-600 text-xs font-medium group-hover:gap-2 transition-all">
            View <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  )
}
