import { init, send } from "@emailjs/browser";

// Inicialización con configuración avanzada
init({
    publicKey: process.env.VUE_APP_PUBLIC_KEY,
    blockHeadless: true,
    limitRate: {
        id: "app", 
        throttle: 1000,
    },
});

interface ParamsEmail {
    name: string;
    email: string;
}

export const sendEmail = async (templateParams: ParamsEmail) => {
    try {
        const res = await send(
            process.env.VUE_APP_ID_SERVICES as string,
            process.env.VUE_APP_ID_TEMPLATE as string, 
            templateParams as {} 
        );
        console.log("Correo enviado con éxito:", res);
        return res;
    } catch (e) {
        console.error("Error al enviar el correo:", e);
        return e;
    }
};
