import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Activity, Play } from 'lucide-react'

const FEED_MESSAGES = [
  'IA: Detectado cambio en Rider técnico... Actualizando Checklist.',
  'IA: Riesgo meteorológico en aumento... Sugiriendo refuerzo de carpas.',
  'IA: Proveedor A acreditado exitosamente.',
  'IA: Analizando cumplimiento de normativa local...',
] as const

type FeedItem = { id: number; text: string }

export function SeniorCopilotSection() {
  const reduce = useReducedMotion()
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const seq = useRef(0)

  useEffect(() => {
    const pushNext = () => {
      const text = FEED_MESSAGES[seq.current % FEED_MESSAGES.length]
      seq.current += 1
      setFeedItems((prev) => {
        const next = [...prev, { id: Date.now(), text }]
        return next.slice(-4)
      })
    }

    pushNext()
    const id = window.setInterval(pushNext, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="relative overflow-hidden border-y border-mixbus-border/80 bg-mixbus-bg px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
      aria-labelledby="senior-copilot-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(200,241,53,0.04),transparent)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Columna narrativa */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex rounded-full border border-mixbus-accent/35 bg-mixbus-surface/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-mixbus-accent sm:text-[11px]"
          >
            20 AÑOS DE EXPERIENCIA 
          </motion.p>

          <motion.h2
            id="senior-copilot-heading"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-mixbus-white sm:text-4xl lg:text-[2.25rem] lg:leading-[1.15]"
          >
            Tu Copiloto Senior, disponible 24/7.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-mixbus-muted sm:text-lg"
          >
            MIXBUS no espera instrucciones. Supervisa, analiza y actúa. Es la inteligencia acumulada de
            décadas de producción en vivo, trabajando en tiempo real para tu próximo evento.
          </motion.p>

          {/* Live feed */}
          <div className="mt-10">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-mixbus-muted">
              <Activity className="size-3.5 text-mixbus-accent" strokeWidth={1.5} aria-hidden />
              Live feed · IA operativa
            </div>
            <div className="relative overflow-hidden rounded-xl border border-mixbus-border bg-mixbus-surface/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-mixbus-surface to-transparent opacity-90" />
              <ul className="relative flex min-h-[7.5rem] flex-col justify-end gap-2.5">
                <AnimatePresence initial={false} mode="popLayout">
                  {feedItems.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={
                        reduce
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: -14, filter: 'blur(4px)' }
                      }
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 28,
                        opacity: { duration: 0.25 },
                      }}
                      className="rounded-lg border border-mixbus-border/80 bg-mixbus-bg/80 px-3 py-2.5 text-[13px] leading-snug text-mixbus-white/90 shadow-sm sm:text-sm"
                    >
                      <span className="font-medium text-mixbus-accent/95">● </span>
                      {item.text}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>

        {/* Video showcase */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          animate={
            reduce
              ? {}
              : {
                  y: [0, -10, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl p-[1px] shadow-[0_0_60px_-12px_rgba(200,241,53,0.35),0_24px_80px_-24px_rgba(0,0,0,0.8)]"
            style={{
              background:
                'linear-gradient(135deg, rgba(200,241,53,0.45), rgba(200,241,53,0.08), rgba(200,241,53,0.25))',
            }}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-mixbus-black">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,241,53,0.12),transparent_55%)]"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
                <motion.div
                  whileHover={reduce ? {} : { scale: 1.06 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                  className="flex size-16 items-center justify-center rounded-full border border-mixbus-accent/40 bg-mixbus-surface/90 text-mixbus-accent shadow-[0_0_40px_-6px_rgba(200,241,53,0.55)] sm:size-[4.5rem]"
                  aria-hidden
                >
                  <Play className="ml-0.5 size-7 sm:size-8" strokeWidth={1.35} fill="currentColor" />
                </motion.div>
                <p className="max-w-sm text-sm font-medium leading-snug text-mixbus-white/95 sm:text-base">
                  Ver IA en Acción: Proactividad MIXBUS
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
