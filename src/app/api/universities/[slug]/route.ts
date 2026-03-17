import { NextRequest, NextResponse } from 'next/server'
import { getUniversity } from '@/lib/universities'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const university = await getUniversity(slug)
    if (!university) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(university)
  } catch (error) {
    console.error('GET /api/universities/[slug] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
