import { motion, useReducedMotion } from 'framer-motion'

export function FinalCTA() {
  const reduce = useReducedMotion()

  return (
    <section id="demo" className="px-5 pb-24 pt-8 sm:px-8 sm:pb-32 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-mixbus-border bg-mixbus-surface/60 px-8 py-16 text-center sm:px-12 sm:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,241,53,0.07),transparent_55%)]"
        />
        <div className="relative">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-mixbus-white sm:text-3xl">
            ¿Listo para elevar el estándar de tu producción?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm text-mixbus-muted sm:text-base">
            Solicita una demo orientada a tu tipo de evento y descubre cómo MIXBUS unifica la
            operación bajo inteligencia predictiva.
          </p>
          <div className="mt-10">
            <a
              href="mailto:demo@mixbus.com?subject=Demo%20MIXBUS"
              className="inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-full bg-mixbus-accent px-10 text-sm font-semibold text-mixbus-black shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-mixbus-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mixbus-accent"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </motion.div>

      <footer className="mx-auto mt-20 max-w-6xl border-t border-mixbus-border/80 pt-10 text-center text-xs text-mixbus-muted">
        <p>© {new Date().getFullYear()} MIXBUS. Inteligencia operacional para eventos en vivo.</p>
      </footer>
    </section>
  )
}
