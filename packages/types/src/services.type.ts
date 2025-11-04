import type { LucideIcon } from "lucide-react";

export type ServiceType =
  | "resume-basico"
  | "resume-profesional"
  | "resume-ejecutivo"
  | "mentorias-laborales"
  | "entrevistas-simuladas";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface RelatedService {
  type: ServiceType;
  title: string;
  description: string;
}

export interface ServiceDetails {
  id: string;
  serviceType: ServiceType;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  extendedDescription: string;
  features: string[];
  price: number | null; // null for Cal.com services
  currency: string;
  stripePriceId: string | null; // null for Cal.com services
  calComLink: string | null; // null for Stripe services
  faqs: ServiceFAQ[];
  ctaText: string;
  deliveryTime?: string;
  includes?: string[];
  relatedServices?: RelatedService[];
}
