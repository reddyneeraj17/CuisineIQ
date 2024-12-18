"use client"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { useSalesData } from "@/lib/hooks/use-sales-data"

export function DailySalesStats() {
  const { stats } = useSalesData()

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Today's Sales</h3>
        <p className="text-2xl font-bold mt-2">{formatCurrency(stats.totalSales)}</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Best Performing Category</h3>
        <p className="text-2xl font-bold mt-2">{stats.bestCategory.name}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {formatCurrency(stats.bestCategory.amount)}
        </p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Average Order Value</h3>
        <p className="text-2xl font-bold mt-2">{formatCurrency(stats.averageOrder)}</p>
      </Card>
    </div>
  )
}