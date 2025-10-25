import { NextResponse } from "next/server";
import { Resend } from "resend";

import { OnboardingEmailClient } from "@/emails/onboarding-client";
import { OnboardingEmailOwner } from "@/emails/onboarding-owner";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userEmail, serviceId, formData } = body;

    if (!userId || !userEmail || !serviceId || !formData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ownerEmail = process.env.NEXT_PUBLIC_EMAIL_TO || "frances@franceshr.com";
    const fromEmail = process.env.NEXT_PUBLIC_EMAIL_FROM || "noreply@franceshr.com";

    // Send email to owner
    const ownerEmailResult = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      subject: `Nueva Solicitud de Resume - ${userEmail}`,
      react: OnboardingEmailOwner({
        userEmail,
        userId,
        serviceId,
        careerGoals: formData.careerGoals,
        industryPursuing: formData.industryPursuing,
        relatedExperience: formData.relatedExperience,
        resumeUrl: formData.resumeUrl,
      }),
    });

    // Send confirmation email to client
    const clientEmailResult = await resend.emails.send({
      from: fromEmail,
      to: userEmail,
      subject: "Confirmación de Compra - Resume Profesional",
      react: OnboardingEmailClient({
        _userEmail: userEmail,
      }),
    });

    return NextResponse.json({
      success: true,
      ownerEmailId: ownerEmailResult.data?.id,
      clientEmailId: clientEmailResult.data?.id,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email" },
      { status: 500 },
    );
  }
}
