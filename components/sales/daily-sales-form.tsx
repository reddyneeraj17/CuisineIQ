"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SALES_CATEGORIES } from "@/lib/constants/categories"
import { useSalesStore } from "@/lib/store/sales"

export function DailySalesForm() {
  const { dailySales, setDailySales, submitSales } = useSalesStore()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitSales()
    } catch (error) {
      console.error('Failed to submit sales:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Enter Daily Sales</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {SALES_CATEGORIES.map((category) => (
          <div key={category} className="space-y-2">
            <label className="text-sm font-medium">{category}</label>
            <Input
              type="number"
              value={dailySales[category] || 0}
              onChange={(e) => setDailySales(category, Number(e.target.value))}
              placeholder={`Enter ${category} sales`}
              min="0"
              step="0.01"
            />
          </div>
        ))}
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? "Recording..." : "Record Sales"}
        </Button>
      </form>
    </Card>
  )
}