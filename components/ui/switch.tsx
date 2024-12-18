"use client"

import * as React from "react"

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export function Switch({ checked = false, onCheckedChange, disabled = false }: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 
        focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
        ${checked ? 'bg-primary' : 'bg-input'}
      `}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className={`
          pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 
          transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  )
}