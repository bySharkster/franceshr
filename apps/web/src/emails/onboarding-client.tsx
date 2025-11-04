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

interface OnboardingEmailClientProps {
  _userEmail: string;
}

export function OnboardingEmailClient({ _userEmail }: OnboardingEmailClientProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirmación de tu compra - Resume Profesional</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>¡Gracias por tu compra!</Heading>
          <Text style={text}>Hola,</Text>
          <Text style={text}>
            Hemos recibido tu información y estamos emocionados de trabajar en tu resume
            profesional.
          </Text>

          <Section style={highlightBox}>
            <Heading as="h2" style={h2}>
              ¿Qué sigue?
            </Heading>
            <Text style={listText}>
              <strong>1.</strong> Revisaremos cuidadosamente toda la información que proporcionaste
            </Text>
            <Text style={listText}>
              <strong>2.</strong> Comenzaremos a trabajar en tu resume optimizado
            </Text>
            <Text style={listText}>
              <strong>3.</strong> Te contactaremos si necesitamos información adicional
            </Text>
            <Text style={listText}>
              <strong>4.</strong> Recibirás tu resume profesional en 3-5 días hábiles
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Accede a tu Dashboard
            </Heading>
            <Text style={text}>
              Puedes seguir el progreso de tu resume y acceder a todos tus servicios desde tu
              dashboard personal.
            </Text>
            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/app`} style={button}>
              Ir al Dashboard
            </Link>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>
              ¿Necesitas ayuda?
            </Heading>
            <Text style={text}>
              Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos
              respondiendo a este correo.
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            FrancesHR - Tu socio en el éxito profesional
            <br />
            <Link href={process.env.NEXT_PUBLIC_SITE_URL} style={footerLink}>
              franceshr.com
            </Link>
          </Text>
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
  fontSize: "28px",
  fontWeight: "bold",
  margin: "40px 0 20px",
  padding: "0 40px",
  textAlign: "center" as const,
};

const h2 = {
  color: "#4f46e5",
  fontSize: "20px",
  fontWeight: "600",
  margin: "16px 0 12px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
  marginBottom: "16px",
};

const listText = {
  color: "#555",
  fontSize: "15px",
  lineHeight: "28px",
  margin: "8px 0",
};

const section = {
  padding: "0 40px",
  marginBottom: "24px",
};

const highlightBox = {
  backgroundColor: "#f8f9ff",
  borderRadius: "8px",
  padding: "24px 40px",
  margin: "24px 40px",
};

const button = {
  backgroundColor: "#4f46e5",
  borderRadius: "24px",
  color: "#fff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "50px",
  textAlign: "center" as const,
  textDecoration: "none",
  width: "200px",
  margin: "16px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "20px",
  padding: "0 40px",
  marginTop: "32px",
  textAlign: "center" as const,
};

const footerLink = {
  color: "#4f46e5",
  textDecoration: "underline",
};
