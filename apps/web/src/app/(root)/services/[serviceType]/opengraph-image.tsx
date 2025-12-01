import type { ServiceType } from "@franceshr/types";
import { ImageResponse } from "next/og";

import { getServiceByType } from "@/config/services.config";

// Image metadata
export const alt = "FrancesHR Service";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: Promise<{ serviceType: string }> }) {
  const { serviceType } = await params;
  const service = getServiceByType(serviceType as ServiceType);

  const title = service?.title ?? "Servicio no encontrado";
  const description = service?.shortDescription ?? "El servicio solicitado no existe.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundImage: "linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899)",
          padding: "60px",
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "60px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#3b82f6",
            }}
          >
            F
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            FrancesHR
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "900px",
          }}
        >
          {/* Service badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.2)",
              padding: "8px 16px",
              borderRadius: "9999px",
              fontSize: "18px",
              color: "white",
            }}
          >
            Servicio Profesional
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "28px",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "800px",
            }}
          >
            {description.length > 120 ? `${description.slice(0, 120)}...` : description}
          </p>
        </div>

        {/* Bottom decoration */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            transform: "translate(30%, 30%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
