import type { Testimonial } from "@/utils/types";

/**
 * Prueba social. IMPORTANTE: agrega únicamente testimonios REALES.
 * La sección se oculta automáticamente mientras este array esté vacío
 * (ver Home.vue), así que nunca se muestran datos ficticios.
 *
 * Plantilla para copiar cuando tengas una cita real:
 *
 * {
 *   id: "nombre-empresa",
 *   quote: "Trabajar con Yeiler nos permitió ... (cita textual del cliente).",
 *   author: "Nombre Apellido",
 *   role: "Tech Lead",
 *   company: "Empresa",
 *   avatar: "/img/testimonials/persona.webp", // opcional
 * },
 *
 * Buenas fuentes: recomendaciones de LinkedIn, mensajes de tech leads,
 * feedback de clientes freelance. Pide permiso para citar con nombre + cargo.
 */
export const testimonials: Testimonial[] = [];
