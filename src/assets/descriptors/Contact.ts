export const descriptorContact: Record<string, any[]> = {
    name: [
      {
        required: true,
        message: "El nombre es obligatorio",
      },
    ],
    email: [
      {
        required: true,
        message: "El email es obligatorio",
        type: "email",
      },
    ],
    affair: [
      {
        required: true,
        message: "El asunto es obligatorio",
      },
    ],
    message: [
      {
        required: true,
        message: "El mensaje es obligatorio",
      },
    ],
  };
  