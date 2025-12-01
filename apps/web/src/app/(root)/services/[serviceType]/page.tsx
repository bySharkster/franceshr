import type { ServiceType } from "@franceshr/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServiceByType } from "@/config/services.config";

import { ServiceDetailClient } from "./service-detail-client";

type Props = {
  params: Promise<{ serviceType: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceType } = await params;
  const service = getServiceByType(serviceType as ServiceType);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | FrancesHR`,
      description: service.shortDescription,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { serviceType } = await params;
  const service = getServiceByType(serviceType as ServiceType);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient serviceType={serviceType as ServiceType} />;
}
