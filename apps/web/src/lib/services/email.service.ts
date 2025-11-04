import { Resend } from "resend";

import { OnboardingEmailClient } from "@/emails/onboarding-client";
import { OnboardingEmailOwner } from "@/emails/onboarding-owner";
import { handleError } from "@/lib/utils/error-handler";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  react: React.ReactElement;
  from?: string;
}

class EmailServiceClass {
  private readonly FROM_EMAIL = process.env.EMAIL_FROM || "noreply@mail.franceshr.com";
  private readonly OWNER_EMAIL = process.env.EMAIL_TO || "contact@fernandoaponte.dev";

  /**
   * Base email sending method with retry logic
   */
  private async send(params: SendEmailParams, maxRetries = 3) {
    const { to, subject, react, from = this.FROM_EMAIL } = params;
    let lastError: unknown;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const result = await resend.emails.send({
          from,
          to,
          subject,
          react,
        });

        console.log(`[Email] Sent "${subject}" to ${to}`, result.data?.id);
        return result;
      } catch (error) {
        lastError = error;
        console.error(`[Email] Attempt ${i + 1} failed for "${subject}" to ${to}:`, error);

        if (i < maxRetries - 1) {
          // Wait before retry (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }

    console.error(`[Email] All retries failed for "${subject}" to ${to}`);
    throw handleError(lastError);
  }

  /**
   * Send onboarding data to owner
   */
  async sendOnboardingToOwner(params: {
    userEmail: string;
    userId: string;
    serviceId: string;
    formData: {
      careerGoals: string;
      industryPursuing: string;
      relatedExperience: string;
      resumeUrl?: string;
    };
  }) {
    return this.send({
      to: this.OWNER_EMAIL,
      subject: `Nueva Solicitud de Resume - ${params.userEmail}`,
      react: OnboardingEmailOwner({
        userEmail: params.userEmail,
        userId: params.userId,
        serviceId: params.serviceId,
        ...params.formData,
      }),
    });
  }

  /**
   * Send onboarding confirmation to client
   */
  async sendOnboardingConfirmation(params: { email: string }) {
    return this.send({
      to: params.email,
      subject: "Confirmación de Envío - FrancesHR",
      react: OnboardingEmailClient({ _userEmail: params.email }),
    });
  }

  /**
   * Send payment receipt to customer with receipt URL
   */
  async sendReceiptToCustomer(params: {
    email: string;
    orderId: string;
    amount: number;
    currency: string;
    receiptUrl?: string;
    packageSlug: string;
  }) {
    const formattedAmount = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: params.currency.toUpperCase(),
    }).format(params.amount / 100);

    // Simple HTML email template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h1 style="color: #2563eb;">¡Gracias por tu compra!</h1>
        <p>Hemos recibido tu pago exitosamente.</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0;">Detalles del Pedido</h2>
          <p><strong>ID del Pedido:</strong> ${params.orderId}</p>
          <p><strong>Servicio:</strong> ${params.packageSlug}</p>
          <p><strong>Monto:</strong> ${formattedAmount}</p>
        </div>
        ${
          params.receiptUrl
            ? `<p><a href="${params.receiptUrl}" style="color: #2563eb; text-decoration: none;">Ver Recibo de Stripe →</a></p>`
            : ""
        }
        <p style="margin-top: 30px; color: #6b7280;">
          Pronto recibirás un correo con los próximos pasos.
        </p>
      </div>
    `;

    return resend.emails.send({
      from: this.FROM_EMAIL,
      to: params.email,
      subject: "Recibo de Pago - FrancesHR",
      html: emailHtml,
    });
  }

  /**
   * Send order notification to owner with order details
   */
  async sendOrderNotificationToOwner(params: {
    customerEmail: string;
    orderId: string;
    amount: number;
    currency: string;
    packageSlug: string;
    receiptUrl?: string;
  }) {
    const formattedAmount = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: params.currency.toUpperCase(),
    }).format(params.amount / 100);

    // Simple HTML email template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h1 style="color: #16a34a;">Nueva Orden Recibida</h1>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0;">Detalles del Cliente</h2>
          <p><strong>Email:</strong> ${params.customerEmail}</p>
          <p><strong>ID del Pedido:</strong> ${params.orderId}</p>
          <p><strong>Servicio:</strong> ${params.packageSlug}</p>
          <p><strong>Monto:</strong> ${formattedAmount}</p>
        </div>
        ${
          params.receiptUrl
            ? `<p><a href="${params.receiptUrl}" style="color: #2563eb; text-decoration: none;">Ver Recibo en Stripe →</a></p>`
            : ""
        }
        <p style="margin-top: 30px; color: #6b7280;">
          El cliente completará el formulario de onboarding próximamente.
        </p>
      </div>
    `;

    return resend.emails.send({
      from: this.FROM_EMAIL,
      to: this.OWNER_EMAIL,
      subject: `Nueva Orden - ${params.customerEmail} - ${formattedAmount}`,
      html: emailHtml,
    });
  }

  /**
   * Notify user when document is ready (for future use)
   */
  async sendDocumentReady(params: { email: string; orderId: string; documentUrl: string }) {
    // TODO: Create DocumentReadyEmail template
    console.log(`[Email] Document ready for ${params.email} - Order: ${params.orderId}`);
    // return this.send({
    //   to: params.email,
    //   subject: "Tu Documento está Listo - FrancesHR",
    //   react: DocumentReadyEmail(params),
    // });
  }
}

// Export singleton instance
export const EmailService = new EmailServiceClass();

// Export class for testing
export { EmailServiceClass };
