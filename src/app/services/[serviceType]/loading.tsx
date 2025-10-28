export default function Loading() {
  return (
    <div className="from-primary to-secondary dark:from-background dark:to-background relative min-h-screen bg-gradient-to-b via-blue-50/30 dark:via-blue-950/10">
      {/* Back Button Skeleton */}
      <div className="absolute top-8 left-4 z-50 w-full max-w-3xl items-center justify-start gap-2 pb-8">
        <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Content Skeleton */}
            <div className="flex flex-col justify-center">
              {/* Icon Badge Skeleton */}
              <div className="mb-6 h-20 w-20 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />

              {/* Title Skeleton */}
              <div className="mb-4 space-y-3">
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-12 w-3/4 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* Description Skeleton */}
              <div className="mb-6 space-y-2">
                <div className="h-6 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-6 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* Price Skeleton */}
              <div className="mb-8">
                <div className="mb-2 h-14 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* CTA Button Skeleton */}
              <div className="h-14 w-64 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Right Column - Features Card Skeleton */}
            <div className="flex items-center">
              <div className="border-border/40 bg-card/80 w-full rounded-3xl border p-8 shadow-xl backdrop-blur-sm">
                <div className="mb-6 h-8 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                <ul className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 flex-shrink-0 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                      <div className="h-6 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Description Skeleton */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="border-border/40 bg-card/60 rounded-3xl border p-8 backdrop-blur-sm sm:p-12">
            <div className="mb-6 h-9 w-80 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-3">
              <div className="h-6 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-6 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-6 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="mt-8">
              <div className="mb-4 h-7 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              <ul className="grid gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1 h-5 w-5 flex-shrink-0 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-8 h-10 w-80 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-border/40 bg-card/60 overflow-hidden rounded-2xl border backdrop-blur-sm"
              >
                <div className="flex w-full items-center justify-between p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-6 w-6 flex-shrink-0 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Skeleton */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="from-primary/10 via-secondary/10 mx-auto max-w-4xl rounded-3xl bg-linear-to-br to-pink-50/10 p-8 text-center shadow-xl sm:p-12 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
          <div className="mx-auto mb-4 h-10 w-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="mx-auto mb-8 h-6 w-80 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mx-auto h-14 w-64 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="mx-auto mt-6 h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </section>
    </div>
  );
}
