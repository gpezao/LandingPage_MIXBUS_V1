import { motion } from 'framer-motion'
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react'

const alerts = [
  { id: 1, text: 'Rigging: baseline +12% — revisión sugerida en 2h', tone: 'warn' },
  { id: 2, text: 'Sonido: dentro de parámetros', tone: 'ok' },
] as const

export function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,241,53,0.07),transparent_55%)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-mixbus-border bg-mixbus-surface/90 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_-12px_rgba(0,0,0,0.65)] backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-mixbus-border px-5 py-4">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-mixbus-muted">
            <Activity className="size-3.5 text-mixbus-muted" strokeWidth={1.5} />
            <span>Operación en vivo</span>
          </div>
          <span className="rounded-full border border-mixbus-border bg-mixbus-bg/90 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-mixbus-muted">
            Predictivo
          </span>
        </div>

        <div className="grid gap-6 p-6 sm:p-7">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-widest text-mixbus-muted">
              Risk Score
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-semibold tabular-nums tracking-tight text-mixbus-accent sm:text-6xl">
                23
              </span>
              <span className="text-sm text-mixbus-muted">/ 100</span>
            </div>
            <p className="mt-1 text-sm text-mixbus-muted">
              Bajo riesgo · tendencia{' '}
              <span className="text-mixbus-white/90">estable</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-widest text-mixbus-muted">
              Alertas proactivas
            </p>
            <ul className="space-y-2">
              {alerts.map((a) => (
                <li
                  key={a.id}
                  className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 text-sm leading-snug ${
                    a.tone === 'warn'
                      ? 'border-mixbus-warning/35 bg-mixbus-bg/70 text-mixbus-white/90'
                      : 'border-mixbus-border bg-mixbus-bg/50 text-mixbus-muted'
                  }`}
                >
                  {a.tone === 'warn' ? (
                    <AlertTriangle
                      className="mt-0.5 size-4 shrink-0 text-mixbus-warning"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <ShieldCheck
                      className="mt-0.5 size-4 shrink-0 text-mixbus-accent"
                      strokeWidth={1.5}
                    />
                  )}
                  {a.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-mixbus-border to-transparent" />

          <div className="flex items-center justify-between gap-4 text-xs text-mixbus-muted">
            <span>Última sincronización · hace 14s</span>
            <span className="rounded-md border border-mixbus-border bg-mixbus-bg/90 px-2 py-1 font-mono text-[10px] text-mixbus-muted">
              v2.4.1
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
