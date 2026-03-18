export interface University {
  id: number
  name: string
  slug: string
  description: string
  location: string
  country: string
  website: string
  established: number
  logoUrl: string
  ranking: number
  createdAt: Date
  updatedAt: Date
  _count?: {
    courses: number
  }
}

export interface Subject {
  id: number
  name: string
  slug: string
  _count?: {
    courses: number
  }
}

export interface Course {
  id: number
  code: string
  title: string
  description: string
  level: string
  credits: number
  outcomes: string
  createdAt: Date
  updatedAt: Date
  university: {
    id: number
    name: string
    slug: string
    location: string
  }
  subject: {
    id: number
    name: string
    slug: string
  }
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface SearchFilters {
  q?: string
  university?: string
  subject?: string
  country?: string
  page?: number
  pageSize?: number
}
