/**
 * "X of Y spots left" pill. Receives the count as props from a server-side fetch, so the
 * number is in the HTML on first paint (no client fetch, no loading state, no flicker),
 * while still reflecting the live API through the server's 60s revalidation.
 */
export default function LtdSeatsPill({
  remaining,
  total,
  className = '',
}: {
  remaining: number
  total: number
  className?: string
}) {
  const label =
    remaining <= 0
      ? 'All spots taken'
      : remaining < total
        ? `${remaining} of ${total} spots left`
        : `Only ${total} spots left`

  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      {label}
    </p>
  )
}
