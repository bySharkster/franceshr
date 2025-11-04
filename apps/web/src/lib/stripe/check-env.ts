// Stripe Publishable Key
let stripePublicKey: string;
if (!process.env.STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing Stripe public key");
} else {
  stripePublicKey = process.env.STRIPE_PUBLISHABLE_KEY;
}

// Stripe Secret Key
let stripeSecretKey: string;
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing Stripe secret key");
} else {
  stripeSecretKey = process.env.STRIPE_SECRET_KEY;
}

// Stripe Webhook Secret
let stripeWebhookSecret: string;
if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing Stripe webhook secret");
} else {
  stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
}

export { stripePublicKey, stripeSecretKey, stripeWebhookSecret };
