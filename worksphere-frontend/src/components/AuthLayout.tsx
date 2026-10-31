
import type { ReactNode } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

type AuthLayoutProps = {
  children: ReactNode
  page: 'login' | 'signup'
}

const features = [
  'Keep every project organized',
  'Collaborate with your team',
  'Track progress in one place',
]

export default function AuthLayout({ children, page }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-14">
        <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
            <Layers3 size={23} />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Work<span className="text-indigo-400">Sphere</span>
          </span>
        </div>

        <div className="relative z-10 max-w-xl py-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-200">
            <Sparkles size={16} />
            Your workspace, reimagined
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Great work happens when
            <span className="text-indigo-400"> everything connects.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
            Bring your projects, people, and priorities together in one
            beautifully organized workspace.
          </p>

          <div className="mt-9 space-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 size={19} className="shrink-0 text-emerald-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid max-w-md grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <Users size={21} className="mb-4 text-indigo-300" />
              <p className="text-2xl font-bold">One team</p>
              <p className="mt-1 text-sm text-slate-400">One shared workspace</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <ShieldCheck size={21} className="mb-4 text-emerald-300" />
              <p className="text-2xl font-bold">Less chaos</p>
              <p className="mt-1 text-sm text-slate-400">More focused work</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} WorkSphere</span>
          <span className="flex items-center gap-1">
            Built for better teamwork <ArrowUpRight size={14} />
          </span>
        </div>
      </aside>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-12 xl:px-20">
        <header className="mb-10 flex items-center justify-between lg:justify-end">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Layers3 size={20} />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Work<span className="text-indigo-600">Sphere</span>
            </span>
          </div>

          <span className="text-sm text-slate-500">
            {page === 'login' ? 'New to WorkSphere?' : 'Already have an account?'}
          </span>
        </header>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center pb-8">
          {children}
        </div>

        <footer className="pt-8 text-center text-xs leading-5 text-slate-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          <div className="mt-1 lg:hidden">© {new Date().getFullYear()} WorkSphere</div>
        </footer>
      </section>
    </main>
  )
}
