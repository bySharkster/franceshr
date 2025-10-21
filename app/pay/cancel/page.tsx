'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Cancel Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-yellow-100 p-3">
              <svg
                className="w-16 h-16 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Cancel Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 text-center mb-8">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">What happened?</h2>
            <p className="text-gray-600 mb-4">
              You cancelled the checkout process before completing your payment. This is completely
              normal and happens when:
            </p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>You clicked the back button during checkout</li>
              <li>You closed the payment window</li>
              <li>You decided not to complete the purchase</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/pay"
              className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 text-center py-3 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">Need Help?</h2>
          <p className="text-sm text-blue-800 mb-2">
            If you experienced any issues during checkout or have questions about our products,
            please don&apos;t hesitate to contact us.
          </p>
          <Link
            href="/contact"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
