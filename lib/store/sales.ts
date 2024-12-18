import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SALES_CATEGORIES } from '@/lib/constants/categories'

interface Sale {
  id: number
  category: string
  amount: number
  date: string
}

interface SalesState {
  dailySales: Record<string, number>
  salesHistory: Sale[]
  setDailySales: (category: string, amount: number) => void
  resetSales: () => void
  submitSales: () => void
}

export const useSalesStore = create<SalesState>()(
  persist(
    (set) => ({
      dailySales: SALES_CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: 0 }), {}),
      salesHistory: [],
      setDailySales: (category, amount) => 
        set((state) => ({
          dailySales: { ...state.dailySales, [category]: amount }
        })),
      resetSales: () => 
        set({ dailySales: SALES_CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: 0 }), {}) }),
      submitSales: () =>
        set((state) => {
          const newSales = Object.entries(state.dailySales).map(([category, amount]) => ({
            id: Date.now() + Math.random(),
            category,
            amount,
            date: new Date().toISOString()
          }))
          
          return {
            salesHistory: [...newSales, ...state.salesHistory],
            dailySales: SALES_CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
          }
        })
    }),
    {
      name: 'sales-storage'
    }
  )
)