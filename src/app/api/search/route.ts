import { NextRequest, NextResponse } from 'next/server'
import { searchAll } from '@/lib/search'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    if (!q.trim()) {
      return NextResponse.json({ universities: [], courses: [] })
    }
    const result = await searchAll(q)
    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/search error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
