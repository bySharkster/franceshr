import Stripe from "stripe";

import { stripeSecretKey } from "@/lib/stripe/check-env";

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-09-30.clover" });

export default stripe;
