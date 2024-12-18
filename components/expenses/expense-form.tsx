"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { EXPENSE_CATEGORIES } from "@/lib/constants/categories"

const expenseOptions = EXPENSE_CATEGORIES.map(category => ({
  value: category,
  label: category
}))

export function ExpenseForm() {
  const [loading, setLoading] = useState(false)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Add Expense</h3>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input type="number" placeholder="Enter amount" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            options={expenseOptions}
            placeholder="Select category"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter description"
          />
        </div>
        <Button className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </Button>
      </form>
    </Card>
  )
}