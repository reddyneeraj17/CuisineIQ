"use client"

import { Card } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { useSalesStore } from "@/lib/store/sales"

export function DailySalesList() {
  const { salesHistory } = useSalesStore()

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Recent Sales Entries</h3>
      <div className="space-y-4">
        {salesHistory.map((sale) => (
          <div 
            key={sale.id} 
            className="flex items-center justify-between border-b pb-4 last:border-0"
          >
            <div>
              <p className="font-medium">{sale.category}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(sale.date)}
              </p>
            </div>
            <p className="font-medium">
              {formatCurrency(sale.amount)}
            </p>
          </div>
        ))}
        {salesHistory.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            No sales entries yet
          </p>
        )}
      </div>
    </Card>
  )
}