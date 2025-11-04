"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-white p-8 shadow-md">
          {/* Cancel Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-yellow-100 p-3">
              <svg
                className="h-16 w-16 text-yellow-600"
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

          <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Payment Cancelled</h1>
          <p className="mb-8 text-center text-gray-600">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">What happened?</h2>
            <p className="mb-4 text-gray-600">
              You cancelled the checkout process before completing your payment. This is completely
              normal and happens when:
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-600">
              <li>You clicked the back button during checkout</li>
              <li>You closed the payment window</li>
              <li>You decided not to complete the purchase</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/pay"
              className="flex-1 rounded-md bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="flex-1 rounded-md bg-gray-200 px-4 py-3 text-center font-medium text-gray-800 transition-colors hover:bg-gray-300"
            >
              Go to Home
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h2 className="mb-2 text-sm font-semibold text-blue-900">Need Help?</h2>
          <p className="mb-2 text-sm text-blue-800">
            If you experienced any issues during checkout or have questions about our products,
            please don&apos;t hesitate to contact us.
          </p>
          <Link
            href="/contact"
            className="text-sm font-medium text-blue-600 underline hover:text-blue-800"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
