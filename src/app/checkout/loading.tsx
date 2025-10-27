export default function LoadingPage() {
  return (
    <div className="from-background to-background dark:from-background dark:to-background min-h-screen bg-linear-to-b via-blue-50/30 px-4 py-20 dark:via-blue-950/10">
      <div className="mx-auto max-w-2xl">
        {/* Back Button Skeleton */}
        <div className="mb-8 h-6 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        {/* Checkout Card Skeleton */}
        <div className="border-border/40 bg-card/80 rounded-3xl border p-8 shadow-xl backdrop-blur-sm sm:p-12">
          {/* Service Info Skeleton */}
          <div className="mb-8 flex items-start gap-4">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="flex-1 space-y-3">
              <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          {/* Price Skeleton */}
          <div className="border-border/40 bg-muted/30 mb-8 rounded-2xl border p-6">
            <div className="flex items-center justify-between">
              <div className="h-7 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="flex items-baseline gap-2">
                <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
            <div className="mt-3 h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* What's Included Skeleton */}
          <div className="mb-8">
            <div className="mb-4 h-6 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
            <ul className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1 h-4 w-4 shrink-0 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </li>
              ))}
            </ul>
          </div>

          {/* Checkout Button Skeleton */}
          <div className="h-14 w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />

          {/* Security Note Skeleton */}
          <div className="mx-auto mt-4 h-3 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
