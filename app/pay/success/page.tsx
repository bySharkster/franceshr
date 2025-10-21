'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface OrderDetails {
  id: string;
  package_slug: string;
  amount: number;
  currency: string;
  status: string;
  email: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (sessionId) {
      // Fetch order details from Supabase using the session ID
      supabase
        .from('orders')
        .select('*')
        .eq('stripe_checkout_session_id', sessionId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching order:', error);
          } else {
            setOrderDetails(data);
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId, supabase]);

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="w-16 h-16 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Success Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Payment Successful!</h1>
          <p className="text-gray-600 text-center mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading order details...</p>
            </div>
          ) : orderDetails ? (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Order ID:</dt>
                  <dd className="font-medium text-gray-900">{orderDetails.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Package:</dt>
                  <dd className="font-medium text-gray-900">{orderDetails.package_slug}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Amount:</dt>
                  <dd className="font-medium text-gray-900">
                    {formatPrice(orderDetails.amount, orderDetails.currency)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Status:</dt>
                  <dd>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {orderDetails.status}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Email:</dt>
                  <dd className="font-medium text-gray-900">{orderDetails.email}</dd>
                </div>
              </dl>
            </div>
          ) : sessionId ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                Order details are being processed. Please check back in a moment.
              </p>
              <p className="text-xs text-yellow-700 mt-2">Session ID: {sessionId}</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-600 text-center">No session ID provided</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/pay"
              className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Make Another Purchase
            </Link>
            <Link
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 text-center py-3 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              Go to Home
            </Link>
          </div>

          {sessionId && (
            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>Checkout Session ID: {sessionId}</p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">What&apos;s Next?</h2>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>A confirmation email has been sent to your email address</li>
            <li>Your order is being processed and will be fulfilled shortly</li>
            <li>You can view your order history in your account dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
