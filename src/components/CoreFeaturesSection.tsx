import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Brain,
  Building2,
  ClipboardCheck,
  Cpu,
  Database,
  Gauge,
  Radio,
  Shield,
  Users,
} from 'lucide-react'

/** IDs de todas las tarjetas conectables al Cerebro Central */
export type CoreCardId =
  | 'venue'
  | 'producer'
  | 'supplier'
  | 'ia'
  | 'risk'
  | 'intel'
  | 'memory'

const TERMINAL_TICK_MS = 3000

const TERMINAL_CYCLE = [
  'Analizando baseline histórico...',
  'Calculando Risk Score del recinto...',
  'Verificando cumplimiento de proveedor...',
  'Sincronizando memoria institucional...',
  'Evaluando desviaciones operativas...',
] as const

const FEED_BY_CARD: Record<CoreCardId, string> = {
  venue:
    '→ Inyectando telemetría de recinto y control de accesos en tiempo real.',
  producer:
    '→ Orquestando riesgo operativo y línea de tiempo maestra 24/7.',
  supplier:
    '→ Consolidando evidencias y scoring de cumplimiento del proveedor.',
  ia: '→ Generando requerimientos y alertas ante desviación del baseline.',
  risk: '→ Actualizando motor de Risk Score y umbrales dinámicos.',
  intel: '→ Aplicando modelo de scoring sobre histórico de cumplimiento.',
  memory: '→ Escribiendo patrones en memoria institucional predictiva.',
}

const FEATURES: {
  id: Exclude<CoreCardId, 'venue' | 'producer' | 'supplier'>
  title: string
  description: string
  icon: typeof Cpu
}[] = [
  {
    id: 'ia',
    title: 'IA Proactiva',
    description: 'Alerta si el avance se desvía del baseline operativo.',
    icon: Cpu,
  },
  {
    id: 'risk',
    title: 'Risk Score Dinámico',
    description: 'Motor en tiempo real que previene crisis operativas.',
    icon: Gauge,
  },
  {
    id: 'intel',
    title: 'Inteligencia Proveedores',
    description: 'Scoring algorítmico según cumplimiento real.',
    icon: Users,
  },
  {
    id: 'memory',
    title: 'Memoria Institucional',
    description: 'Aprende de cada operación para modelar eventos futuros.',
    icon: Database,
  },
]

const ACTORS: {
  id: Extract<CoreCardId, 'venue' | 'producer' | 'supplier'>
  title: string
  subtitle: string
  status: string
  icon: typeof Building2
}[] = [
  {
    id: 'venue',
    title: 'Venue',
    subtitle: 'El Guardián',
    status: 'Supervisión Macro Activa',
    icon: Building2,
  },
  {
    id: 'producer',
    title: 'Productora',
    subtitle: 'El Orquestador',
    status: 'Monitoreo de Riesgo 24/7',
    icon: Radio,
  },
  {
    id: 'supplier',
    title: 'Proveedor',
    subtitle: 'El Ejecutor',
    status: 'Portal de Evidencias Unificado',
    icon: ClipboardCheck,
  },
]

function useTerminalLine(hoveredCard: CoreCardId | null, reduce: boolean | null) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduce || hoveredCard) return
    const id = window.setInterval(() => setTick((t) => t + 1), TERMINAL_TICK_MS)
    return () => clearInterval(id)
  }, [reduce, hoveredCard])

  const line = useMemo(() => {
    if (hoveredCard) return FEED_BY_CARD[hoveredCard]
    return TERMINAL_CYCLE[tick % TERMINAL_CYCLE.length]
  }, [hoveredCard, tick])

  return line
}

