export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-borderc bg-surface-2/60 px-3 py-1 text-sm text-muted">
      {children}
    </span>
  )
}
