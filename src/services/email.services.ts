import { init, send } from "@emailjs/browser";
import { contact } from "@/data/site";

init({
  publicKey: process.env.VUE_APP_PUBLIC_KEY,
  blockHeadless: true,
  limitRate: {
    id: "app",
    throttle: 1000,
  },
});

interface ParamsEmail {
  from_name: string;
  to_name: string;
  reply_to: string;
  message: string;
}

/**
 * Envía dos correos: la confirmación a quien escribe y el aviso al admin.
 *
 * No captura los errores a propósito. Antes había un `catch` que hacía
 * `return e`, así que la promesa siempre resolvía y el `catch` de ContactMe.vue
 * nunca se ejecutaba: un envío fallido mostraba igual el aviso de "mensaje
 * enviado exitosamente" y el mensaje se perdía en silencio. Quien llama debe
 * poder distinguir el éxito del fallo.
 */
export const sendEmail = async (templateParams: ParamsEmail) => {
  const serviceId = process.env.VUE_APP_ID_SERVICES as string;

  const [userResponse, adminResponse] = await Promise.all([
    send(serviceId, process.env.VUE_APP_ID_TEMPLATE as string, {
      ...templateParams,
    }),
    send(serviceId, process.env.VUE_APP_ID_TEMPLATE_ADMIN as string, {
      ...templateParams,
      reply_to: contact.email,
    }),
  ]);

  return { userResponse, adminResponse };
};
