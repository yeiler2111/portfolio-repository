import { init, send } from "@emailjs/browser";

// Inicialización
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

export const sendEmail = async (templateParams: ParamsEmail) => {
  try {
    // Enviar correo al usuario
    const userRes = send(
      process.env.VUE_APP_ID_SERVICES as string,
      process.env.VUE_APP_ID_TEMPLATE as string,
      templateParams as {}
    );

    // Enviar correo al admin
    const adminRes = send(
      process.env.VUE_APP_ID_SERVICES as string,
      process.env.VUE_APP_ID_TEMPLATE_ADMIN as string,
      {
        ...templateParams,
        reply_to: "yeiler2209@gmail.com",
      }
    );

    // Esperar a que ambas llamadas se resuelvan
    const [userResponse, adminResponse] = await Promise.all([userRes, adminRes]);

    console.log("Correos enviados:", userResponse, adminResponse);
    return { userResponse, adminResponse };
  } catch (e) {
    console.error("Error al enviar los correos:", e);
    return e;
  }
};
