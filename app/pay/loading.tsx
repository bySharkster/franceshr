export default function PayLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />

          {/* Select dropdown skeleton */}
          <div className="mb-6">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>

          {/* Button skeleton */}
          <div className="h-12 bg-gray-200 rounded w-full mb-6" />

          {/* User info skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>

        {/* Test card info skeleton */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="h-4 bg-blue-200 rounded w-32 mb-2" />
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
