"use client"

import { useState, useEffect } from 'react'
import { DailySales, SalesStats } from '@/lib/types/sales'
import { useSalesStore } from '@/lib/store/sales'

export function useSalesData() {
  const { salesHistory } = useSalesStore()
  const [stats, setStats] = useState<SalesStats>({
    totalSales: 0,
    bestCategory: { name: 'N/A', amount: 0 },
    averageOrder: 0
  })

  useEffect(() => {
    const today = new Date()
    const todaySales = salesHistory.filter(sale => {
      const saleDate = new Date(sale.date)
      return saleDate.toDateString() === today.toDateString()
    })

    const totalSales = todaySales.reduce((sum, sale) => sum + sale.amount, 0)
    
    const categoryTotals = todaySales.reduce((acc, sale) => {
      acc[sale.category] = (acc[sale.category] || 0) + sale.amount
      return acc
    }, {} as Record<string, number>)

    const bestCategory = Object.entries(categoryTotals).reduce((best, [category, amount]) => {
      if (!best || amount > best.amount) {
        return { name: category, amount }
      }
      return best
    }, { name: 'N/A', amount: 0 })

    const averageOrder = todaySales.length ? totalSales / todaySales.length : 0

    setStats({ totalSales, bestCategory, averageOrder })
  }, [salesHistory])

  return { stats, salesHistory }
}