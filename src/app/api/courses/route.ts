import { NextRequest, NextResponse } from 'next/server'
import { getCourses } from '@/lib/courses'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '12')
    const q = searchParams.get('q') || undefined
    const subject = searchParams.get('subject') || undefined
    const university = searchParams.get('university') || undefined

    const result = await getCourses({ page, pageSize, q, subject, university })
    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/courses error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
