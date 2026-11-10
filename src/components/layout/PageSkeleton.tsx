/** Full-page skeleton shown while a lazily loaded page loads. */
export function PageSkeleton() {
  return (
    <div className="grid gap-4" aria-busy="true" role="status">
      <div className="h-14 w-72 animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-36 animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="h-80 animate-pulse rounded-xl bg-slate-200/70 xl:col-span-2 dark:bg-slate-800/70" />
        <div className="h-80 animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
      </div>
    </div>
  )
}
