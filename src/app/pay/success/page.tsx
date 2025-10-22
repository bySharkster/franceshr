"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

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
  const sessionId = searchParams.get("session_id");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (sessionId) {
      // Fetch order details from Supabase using the session ID
      supabase
        .from("orders")
        .select("*")
        .eq("stripe_checkout_session_id", sessionId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching order:", error);
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-white p-8 shadow-md">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="h-16 w-16 text-green-600"
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

          <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="mb-8 text-center text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {loading ? (
            <div className="py-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading order details...</p>
            </div>
          ) : orderDetails ? (
            <div className="mb-6 rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Details</h2>
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
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
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
            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                Order details are being processed. Please check back in a moment.
              </p>
              <p className="mt-2 text-xs text-yellow-700">Session ID: {sessionId}</p>
            </div>
          ) : (
            <div className="mb-6 rounded-lg bg-gray-50 p-6">
              <p className="text-center text-gray-600">No session ID provided</p>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/pay"
              className="flex-1 rounded-md bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700"
            >
              Make Another Purchase
            </Link>
            <Link
              href="/"
              className="flex-1 rounded-md bg-gray-200 px-4 py-3 text-center font-medium text-gray-800 transition-colors hover:bg-gray-300"
            >
              Go to Home
            </Link>
          </div>

          {sessionId && (
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Checkout Session ID: {sessionId}</p>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h2 className="mb-2 text-sm font-semibold text-blue-900">What&apos;s Next?</h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-blue-800">
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
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
