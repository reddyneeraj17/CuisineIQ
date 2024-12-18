"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { EMPLOYEE_ROLES } from "@/lib/constants/categories"

const roleOptions = EMPLOYEE_ROLES.map(role => ({
  value: role,
  label: role
}))

export function EmployeeForm() {
  const [loading, setLoading] = useState(false)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Add Employee</h3>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input placeholder="Enter employee name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <Select
            options={roleOptions}
            placeholder="Select role"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Salary</label>
          <Input type="number" placeholder="Enter monthly salary" />
        </div>
        <Button className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </Button>
      </form>
    </Card>
  )
}