export interface Order {
  id: string;
  user_id: string;
  email: string;
  package_slug: string;
  stripe_checkout_session_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  status: string;
  metadata: JSON;
  created_at: string;
  updated_at: string;
}

export interface OnboardingData {
  id: string;
  service_id: string;
  order_id: string;
  career_goals: string;
  industry_pursuing: string;
  related_experience: string;
  resume_url: string | null;
  created_at: string;
}
