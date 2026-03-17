import { NextResponse } from 'next/server'
import { getSubjects } from '@/lib/search'

export async function GET() {
  try {
    const subjects = await getSubjects()
    return NextResponse.json(subjects)
  } catch (error) {
    console.error('GET /api/subjects error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
