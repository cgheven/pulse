export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item) => (
        <details key={item.question} className="group rounded-xl border border-border bg-card p-5">
          <summary className="cursor-pointer list-none font-semibold marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.question}
              <span className="mt-0.5 text-primary group-open:hidden" aria-hidden="true">+</span>
              <span className="mt-0.5 hidden text-primary group-open:inline" aria-hidden="true">−</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
