"use client"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { format } from "date-fns"

const expenses = [
  {
    id: 1,
    amount: 25000,
    category: "INGREDIENTS",
    description: "Weekly grocery supply",
    date: new Date(),
  },
  {
    id: 2,
    amount: 15000,
    category: "UTILITIES",
    description: "Electricity bill",
    date: new Date(),
  },
  // Add more sample data
]

export function ExpenseList() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Recent Expenses</h3>
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between border-b pb-4 last:border-0">
            <div>
              <p className="font-medium">{formatCurrency(expense.amount)}</p>
              <p className="text-sm text-muted-foreground">{expense.category}</p>
              <p className="text-sm text-muted-foreground">{expense.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {format(expense.date, "MMM d, yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}