import { NextRequest, NextResponse } from 'next/server'
import { getUniversities } from '@/lib/universities'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '12')
    const q = searchParams.get('q') || undefined

    const result = await getUniversities({ page, pageSize, q })
    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/universities error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
