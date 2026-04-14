import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS: readonly { label: string; href: string; cta?: boolean }[] = [
  { label: 'Producto', href: '#producto' },
  { label: 'Demo', href: '#demo', cta: true },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-mixbus-border/80 bg-mixbus-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8 lg:px-12">
        <a href="#" className="text-sm font-semibold tracking-[0.18em] text-mixbus-white/90">
          MIXBUS
        </a>

        {/* Desktop nav */}
        <nav aria-label="Principal" className="hidden items-center gap-6 text-xs font-medium text-mixbus-muted sm:flex sm:text-sm">
          {NAV_ITEMS.map((item) =>
            item.cta ? (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-mixbus-border bg-mixbus-surface/80 px-3 py-1.5 text-mixbus-white/90 transition hover:border-mixbus-accent/35 hover:text-mixbus-white"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-mixbus-white"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="flex size-9 items-center justify-center rounded-lg text-mixbus-muted transition hover:text-mixbus-white sm:hidden"
        >
          {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Principal"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-mixbus-border/60 bg-mixbus-bg/95 backdrop-blur-md sm:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    item.cta
                      ? 'bg-mixbus-accent text-mixbus-black hover:bg-mixbus-accent-hover'
                      : 'text-mixbus-muted hover:bg-mixbus-surface/60 hover:text-mixbus-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
