export function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      {children}
    </section>
  )
}

export function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <header className="mb-12">
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
        <span className="text-accent-soft">#</span> {children}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted-2">{subtitle}</p>}
    </header>
  )
}
