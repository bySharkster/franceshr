"use client";

import { createClient } from "@franceshr/database/client";
import type { Price } from "@franceshr/types";
import type { User } from "@supabase/supabase-js";
import { useEffect, useId, useState } from "react";

interface PaymentFormProps {
  prices: Price[];
  initialError: string | null;
}

export default function PaymentForm({ prices, initialError }: PaymentFormProps) {
  const selectId = useId();
  const [selectedPriceId, setSelectedPriceId] = useState<string>(
    prices.length > 0 ? prices[0].id : "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Fetch user client-side for auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, [supabase]);

  const handleCheckout = async () => {
    if (!user) {
      setError("You must be logged in to make a purchase");
      return;
    }

    if (!selectedPriceId) {
      setError("Please select a price");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedPrice = prices.find((p) => p.id === selectedPriceId);
      const packageSlug = selectedPrice?.product_id || "test-product";

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          priceId: selectedPriceId,
          package_slug: packageSlug,
          successUrl: `${window.location.origin}/pay/success`,
          cancelUrl: `${window.location.origin}/pay/cancel`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Authentication Required</h1>
          <p className="mb-6 text-gray-600">You must be logged in to make a purchase.</p>
          <a
            href="/sign-in"
            className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Test Payment</h1>
          <p className="mb-8 text-gray-600">Select a price and complete checkout</p>

          {error && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor={selectId} className="mb-2 block text-sm font-medium text-gray-700">
              Select Price
            </label>
            <select
              id={selectId}
              value={selectedPriceId}
              onChange={(e) => setSelectedPriceId(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading || prices.length === 0}
            >
              {prices.length === 0 ? (
                <option>No prices available</option>
              ) : (
                prices.map((price) => (
                  <option key={price.id} value={price.id}>
                    {formatPrice(price.unit_amount, price.currency)}
                    {price.interval && ` / ${price.interval}`}
                    {price.description ? ` - ${price.description}` : ""}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading || !selectedPriceId || prices.length === 0}
            className="w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>

          <div className="mt-6 text-sm text-gray-500">
            <p className="mb-2">
              <strong>User ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h2 className="mb-2 text-sm font-semibold text-blue-900">Test Card Numbers</h2>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>
              <strong>Success:</strong> 4242 4242 4242 4242
            </li>
            <li>
              <strong>Decline:</strong> 4000 0000 0000 0002
            </li>
            <li>
              <strong>3D Secure:</strong> 4000 0025 0000 3155
            </li>
          </ul>
          <p className="mt-2 text-xs text-blue-700">Use any future expiry date and any CVC</p>
        </div>
      </div>
    </div>
  );
}
