import { motion, useReducedMotion } from 'framer-motion'
import { DashboardMockup } from './DashboardMockup'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:px-12 lg:pb-36 lg:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(200,241,53,0.06),transparent)]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 lg:flex-row lg:items-center lg:gap-20 lg:justify-between">
        <div className="max-w-xl lg:max-w-[32rem]">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-mixbus-accent"
          >
            MIXBUS
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: reduce ? 0 : 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-mixbus-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            Inteligencia Operacional para Eventos en Vivo.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: reduce ? 0 : 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mt-6 text-pretty text-base leading-relaxed text-mixbus-muted sm:text-lg"
          >
            Transforma el caos fragmentado en un ecosistema predictivo impulsado por IA. Anticipa crisis, unifica tu operación y convierte cada evento en memoria institucional.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <a
              href="#demo"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-mixbus-accent px-8 text-sm font-semibold text-mixbus-black shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-mixbus-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mixbus-accent"
            >
              Solicitar Demo
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-xl flex-1 justify-center lg:justify-end"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}
