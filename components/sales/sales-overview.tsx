"use client"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { category: "Appetizers", sales: 125000 },
  { category: "Main Course", sales: 450000 },
  { category: "Desserts", sales: 85000 },
  { category: "Beverages", sales: 95000 },
  { category: "Specials", sales: 175000 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <p className="font-medium">{label}</p>
        <p className="text-emerald-600">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export function SalesOverview() {
  return (
    <Card className="p-6 my-6">
      <h3 className="text-lg font-medium mb-4">Sales by Category</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis 
              dataKey="category"
              style={{ fill: 'hsl(var(--foreground))' }}
            />
            <YAxis 
              style={{ fill: 'hsl(var(--foreground))' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sales" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}