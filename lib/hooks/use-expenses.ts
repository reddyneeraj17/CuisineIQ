"use client"

import { useState, useEffect } from 'react'
import { ExpenseData, ExpenseFormData } from '@/lib/types'
import { getExpenses, createExpense } from '@/lib/api/expenses'
import { useToast } from '@/components/ui/use-toast'

export function useExpenses() {
  const [expenses, setExpenses] = useState<ExpenseData[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  async function fetchExpenses() {
    try {
      setLoading(true)
      const data = await getExpenses()
      setExpenses(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch expenses',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function addExpense(data: ExpenseFormData) {
    try {
      setSubmitting(true)
      await createExpense(data)
      await fetchExpenses()
      toast({
        title: 'Success',
        description: 'Expense added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add expense',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  return { expenses, loading, submitting, addExpense }
}