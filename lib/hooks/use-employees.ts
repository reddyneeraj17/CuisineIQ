"use client"

import { useState, useEffect } from 'react'
import { EmployeeData } from '@/lib/types'
import { getEmployees, getEmployeeStats } from '@/lib/api/employees'
import { useToast } from '@/components/ui/use-toast'

export function useEmployees() {
  const [employees, setEmployees] = useState<EmployeeData[]>([])
  const [stats, setStats] = useState({
    totalEmployees: 0,
    averageSalary: 0,
    activeShifts: 0,
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  async function fetchData() {
    try {
      setLoading(true)
      const [employeesData, statsData] = await Promise.all([
        getEmployees(),
        getEmployeeStats(),
      ])
      setEmployees(employeesData)
      setStats(statsData)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch employee data',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { employees, stats, loading, refetch: fetchData }
}