"use client"

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getInventoryItems } from '@/lib/api/inventory'
import type { InventoryItem } from '@/lib/types/inventory'

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true)
        const data = await getInventoryItems()
        setItems(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch inventory items",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [toast])

  return { items, loading }
}