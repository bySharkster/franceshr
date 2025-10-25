import { Briefcase, MessageSquare, Users } from "lucide-react";

import type { ServiceDetails } from "@/types/services.type";

export const SERVICES_DATA: Record<string, ServiceDetails> = {
  "resume-profesional": {
    id: "resume-profesional",
    icon: Briefcase,
    title: "Resume Profesional",
    shortDescription:
      "Haz que tu resume comunique tu valor real. Diseños modernos, contenido estratégico y redacción optimizada para captar la atención de reclutadores y sistemas automatizados (ATS).",
    extendedDescription:
      "Tu resume es tu carta de presentación profesional. En FrancesHR, transformamos tu experiencia en un documento que destaca tus logros, habilidades y potencial. Utilizamos estrategias de redacción optimizadas para sistemas ATS y diseños modernos que captan la atención de reclutadores desde el primer vistazo.",
    features: [
      "Análisis completo de tu trayectoria profesional",
      "Redacción estratégica optimizada para ATS",
      "Diseño moderno y profesional",
      "Formato adaptado a tu industria",
      "Revisiones ilimitadas hasta tu satisfacción",
      "Entrega en formato PDF y Word editable",
    ],
    price: 75,
    currency: "USD",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_RESUME_PRICE_ID || null,
    calComLink: null,
    deliveryTime: "3-5 días hábiles",
    includes: [
      "Cuestionario detallado de carrera",
      "Sesión de consulta inicial",
      "Resume optimizado para ATS",
      "Carta de presentación (opcional)",
      "Guía de uso y personalización",
    ],
    ctaText: "Comprar Resume Profesional",
    faqs: [
      {
        question: "¿Cuánto tiempo toma recibir mi resume?",
        answer:
          "El proceso completo toma entre 3 a 5 días hábiles desde que completas el cuestionario inicial. Esto incluye tiempo para revisiones y ajustes según tus comentarios.",
      },
      {
        question: "¿Qué información necesito proporcionar?",
        answer:
          "Necesitarás completar un cuestionario detallado sobre tu experiencia laboral, educación, habilidades y objetivos profesionales. También puedes enviarnos tu resume actual si tienes uno.",
      },
      {
        question: "¿Puedo solicitar revisiones?",
        answer:
          "¡Absolutamente! Incluimos revisiones ilimitadas hasta que estés completamente satisfecho con el resultado final. Tu éxito es nuestra prioridad.",
      },
      {
        question: "¿El resume será compatible con sistemas ATS?",
        answer:
          "Sí, todos nuestros resumes están optimizados para pasar sistemas de seguimiento de candidatos (ATS), aumentando tus posibilidades de que tu aplicación llegue a manos de reclutadores.",
      },
      {
        question: "¿En qué formatos recibiré mi resume?",
        answer:
          "Recibirás tu resume en formato PDF profesional y también en formato Word editable para que puedas hacer ajustes menores en el futuro.",
      },
    ],
  },
  "mentorias-laborales": {
    id: "mentorias-laborales",
    icon: Users,
    title: "Mentorías Laborales",
    shortDescription:
      "Recibe orientación personalizada para definir objetivos, fortalecer tu marca personal y trazar un plan efectivo de crecimiento profesional.",
    extendedDescription:
      "Las mentorías laborales son sesiones personalizadas donde trabajamos juntos para identificar tus fortalezas, definir objetivos claros y crear estrategias efectivas para alcanzar tus metas profesionales. Ya sea que busques un cambio de carrera, ascenso o desarrollo de habilidades, te guiaré en cada paso del camino.",
    features: [
      "Sesiones individuales de 60 minutos",
      "Evaluación de fortalezas y áreas de mejora",
      "Plan de acción personalizado",
      "Estrategias de networking efectivo",
      "Desarrollo de marca personal",
      "Seguimiento y apoyo continuo",
    ],
    price: null,
    currency: "USD",
    stripePriceId: null,
    calComLink: "https://cal.com/franceshr/mentorias",
    ctaText: "Agendar Mentoría",
    faqs: [
      {
        question: "¿Cuánto dura una sesión de mentoría?",
        answer:
          "Cada sesión tiene una duración de 60 minutos. Recomendamos al menos 3 sesiones para ver resultados significativos, pero puedes agendar según tus necesidades.",
      },
      {
        question: "¿Cómo se realizan las sesiones?",
        answer:
          "Las sesiones se realizan virtualmente a través de Google Meet o Zoom, según tu preferencia. Esto te permite conectarte desde cualquier lugar.",
      },
      {
        question: "¿Qué temas podemos cubrir?",
        answer:
          "Podemos trabajar en cambio de carrera, búsqueda de empleo, desarrollo profesional, negociación salarial, marca personal, networking, balance vida-trabajo, y cualquier otro desafío profesional que enfrentes.",
      },
      {
        question: "¿Recibiré materiales o recursos?",
        answer:
          "Sí, después de cada sesión recibirás un resumen con puntos clave, plan de acción y recursos relevantes para tu desarrollo profesional.",
      },
      {
        question: "¿Puedo cancelar o reprogramar?",
        answer:
          "Sí, puedes cancelar o reprogramar con al menos 24 horas de anticipación sin costo adicional.",
      },
    ],
  },
  "entrevistas-simuladas": {
    id: "entrevistas-simuladas",
    icon: MessageSquare,
    title: "Entrevistas Simuladas",
    shortDescription:
      "Prepárate con una experta en coaching laboral y reclutamiento. Mejora tus respuestas, lenguaje corporal y seguridad antes de tu próxima entrevista.",
    extendedDescription:
      "Las entrevistas simuladas te preparan para el momento real. Practicaremos preguntas comunes y difíciles, trabajaremos en tu lenguaje corporal, y te daré retroalimentación detallada para que llegues a tu entrevista con confianza y preparación.",
    features: [
      "Sesión de práctica de 45-60 minutos",
      "Preguntas personalizadas según tu industria",
      "Retroalimentación detallada y constructiva",
      "Técnicas para respuestas efectivas (método STAR)",
      "Consejos sobre lenguaje corporal",
      "Grabación de la sesión para tu revisión",
    ],
    price: null,
    currency: "USD",
    stripePriceId: null,
    calComLink: "https://cal.com/franceshr/entrevistas",
    ctaText: "Agendar Entrevista Simulada",
    faqs: [
      {
        question: "¿Cuánto dura la sesión?",
        answer:
          "La sesión completa dura entre 45 a 60 minutos, incluyendo la simulación de entrevista y retroalimentación detallada.",
      },
      {
        question: "¿Qué tipo de preguntas practicaremos?",
        answer:
          "Practicaremos preguntas conductuales, técnicas (según tu campo), situacionales y las temidas preguntas difíciles. Personalizaré las preguntas según la posición e industria a la que aplicas.",
      },
      {
        question: "¿Recibiré la grabación?",
        answer:
          "Sí, recibirás la grabación de tu sesión para que puedas revisarla y seguir mejorando. También incluye un documento con retroalimentación escrita.",
      },
      {
        question: "¿Cuándo debo agendar la sesión?",
        answer:
          "Idealmente, agenda tu sesión al menos 3-5 días antes de tu entrevista real. Esto te da tiempo para practicar y aplicar la retroalimentación.",
      },
      {
        question: "¿Puedo hacer múltiples sesiones?",
        answer:
          "¡Por supuesto! Muchos clientes hacen varias sesiones para diferentes tipos de entrevistas o para seguir mejorando sus habilidades.",
      },
    ],
  },
};

export const getServiceById = (id: string): ServiceDetails | null => {
  return SERVICES_DATA[id] || null;
};

export const getAllServices = (): ServiceDetails[] => {
  return Object.values(SERVICES_DATA);
};
