export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-mixbus-border/80 bg-mixbus-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8 lg:px-12">
        <a href="#" className="text-sm font-semibold tracking-[0.18em] text-mixbus-white/90">
          MIXBUS
        </a>
        <nav className="flex items-center gap-6 text-xs font-medium text-mixbus-muted sm:text-sm">
          <a href="#producto" className="transition hover:text-mixbus-white">
            Producto
          </a>
          <a
            href="#demo"
            className="rounded-full border border-mixbus-border bg-mixbus-surface/80 px-3 py-1.5 text-mixbus-white/90 transition hover:border-mixbus-accent/35 hover:text-mixbus-white"
          >
            Demo
          </a>
        </nav>
      </div>
    </header>
  )
}
