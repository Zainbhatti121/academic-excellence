import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const SITE_NAME = 'Academic Excellence'

export function buildMeta(opts: {
  title: string
  description: string
  path: string
  ogImage?: string
}): Metadata {
  const { title, description, path, ogImage } = opts
  const url = `${SITE_URL}${path}`
  const image = ogImage || `${SITE_URL}/og-default.png`

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  }
}

export function universityJsonLd(university: {
  name: string
  slug: string
  description: string
  location: string
  website: string
  established: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: university.name,
    description: university.description,
    url: university.website || `${SITE_URL}/university/${university.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: university.location,
      addressCountry: 'GB',
    },
    foundingDate: university.established.toString(),
  }
}

export function courseJsonLd(course: {
  code: string
  title: string
  description: string
  level: string
  credits: number
  university: { name: string; slug: string }
  subject: { name: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${course.code} — ${course.title}`,
    description: course.description,
    educationalLevel: course.level,
    numberOfCredits: course.credits,
    about: course.subject.name,
    provider: {
      '@type': 'EducationalOrganization',
      name: course.university.name,
      url: `${SITE_URL}/university/${course.university.slug}`,
    },
    url: `${SITE_URL}/course/${course.code.toLowerCase()}`,
  }
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
