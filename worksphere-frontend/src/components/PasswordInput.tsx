
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useState } from 'react'

type PasswordInputProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  autoComplete?: string
}

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder = 'Enter your password',
  error,
  autoComplete = 'current-password',
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div
        className={`flex items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:ring-4 ${
          error
            ? 'border-red-400 focus-within:ring-red-100'
            : 'border-slate-200 focus-within:border-indigo-500 focus-within:ring-indigo-100'
        }`}
      >
        <LockKeyhole size={18} className="shrink-0 text-slate-400" />

        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="shrink-0 rounded-md p-1 text-slate-400 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-indigo-600"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
