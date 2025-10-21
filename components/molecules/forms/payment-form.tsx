'use client';

import { useEffect, useState, useId } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { Price } from '@/types/prices.type';

interface PaymentFormProps {
  prices: Price[];
  initialError: string | null;
}

export default function PaymentForm({ prices, initialError }: PaymentFormProps) {
  const selectId = useId();
  const [selectedPriceId, setSelectedPriceId] = useState<string>(
    prices.length > 0 ? prices[0].id : ''
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
      setError('You must be logged in to make a purchase');
      return;
    }

    if (!selectedPriceId) {
      setError('Please select a price');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedPrice = prices.find((p) => p.id === selectedPriceId);
      const packageSlug = selectedPrice?.product_id || 'test-product';

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">You must be logged in to make a purchase.</p>
          <a
            href="/sign-in"
            className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Payment</h1>
          <p className="text-gray-600 mb-8">Select a price and complete checkout</p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-2">
              Select Price
            </label>
            <select
              id={selectId}
              value={selectedPriceId}
              onChange={(e) => setSelectedPriceId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading || prices.length === 0}
            >
              {prices.length === 0 ? (
                <option>No prices available</option>
              ) : (
                prices.map((price) => (
                  <option key={price.id} value={price.id}>
                    {formatPrice(price.unit_amount, price.currency)} 
                     {price.interval && ` / ${price.interval}`}
                    {price.description ? ` - ${price.description}` : ''}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading || !selectedPriceId || prices.length === 0}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
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

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">Test Card Numbers</h2>
          <ul className="text-sm text-blue-800 space-y-1">
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
          <p className="text-xs text-blue-700 mt-2">Use any future expiry date and any CVC</p>
        </div>
      </div>
    </div>
  );
}
