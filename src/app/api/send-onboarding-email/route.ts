import { NextResponse } from "next/server";

import { EmailService } from "@/lib/services/email.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userEmail, serviceId, formData } = body;

    if (!userId || !userEmail || !serviceId || !formData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send emails using EmailService (with retry logic)
    await Promise.all([
      EmailService.sendOnboardingToOwner({
        userEmail,
        userId,
        serviceId,
        formData: {
          careerGoals: formData.careerGoals,
          industryPursuing: formData.industryPursuing,
          relatedExperience: formData.relatedExperience,
          resumeUrl: formData.resumeUrl,
        },
      }),
      EmailService.sendOnboardingConfirmation({ email: userEmail }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email" },
      { status: 500 },
    );
  }
}
