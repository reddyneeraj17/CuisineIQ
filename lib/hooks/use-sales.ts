"use client"

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getDailySales, createDailySales } from '@/lib/api/sales'
import type { DailySales, SalesByCategoryInput } from '@/lib/types/sales'

export function useDailySales() {
  const [dailySales, setDailySales] = useState<DailySales[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSales() {
      try {
        setLoading(true)
        const data = await getDailySales()
        setDailySales(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch sales data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [toast])

  const addDailySales = async (data: SalesByCategoryInput) => {
    try {
      await createDailySales(data)
      // Refresh data after adding new sales
      const updatedData = await getDailySales()
      setDailySales(updatedData)
      toast({
        title: "Success",
        description: "Sales data recorded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record sales data",
        variant: "destructive",
      })
      throw error
    }
  }

  return {
    dailySales,
    loading,
    addDailySales,
  }
}