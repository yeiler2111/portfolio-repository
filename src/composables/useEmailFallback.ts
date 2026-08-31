import { useToast } from "@/composables/useToast";
import { contact } from "@/data/site";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";

/**
 * Red de seguridad para los enlaces `mailto:`.
 *
 * `mailto:` solo abre algo si el sistema operativo tiene un cliente de correo
 * registrado como manejador del protocolo. En móvil siempre lo hay, así que ahí
 * funciona; en escritorio, quien lee el correo en una pestaña del navegador y
 * no ha registrado un manejador se encuentra con que el clic no produce ningún
 * efecto visible. Tener Gmail abierto no cuenta: el navegador no lo sabe.
 *
 * En vez de sustituir el enlace por una URL de Gmail —que daría por hecho el
 * proveedor de correo del visitante—, se mantiene el `mailto:` y se copia la
 * dirección en el mismo clic. Donde hay cliente, se abre igual; donde no, el
 * visitante al menos se queda con la dirección y un aviso que se lo dice.
 */
export function useEmailFallback() {
  const toast = useToast();

  const message = (key: "emailCopied" | "emailCopyFailed"): string =>
    t(ui.contact[key]).replace("{email}", contact.email);

  /** No previene el evento: si hay manejador de `mailto:`, se abre igual. */
  const copyEmail = async (): Promise<void> => {
    try {
      // `navigator.clipboard` no existe fuera de contexto seguro ni en
      // navegadores antiguos; el aviso con la dirección a la vista es el plan B.
      await navigator.clipboard.writeText(contact.email);
      toast.success(message("emailCopied"));
    } catch {
      toast.info(message("emailCopyFailed"), 8000);
    }
  };

  return { copyEmail, email: contact.email };
}
