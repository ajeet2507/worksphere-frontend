
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import PasswordInput from '../components/PasswordInput'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    const nextErrors: Record<string, string> = {}
    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!password) {
      nextErrors.password = 'Password is required.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setMessage(
        `Form validation successful for ${normalizedEmail}. Connect the Spring Boot login API to authenticate.`,
      )
      console.info('Login form submitted', { email: normalizedEmail, remember })
    }
  }

  return (
    <AuthLayout page="login">
      <div className="mb-8">
        <div className="mb-5 inline-flex rounded-xl bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700">
          Welcome back 👋
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Sign in to your workspace
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Enter your details to pick up where you left off.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">
            Work email
          </label>

          <div
            className={`flex items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:ring-4 ${
              errors.email
                ? 'border-red-400 focus-within:ring-red-100'
                : 'border-slate-200 focus-within:border-indigo-500 focus-within:ring-indigo-100'
            }`}
          >
            <Mail size={18} className="shrink-0 text-slate-400" />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setErrors((current) => ({ ...current, email: '' }))
              }}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
              className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {errors.email && (
            <p id="login-email-error" role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <PasswordInput
          id="login-password"
          label="Password"
          value={password}
          onChange={(value) => {
            setPassword(value)
            setErrors((current) => ({ ...current, password: '' }))
          }}
          error={errors.password}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
            />
            Remember me
          </label>

          <button
            type="button"
            onClick={() => setMessage('Password reset will be available after we add the reset-password flow.')}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Forgot password?
          </button>
        </div>

        {message && (
          <p role="status" className="rounded-xl bg-indigo-50 p-3 text-sm leading-5 text-indigo-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
