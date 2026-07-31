import type { Localized } from "@/i18n";

/**
 * Calcula la duración de un puesto a partir de sus fechas.
 *
 * Antes la duración estaba escrita a mano ("8 meses" en el puesto actual), así
 * que quedaba desactualizada cada mes sin que nadie lo notara. Con las fechas
 * como fuente de verdad el texto se mantiene solo.
 *
 * `start` y `end` van en formato "YYYY-MM". Si `end` se omite, el puesto se
 * considera vigente y se cuenta hasta hoy.
 */
export const monthsBetween = (start: string, end?: string): number => {
  const [startYear, startMonth] = start.split("-").map(Number);

  let endYear: number;
  let endMonth: number;
  if (end) {
    [endYear, endMonth] = end.split("-").map(Number);
  } else {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  }

  // +1 para que un puesto de "ene a ene" cuente como 1 mes y no como 0.
  return Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth) + 1);
};

/** Formatea una cantidad de meses como "1 año y 3 meses" / "1 year 3 months". */
export const formatDuration = (months: number): Localized => {
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const es: string[] = [];
  const en: string[] = [];

  if (years > 0) {
    es.push(`${years} ${years === 1 ? "año" : "años"}`);
    en.push(`${years} ${years === 1 ? "year" : "years"}`);
  }
  if (rest > 0) {
    es.push(`${rest} ${rest === 1 ? "mes" : "meses"}`);
    en.push(`${rest} ${rest === 1 ? "month" : "months"}`);
  }

  return { es: es.join(" y "), en: en.join(" ") };
};

const MONTHS_ES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];
const MONTHS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Formatea el rango como "Dic 2025 – Actualidad" / "Dec 2025 – Present". */
export const formatDateRange = (start: string, end?: string): Localized => {
  const [startYear, startMonth] = start.split("-").map(Number);
  const from = {
    es: `${MONTHS_ES[startMonth - 1]} ${startYear}`,
    en: `${MONTHS_EN[startMonth - 1]} ${startYear}`,
  };

  if (!end) {
    return {
      es: `${from.es} – Actualidad`,
      en: `${from.en} – Present`,
    };
  }

  const [endYear, endMonth] = end.split("-").map(Number);
  return {
    es: `${from.es} – ${MONTHS_ES[endMonth - 1]} ${endYear}`,
    en: `${from.en} – ${MONTHS_EN[endMonth - 1]} ${endYear}`,
  };
};
