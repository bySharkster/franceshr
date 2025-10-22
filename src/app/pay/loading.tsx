export default function PayLoading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="animate-pulse rounded-lg bg-white p-8 shadow-md">
          {/* Title skeleton */}
          <div className="mb-2 h-8 w-3/4 rounded bg-gray-200" />
          <div className="mb-8 h-4 w-1/2 rounded bg-gray-200" />

          {/* Select dropdown skeleton */}
          <div className="mb-6">
            <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
            <div className="h-10 w-full rounded bg-gray-200" />
          </div>

          {/* Button skeleton */}
          <div className="mb-6 h-12 w-full rounded bg-gray-200" />

          {/* User info skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>

        {/* Test card info skeleton */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="mb-2 h-4 w-32 rounded bg-blue-200" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-blue-200" />
            <div className="h-3 w-5/6 rounded bg-blue-200" />
            <div className="h-3 w-4/5 rounded bg-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
