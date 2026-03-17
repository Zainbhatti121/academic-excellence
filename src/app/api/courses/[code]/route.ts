import { NextRequest, NextResponse } from 'next/server'
import { getCourse } from '@/lib/courses'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const course = await getCourse(code)
    if (!course) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(course)
  } catch (error) {
    console.error('GET /api/courses/[code] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
