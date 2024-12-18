import { NextResponse } from 'next/server'
import { createDailySales, getDailySales, getSalesStats } from '@/lib/api/sales'

export async function GET() {
  try {
    const sales = await getDailySales()
    return NextResponse.json(sales)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sales' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await createDailySales(data)
    return NextResponse.json({ message: 'Sales recorded successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record sales' }, { status: 500 })
  }
}