const NAV_LINKS = [
  { label: 'Producto', href: '#producto' },
  { label: 'Demo', href: '#demo' },
] as const

const SOCIAL_LINKS = [
  { id: 'x-icon', label: 'X (Twitter)', href: 'https://x.com' },
  { id: 'discord-icon', label: 'Discord', href: 'https://discord.gg' },
  { id: 'bluesky-icon', label: 'Bluesky', href: 'https://bsky.app' },
  { id: 'github-icon', label: 'GitHub', href: 'https://github.com' },
] as const

export function Footer() {
  return (
    <footer className="border-t border-mixbus-border/80 bg-mixbus-bg px-5 pb-10 pt-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <span className="text-sm font-semibold tracking-[0.18em] text-mixbus-white/90">
            MIXBUS
          </span>
          <p className="max-w-xs text-center text-xs leading-relaxed text-mixbus-muted sm:text-left">
            Inteligencia operacional predictiva para eventos en vivo.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-6 text-xs font-medium text-mixbus-muted">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-mixbus-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-mixbus-muted transition hover:text-mixbus-white"
            >
              <svg className="size-5" aria-hidden>
                <use href={`/icons.svg#${s.id}`} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-mixbus-border/60 pt-6 text-center text-[11px] text-mixbus-muted">
        <p>© {new Date().getFullYear()} MIXBUS. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
