export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-6 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="h-8 w-40 rounded-md bg-muted animate-pulse" />
        <div className="h-9 w-28 rounded-md bg-muted animate-pulse" />
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 rounded-full bg-muted animate-pulse"
          />
        ))}
      </div>

      {/* Job cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 shadow-sm">
            {/* Title */}
            <div className="mb-3 h-5 w-3/4 rounded bg-muted animate-pulse" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
            </div>

            {/* Skills */}
            <div className="mt-4 flex gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="h-6 w-16 rounded-full bg-muted animate-pulse"
                />
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-8 w-20 rounded-md bg-muted animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
