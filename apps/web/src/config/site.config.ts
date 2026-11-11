/**
 * Configuración global de marca personal, biografía, habilidades y contacto.
 *
 * Modifica este archivo para actualizar textos, estado de disponibilidad,
 * enlaces sociales o stack tecnológico en toda la aplicación simultáneamente.
 */
export const siteConfig = {
  name: "Jeremías Ojeda",
  brand: "SoyJere",
  domain: "soyjere.com",
  url: "https://soyjere.com",
  role: "Web & Mobile Developer",
  availability: {
    isAvailable: true,
    label: "Disponible para nuevos proyectos",
    details: "Freelance, colaboraciones y oportunidades laborales",
  },
  hero: {
    tagline: "Construyo y mejoro productos digitales con enfoque en UX y utilidad real.",
    valueProposition: "Elegimos alcance, definimos roadmap y avanzamos con entregas claras.",
    hubSubtitle:
      "Colección de herramientas interactivas, calculadoras y utilidades de uso directo diseñadas con foco en velocidad, claridad y experiencia de usuario.",
  },
  about: {
    primaryBio:
      "Estoy construyendo mi camino como desarrollador web y mobile, combinando bases técnicas sólidas con una mirada fuerte en experiencia de usuario. Me gusta iterar rápido, aprender en cada entrega y transformar ideas en soluciones claras.",
    productVision:
      "Busco crecer proyecto a proyecto: mejor código, mejor comunicación y mejor producto final. Para mí, una solución vale más cuando es útil, accesible y fácil de usar para personas reales.",
    methodology: [
      {
        step: "01",
        title: "Definición de Alcance",
        description:
          "Aterrizamos la idea en objetivos concretos, priorizando las funciones que aportan valor inmediato al usuario.",
      },
      {
        step: "02",
        title: "Roadmap & Arquitectura",
        description:
          "Seleccionamos el stack adecuado (Web o Mobile) con una base modular fácil de mantener y escalar.",
      },
      {
        step: "03",
        title: "Entregas Claras",
        description:
          "Avanzamos mediante iteraciones visibles y funcionales, validando la experiencia de usuario en cada paso.",
      },
    ],
  },
  stack: [
    {
      category: "Frontend & Web",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3"],
    },
    {
      category: "Mobile & Cross-Platform",
      items: ["Flutter", "Dart", "React Native", "Diseño Responsivo / Adaptativo"],
    },
    {
      category: "Herramientas & Flujo de Trabajo",
      items: ["Git & GitHub", "Arquitectura Modular", "UX/UI Técnico", "Optimización Web"],
    },
  ],
  contact: {
    title: "Contame tu idea y lo construimos",
    description:
      "Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales. Elegimos alcance, definimos roadmap y avanzamos con entregas claras.",
  },
  links: {
    instagram: "https://www.instagram.com/jereeojeda/",
    github: "https://github.com/JeremiasOjeda",
    linkedin: "https://www.linkedin.com/in/jeremias-ojeda",
    website: "https://soyjere.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;

