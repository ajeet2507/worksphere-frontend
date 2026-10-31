
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, UserRound } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import PasswordInput from '../components/PasswordInput'

type SignupErrors = Record<string, string>

function validatePassword(password: string) {
  if (password.length < 8) return 'Use at least 8 characters.'
  if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter.'
  if (!/[a-z]/.test(password)) return 'Include at least one lowercase letter.'
  if (!/[0-9]/.test(password)) return 'Include at least one number.'
  return ''
}

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<SignupErrors>({})
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    const nextErrors: SignupErrors = {}
    const normalizedName = name.trim()
    const normalizedEmail = email.trim()

    if (normalizedName.length < 2) {
      nextErrors.name = 'Enter your name (at least 2 characters).'
    }

    if (!normalizedEmail) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    const passwordError = validatePassword(password)
    if (passwordError) nextErrors.password = passwordError

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    if (!acceptedTerms) {
      nextErrors.terms = 'Please accept the terms to continue.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setMessage(
        `Form validation successful for ${normalizedName}. Connect the Spring Boot registration API to create your account.`,
      )
      console.info('Signup form validated', {
        name: normalizedName,
        email: normalizedEmail,
      })
    }
  }

  return (
    <AuthLayout page="signup">
      <div className="mb-7">
        <div className="mb-5 inline-flex rounded-xl bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700">
          Get started for free ✨
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Create your account
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Start organizing your projects and bringing your team together.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="signup-name" className="mb-2 block text-sm font-semibold text-slate-700">
            Full name
          </label>

          <div
            className={`flex items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:ring-4 ${
              errors.name
                ? 'border-red-400 focus-within:ring-red-100'
                : 'border-slate-200 focus-within:border-indigo-500 focus-within:ring-indigo-100'
            }`}
          >
            <UserRound size={18} className="shrink-0 text-slate-400" />
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setErrors((current) => ({ ...current, name: '' }))
              }}
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'signup-name-error' : undefined}
              className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {errors.name && (
            <p id="signup-name-error" role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-slate-700">
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
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setErrors((current) => ({ ...current, email: '' }))
              }}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
              className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {errors.email && (
            <p id="signup-email-error" role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <PasswordInput
          id="signup-password"
          label="Password"
          value={password}
          onChange={(value) => {
            setPassword(value)
            setErrors((current) => ({ ...current, password: '' }))
          }}
          placeholder="Create a strong password"
          autoComplete="new-password"
          error={errors.password}
        />

        <PasswordInput
          id="signup-confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value)
            setErrors((current) => ({ ...current, confirmPassword: '' }))
          }}
          placeholder="Enter your password again"
          autoComplete="new-password"
          error={errors.confirmPassword}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-slate-600">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked)
                setErrors((current) => ({ ...current, terms: '' }))
              }}
              aria-invalid={Boolean(errors.terms)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-indigo-600"
            />
            <span>
              I agree to the{' '}
              <a href="#terms" className="font-semibold text-indigo-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="font-semibold text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          {errors.terms && (
            <p role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.terms}
            </p>
          )}
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
          Create account <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
