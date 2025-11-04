export default function SuccessLoading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="animate-pulse rounded-lg bg-white p-8 shadow-md">
          {/* Icon skeleton */}
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-gray-200" />
          </div>

          {/* Title skeleton */}
          <div className="mx-auto mb-2 h-8 w-2/3 rounded bg-gray-200" />
          <div className="mx-auto mb-8 h-4 w-1/2 rounded bg-gray-200" />

          {/* Order details skeleton */}
          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <div className="mb-4 h-5 w-32 rounded bg-gray-200" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-4 w-32 rounded bg-gray-200" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-4 w-28 rounded bg-gray-200" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-14 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-12 rounded bg-gray-200" />
                <div className="h-4 w-40 rounded bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="h-12 flex-1 rounded bg-gray-200" />
            <div className="h-12 flex-1 rounded bg-gray-200" />
          </div>
        </div>

        {/* Info box skeleton */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="mb-2 h-4 w-24 rounded bg-blue-200" />
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
