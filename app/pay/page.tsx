import { cookies } from 'next/headers';
import PaymentForm from '../../components/molecules/forms/payment-form';
import { GetPricesAction } from '../actions/get-prices-action';

// TODO: implement auth check verifie supabase client creation.
export default async function PayPage() {
  // Server-side Supabase client

  // Get user from cookies (server-side auth check)
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('sb-access-token');

  // Fetch user server-side
//   const userId: string | null = null;
//   const userEmail: string | null = null;

  if (authCookie) {
    // If you have auth token, verify it
    // For now, we'll rely on client-side auth check in the component
    // In production, you'd want to verify the JWT here
  }

  // Fetch active prices server-side
   const pricesResponse = await GetPricesAction()



  return (
    <PaymentForm 
      prices={pricesResponse || []} 
      initialError={null}
    />
  );
}
