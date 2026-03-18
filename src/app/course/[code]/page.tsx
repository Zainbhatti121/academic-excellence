import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCourse, getRelatedCourses } from '@/lib/courses'
import { getAllCourseCodes } from '@/lib/courses'
import Breadcrumb from '@/components/Breadcrumb'
import CourseCard from '@/components/CourseCard'
import ContactCTA from '@/components/ContactCTA'
import { MessageCircle, Hash, BookOpen, Building2, GraduationCap, CheckCircle2, Star, Clock, Shield } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/923218344663?text=Hi%20ZeeTech%2C%20I%20need%20help%20with%20my%20'
const DISCORD_URL = 'https://discord.com/users/zeetech_pro'

interface PageProps {
  params: Promise<{ code: string }>
}

export async function generateStaticParams() {
  const codes = await getAllCourseCodes()
  return codes.map((code) => ({ code: code.toLowerCase() }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params
  const course = await getCourse(code.toUpperCase())
  if (!course) return { title: 'Course Not Found' }

  const title = `${course.code} Assignment Help — ${course.title} | ZeeTech`
  const description = `Struggling with ${course.code} (${course.title}) at ${course.university.name}? Get expert assignment help from ZeeTech. Fast, original, and reliable academic assistance. Contact via WhatsApp or Discord.`

  return {
    title,
    description,
    keywords: [
      `${course.code} assignment help`,
      `${course.code} homework help`,
      `${course.title} assignment`,
      `${course.university.name} assignments`,
      `${course.subject.name} assignment help`,
      'university assignment help',
      'final year project help',
      'ZeeTech academic help',
    ],
    openGraph: { title, description, type: 'website' },
  }
}

export const revalidate = 3600

export default async function CourseDetailPage({ params }: PageProps) {
  const { code } = await params
  const course = await getCourse(code.toUpperCase())
  if (!course) notFound()

  const related = await getRelatedCourses(course.code, course.subjectId, 3)
  const outcomes = course.outcomes ? course.outcomes.split('|') : []
  const waUrl = `${WHATSAPP_URL}${encodeURIComponent(course.code)}%20assignment!`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: course.title,
            courseCode: course.code,
            description: course.description,
            keywords: `${course.code} assignment help, ${course.title} help, ${course.subject.name} assignment`,
            provider: {
              '@type': 'CollegeOrUniversity',
              name: course.university.name,
            },
          }),
        }}
      />

      <Breadcrumb
        items={[
          { label: 'Universities', href: '/universities' },
          { label: course.university.name, href: `/university/${course.university.slug}` },
          { label: course.code },
        ]}
      />

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="mt-6 mb-8 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 font-mono tracking-wider">
              {course.code}
            </span>
            <h1 className="text-3xl font-extrabold mb-2 leading-tight">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm mb-4">
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{course.university.name}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{course.subject.name}</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" />{course.level}</span>
            </div>
            <p className="text-blue-100 text-base leading-relaxed max-w-2xl">{course.description}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-green-500 hover:bg-green-400 text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-lg hover:shadow-green-400/40 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Get Help on WhatsApp
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold text-base rounded-2xl border border-white/30 transition-all duration-200 hover:scale-105"
          >
            <Hash className="w-5 h-5" />
            Chat on Discord
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Main Content ────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">

          {/* How We Can Help */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7">
            <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              How We Can Help with {course.code}
            </h2>
            <p className="text-slate-600 mb-5 leading-relaxed">
              At <strong>ZeeTech Academic Help</strong>, we have a team of expert writers and subject specialists who are familiar with <strong>{course.title}</strong> at <strong>{course.university.name}</strong>. Whether you need a complete assignment written, editing support, or guidance on exam preparation, we are here to help!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Assignments & Coursework',
                'Essays & Reports',
                'Final Year Projects',
                'Dissertations & Theses',
                'Case Study Analysis',
                'Lab Reports',
                'Exam Preparation',
                'Literature Reviews',
              ].map((service) => (
                <div key={service} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          {outcomes.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-7">
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-700" />
                What We Cover in {course.code}
              </h2>
              <ul className="space-y-3">
                {outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-slate-700 text-sm leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Courses */}
          {related.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">More {course.subject.name} Assignments We Help With</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <CourseCard
                    key={r.id}
                    code={r.code}
                    title={r.title}
                    description={r.description}
                    level={r.level}
                    credits={r.credits}
                    universityName={r.university.name}
                    universitySlug={r.university.slug}
                    subjectName={r.subject.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-1">Get Assignment Help</h3>
            <p className="text-slate-500 text-sm mb-5">Contact us now for fast, reliable assistance with {course.code}.</p>
            <div className="space-y-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: +92 321 8344663
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
              >
                <Hash className="w-4 h-4" />
                Discord: zeetech_pro
              </a>
            </div>
          </div>

          {/* Why Us */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Why ZeeTech?</h3>
            <ul className="space-y-3">
              {[
                { icon: Shield, text: '100% Original Work', detail: 'Plagiarism-free, written from scratch' },
                { icon: Clock, text: 'Fast Turnaround', detail: 'Delivered on your deadline, guaranteed' },
                { icon: Star, text: 'Expert Writers', detail: 'Subject specialists for every course' },
                { icon: CheckCircle2, text: 'Affordable Prices', detail: 'Competitive rates for students worldwide' },
              ].map(({ icon: Icon, text, detail }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{text}</p>
                    <p className="text-xs text-slate-500">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* University Quick Facts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Course Info</h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Code</dt><dd className="font-mono font-bold text-blue-700">{course.code}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Level</dt><dd className="font-medium text-slate-700">{course.level}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Subject</dt><dd className="font-medium text-slate-700">{course.subject.name}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">University</dt>
                <dd className="font-medium text-slate-700 text-right max-w-[140px] truncate">
                  <Link href={`/university/${course.university.slug}`} className="hover:text-blue-700 transition-colors">{course.university.name}</Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Sticky CTA bar */}
      <ContactCTA />
    </div>
  )
}
