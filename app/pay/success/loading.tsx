export default function SuccessLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
          {/* Icon skeleton */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-gray-200 w-24 h-24" />
          </div>

          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8" />

          {/* Order details skeleton */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-28" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-14" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-12" />
                <div className="h-4 bg-gray-200 rounded w-40" />
              </div>
            </div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded" />
            <div className="flex-1 h-12 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Info box skeleton */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="h-4 bg-blue-200 rounded w-24 mb-2" />
          <div className="space-y-2">
            <div className="h-3 bg-blue-200 rounded w-full" />
            <div className="h-3 bg-blue-200 rounded w-5/6" />
            <div className="h-3 bg-blue-200 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
