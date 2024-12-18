import { NextResponse } from 'next/server'
import { getSalesStats } from '@/lib/api/sales'

export async function GET() {
  try {
    const stats = await getSalesStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to fetch sales stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sales statistics' }, 
      { status: 500 }
    )
  }
}