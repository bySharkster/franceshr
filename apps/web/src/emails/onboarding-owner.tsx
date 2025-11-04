import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OnboardingEmailOwnerProps {
  userEmail: string;
  userId: string;
  serviceId: string;
  careerGoals: string;
  industryPursuing: string;
  relatedExperience: string;
  resumeUrl?: string | null;
}

export function OnboardingEmailOwner({
  userEmail,
  userId,
  serviceId,
  careerGoals,
  industryPursuing,
  relatedExperience,
  resumeUrl,
}: OnboardingEmailOwnerProps) {
  return (
    <Html>
      <Head />
      <Preview>Nueva solicitud de Resume Profesional de {userEmail}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nueva Solicitud de Resume</Heading>
          <Text style={text}>
            Has recibido una nueva solicitud para el servicio de Resume Profesional.
          </Text>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Información del Cliente
            </Heading>
            <Text style={infoText}>
              <strong>Email:</strong> {userEmail}
            </Text>
            <Text style={infoText}>
              <strong>User ID:</strong> {userId}
            </Text>
            <Text style={infoText}>
              <strong>Servicio:</strong> {serviceId}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Objetivos Profesionales
            </Heading>
            <Text style={contentText}>{careerGoals}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Industria o Sector
            </Heading>
            <Text style={contentText}>{industryPursuing}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Experiencia Relevante
            </Heading>
            <Text style={contentText}>{relatedExperience}</Text>
          </Section>

          {resumeUrl && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading as="h2" style={h2}>
                  Resume Actual
                </Heading>
                <Link href={resumeUrl} style={link}>
                  Descargar Resume
                </Link>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Text style={footer}>Este correo fue generado automáticamente desde FrancesHR.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0 20px",
  padding: "0 40px",
};

const h2 = {
  color: "#4f46e5",
  fontSize: "18px",
  fontWeight: "600",
  margin: "16px 0 8px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
};

const infoText = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "4px 0",
};

const contentText = {
  color: "#555",
  fontSize: "15px",
  lineHeight: "24px",
  whiteSpace: "pre-wrap" as const,
};

const section = {
  padding: "0 40px",
  marginBottom: "16px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const link = {
  color: "#4f46e5",
  fontSize: "14px",
  textDecoration: "underline",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  marginTop: "32px",
};
