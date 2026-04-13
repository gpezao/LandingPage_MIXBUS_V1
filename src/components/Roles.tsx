import { motion, useReducedMotion } from 'framer-motion'
import { Building2, Headphones, Radio } from 'lucide-react'

const roles = [
  {
    icon: Radio,
    title: 'Productores',
    description: 'Control total y predicción de riesgos.',
  },
  {
    icon: Headphones,
    title: 'Proveedores',
    description: 'Estándar de calidad y portal de evidencias unificado.',
  },
  {
    icon: Building2,
    title: 'Recintos',
    description: 'Vista macro y control de accesos en tiempo real.',
  },
] as const

export function Roles() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-t border-mixbus-border/90 px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(26,26,36,0.85),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
        >
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-mixbus-white sm:text-3xl">
            Para quién es
          </h2>
          <p className="mt-4 text-pretty text-mixbus-muted">
            Una fuente de verdad para cada actor del ecosistema en vivo.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {roles.map((role, i) => {
            const Icon = role.icon
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: reduce ? 0 : 0.08 * i,
                  duration: reduce ? 0 : 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col rounded-2xl border border-mixbus-border bg-mixbus-bg/50 p-8 text-center md:text-left"
              >
                <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full border border-mixbus-border text-mixbus-muted md:mx-0">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-mixbus-white">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mixbus-muted">{role.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
