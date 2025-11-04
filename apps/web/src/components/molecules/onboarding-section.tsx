"use client";

import type { OnboardingData, Order } from "@franceshr/types";
import { Upload } from "lucide-react";

interface OnboardingSectionProps {
  orders: Order[];
  onboardingData: OnboardingData[];
  findServiceNameById: (id: string) => string;
  registerRef: (id: string) => (el: HTMLDivElement | null) => void;
}

export function OnboardingSection({
  onboardingData,
  findServiceNameById,
  registerRef,
}: OnboardingSectionProps) {
  if (onboardingData.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-foreground mb-4 text-2xl font-bold">Información Enviada</h2>
      <div className="space-y-4">
        {onboardingData.map((data) => (
          <div
            key={data.id}
            ref={registerRef(data.id)}
            className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-3">
              <Upload className="h-5 w-5" />
              <h3 className="text-foreground text-lg font-semibold">
                {findServiceNameById(data.order_id || "")}
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-foreground/60 mb-1 font-medium">Objetivos:</p>
                <p className="text-foreground/80">{data.career_goals}</p>
              </div>
              <div>
                <p className="text-foreground/60 mb-1 font-medium">Industria:</p>
                <p className="text-foreground/80">{data.industry_pursuing}</p>
              </div>
              {data.resume_url && (
                <div>
                  <a
                    href={data.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 inline-flex items-center gap-1 font-medium underline"
                  >
                    Ver Resume Enviado
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