function ConnectionOverlay({
  wrapRef,
  brainRef,
  cardRefs,
  activeId,
}: {
  wrapRef: React.RefObject<HTMLDivElement | null>
  brainRef: React.RefObject<HTMLDivElement | null>
  cardRefs: React.MutableRefObject<Partial<Record<CoreCardId, HTMLElement | null>>>
  activeId: CoreCardId | null
}) {
  const gradId = useId().replace(/:/g, '')
  const filtId = useId().replace(/:/g, '')
  const [geom, setGeom] = useState<{
    sx: number
    sy: number
    ex: number
    ey: number
    w: number
    h: number
  } | null>(null)

  const update = useCallback(() => {
    const wrap = wrapRef.current
    const brain = brainRef.current
    if (!wrap || !brain || !activeId) {
      setGeom(null)
      return
    }
    const target = cardRefs.current[activeId]
    if (!target) {
      setGeom(null)
      return
    }
    const wr = wrap.getBoundingClientRect()
    const br = brain.getBoundingClientRect()
    const tr = target.getBoundingClientRect()
    const sx = br.left + br.width / 2 - wr.left
    const sy = br.top + br.height / 2 - wr.top
    const ex = tr.left + tr.width / 2 - wr.left
    const ey = tr.top + tr.height / 2 - wr.top
    setGeom({ sx, sy, ex, ey, w: wr.width, h: wr.height })
  }, [activeId, brainRef, cardRefs, wrapRef])

  useEffect(() => {
    update()
    const ro = new ResizeObserver(() => update())
    if (wrapRef.current) ro.observe(wrapRef.current)
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [update, wrapRef])

  if (!geom || !activeId) return null

  const { sx, sy, ex, ey, w, h } = geom
  const mx = (sx + ex) / 2
  const my = (sy + ey) / 2 - Math.abs(ex - sx) * 0.08
  const d = `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[5] hidden overflow-visible md:block"
      width={w}
      height={h}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c8f135" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#d4f04a" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#c8f135" stopOpacity="0.12" />
        </linearGradient>
        <filter id={filtId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={2.25}
        strokeLinecap="round"
        filter={`url(#${filtId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ pathLength: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      />
      <motion.circle
        cx={ex}
        cy={ey}
        r={4}
        fill="#c8f135"
        initial={{ opacity: 0.3, scale: 0.8 }}
        animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export function CoreFeaturesSection() {
  const reduce = useReducedMotion()
  const [hoveredCard, setHoveredCard] = useState<CoreCardId | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const brainRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Partial<Record<CoreCardId, HTMLElement | null>>>({})
  const terminalLine = useTerminalLine(hoveredCard, reduce)

  const setCardRef = (id: CoreCardId) => (el: HTMLElement | null) => {
    cardRefs.current[id] = el
  }

  const brainStatus = hoveredCard
    ? FEED_BY_CARD[hoveredCard]
    : 'Hub de inteligencia · escuchando la operación en vivo'

  return (
    <section
      id="producto"
      className="relative overflow-hidden bg-mixbus-bg px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(200,241,53,0.07),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20"
        >
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-mixbus-white sm:text-3xl lg:text-[1.75rem]">
            La Barrera de Entrada: Inteligencia Operacional Unificada con IA
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-mixbus-muted">
            Un ecosistema impulsado por un Cerebro Central omnipresente que anticipa, calcula y
            previene.
          </p>
        </motion.header>

        <div ref={wrapRef} className="relative z-10">
          <ConnectionOverlay
            wrapRef={wrapRef}
            brainRef={brainRef}
            cardRefs={cardRefs}
            activeId={hoveredCard}
          />

          {/* Cerebro Central */}
          <div className="mb-12 flex flex-col items-center md:mb-14">
            <motion.div className="relative flex flex-col items-center">
              <motion.div
                ref={brainRef}
                className="relative flex size-[min(88vw,260px)] max-h-[280px] max-w-[280px] flex-col items-center justify-center rounded-full border border-mixbus-accent/35 bg-mixbus-surface/90 shadow-[0_0_60px_-12px_rgba(200,241,53,0.32),inset_0_0_40px_rgba(200,241,53,0.07)] sm:size-[280px]"
                animate={
                  reduce
                    ? {}
                    : {
                        scale: [1, 1.035, 1],
                        opacity: [0.88, 1, 0.88],
                      }
                }
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute inset-4 rounded-full border border-dashed border-mixbus-accent/28" />
                <div className="absolute inset-10 rounded-full border border-mixbus-accent/22" />
                <Brain
                  className="relative z-[1] size-[36%] text-mixbus-accent drop-shadow-[0_0_28px_rgba(200,241,53,0.42)]"
                  strokeWidth={1.1}
                  aria-hidden
                />
                <span className="absolute bottom-[11%] z-[1] text-[10px] font-semibold uppercase tracking-[0.22em] text-mixbus-accent/85">
                  
                </span>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={hoveredCard ?? 'idle'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 max-w-md px-2 text-center text-xs leading-relaxed text-mixbus-accent/95"
                >
                  {brainStatus}
                </motion.p>
              </AnimatePresence>

              {/* Terminal */}
              <div className="mt-6 w-full max-w-md rounded-lg border border-mixbus-border bg-mixbus-surface/95 px-4 py-3 font-mono text-[11px] leading-relaxed text-mixbus-white/90 shadow-[0_0_0_1px_rgba(200,241,53,0.1)] sm:text-xs">
                <div className="mb-1.5 flex items-center gap-2 border-b border-mixbus-border pb-2 text-[10px] uppercase tracking-wider text-mixbus-accent/75">
                  <span className="size-1.5 rounded-full bg-mixbus-accent shadow-[0_0_8px_rgba(200,241,53,0.65)]" />
                  mixbus-core · stream
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={terminalLine}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-mixbus-accent/95"
                  >
                    <span className="text-mixbus-muted">$ </span>
                    {terminalLine}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Tres actores */}
          <div className="mb-14 grid gap-5 md:mb-16 md:grid-cols-3 md:gap-6">
            {ACTORS.map((a, i) => {
              const Icon = a.icon
              const active = hoveredCard === a.id
              return (
                <motion.article
                  key={a.id}
                  ref={setCardRef(a.id) as React.Ref<HTMLElement>}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: reduce ? 0 : 0.06 * i, duration: 0.45 }}
                  onMouseEnter={() => setHoveredCard(a.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onFocus={() => setHoveredCard(a.id)}
                  onBlur={() => setHoveredCard(null)}
                  tabIndex={0}
                  className={`relative rounded-2xl border bg-mixbus-surface/85 p-6 outline-none transition focus-visible:ring-2 focus-visible:ring-mixbus-accent/45 ${
                    active
                      ? 'border-mixbus-accent shadow-[0_0_40px_-8px_rgba(200,241,53,0.32)]'
                      : 'border-mixbus-border hover:border-mixbus-accent/40'
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-mixbus-accent/80">
                        {a.subtitle}
                      </p>
                      <h3 className="mt-1 flex items-center gap-2 text-lg font-semibold text-mixbus-white">
                        <Icon className="size-5 text-mixbus-accent" strokeWidth={1.25} aria-hidden />
                        {a.title}
                      </h3>
                    </div>
                    <Shield className="size-5 shrink-0 text-mixbus-accent/35" strokeWidth={1.1} />
                  </div>
                  <p className="text-sm text-mixbus-muted">
                    <span className="font-medium text-mixbus-white/85">Estado: </span>
                    {a.status}
                  </p>
                </motion.article>
              )
            })}
          </div>

          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.4em] text-mixbus-white [text-shadow:0_0_14px_rgba(255,255,255,0.5),0_0_28px_rgba(200,241,53,0.45),0_0_44px_rgba(200,241,53,0.2)]">
            Inteligencia transversal y PROACTIVA
          </p>

          {/* Grid 2×2 */}
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              const active = hoveredCard === f.id
              return (
                <motion.article
                  key={f.id}
                  ref={setCardRef(f.id) as React.Ref<HTMLElement>}
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: reduce ? 0 : 0.05 * i, duration: 0.45 }}
                  onMouseEnter={() => setHoveredCard(f.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onFocus={() => setHoveredCard(f.id)}
                  onBlur={() => setHoveredCard(null)}
                  tabIndex={0}
                  className={`relative flex flex-col gap-4 rounded-2xl border bg-mixbus-surface/60 p-6 outline-none transition focus-visible:ring-2 focus-visible:ring-mixbus-accent/45 sm:flex-row sm:items-start sm:gap-5 ${
                    active
                      ? 'border-mixbus-accent shadow-[0_0_36px_-10px_rgba(200,241,53,0.38)]'
                      : 'border-mixbus-border hover:border-mixbus-accent/35'
                  }`}
                >
                  <div
                    className={`flex size-16 shrink-0 items-center justify-center rounded-xl border border-mixbus-accent/28 bg-mixbus-bg shadow-[0_0_32px_-6px_rgba(200,241,53,0.32)] sm:size-[4.5rem] ${
                      active ? 'ring-2 ring-mixbus-accent/50' : ''
                    }`}
                  >
                    <Icon className="size-8 text-mixbus-accent sm:size-9" strokeWidth={1.1} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-mixbus-white sm:text-lg">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mixbus-muted">{f.description}</p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
