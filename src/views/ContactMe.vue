<template>
  <div class="contact-page">
    <section class="contact-section">
      <div class="contact-container">
        <!-- Header -->
        <div class="contact-header">
          <h1 class="heading-2">Contáctame</h1>
          <p class="contact-description">
            Completa el formulario y me pondré en contacto contigo lo antes
            posible
          </p>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="sendMessage" class="contact-form" novalidate>
          <!-- Name Field -->
          <div class="form-group">
            <label for="name" class="form-label">
              Nombre completo
              <span class="text-error">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Tu nombre"
              :class="['input', { 'input-error': errors.name }]"
              aria-required="true"
              aria-describedby="name-error"
            />
            <p v-if="errors.name" id="name-error" class="form-error">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <label for="email" class="form-label">
              Correo Electrónico
              <span class="text-error">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="tu@email.com"
              :class="['input', { 'input-error': errors.email }]"
              aria-required="true"
              aria-describedby="email-error"
            />
            <p v-if="errors.email" id="email-error" class="form-error">
              {{ errors.email }}
            </p>
          </div>

          <!-- Subject Field -->
          <div class="form-group">
            <label for="affair" class="form-label">
              Asunto
              <span class="text-error">*</span>
            </label>
            <input
              id="affair"
              v-model="form.affair"
              type="text"
              placeholder="¿De qué trata tu mensaje?"
              :class="['input', { 'input-error': errors.affair }]"
              aria-required="true"
              aria-describedby="affair-error"
            />
            <p v-if="errors.affair" id="affair-error" class="form-error">
              {{ errors.affair }}
            </p>
          </div>

          <!-- Message Field -->
          <div class="form-group">
            <label for="message" class="form-label">
              Mensaje
              <span class="text-error">*</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="6"
              placeholder="Escribe tu mensaje aquí..."
              :class="['input', { 'input-error': errors.message }]"
              aria-required="true"
              aria-describedby="message-error"
            ></textarea>
            <p v-if="errors.message" id="message-error" class="form-error">
              {{ errors.message }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="btn-primary w-full"
            :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
          >
            <span v-if="!isSubmitting">Enviar Mensaje</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg
                class="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          </button>
        </form>

        <!-- Social Networks -->
        <div class="social-section">
          <h2 class="heading-4 mb-6">También puedes encontrarme en</h2>
          <NetworkingContact />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { descriptorContact } from "@/assets/descriptors/Contact";
import NetworkingContact from "@/components/home/networkingContact.vue";
import { sendEmail } from "@/services/email.services";
import type { ContactForm, EmailData, ValidationErrors } from "@/utils/types";
import Validator from "@/utils/Validator";
import { useQuasar } from "quasar";
import { reactive, ref } from "vue";

const $q = useQuasar();


const form = reactive<ContactForm>({
  name: "",
  email: "",
  affair: "",
  message: "",
});

const errors = ref<ValidationErrors>({});
const isSubmitting = ref<boolean>(false);


const validateForm = async (): Promise<{
  validated: boolean;
  errors: ValidationErrors;
}> => {
  const validator = new Validator(descriptorContact);
  const { validated, errors: validationErrors } = await validator.run(form);

  if (!validated) {
    errors.value = validationErrors;

    $q.notify({
      message: "Por favor, completa todos los campos correctamente.",
      timeout: 3000,
      position: "top",
      color: "negative",
      icon: "warning",
    });
  }

  return { validated, errors: validationErrors };
};


const sendMessage = async (): Promise<void> => {
  
  errors.value = {};

  
  const { validated, errors: validationErrors } = await validateForm();

  if (!validated) {
    errors.value = validationErrors;
    return;
  }

  
  isSubmitting.value = true;

  try {
    const emailData: EmailData = {
      to_name: form.name,
      reply_to: form.email,
      from_name: form.affair,
      message: form.message,
    };

    const res = await sendEmail(emailData);

    $q.notify({
      message:
        res?.status === 201
          ? "¡Mensaje enviado exitosamente! Te responderé pronto."
          : "Mensaje enviado con éxito.",
      timeout: 4000,
      color: "positive",
      position: "top",
      icon: "check_circle",
    });

    
    Object.assign(form, {
      name: "",
      email: "",
      affair: "",
      message: "",
    });
  } catch (error) {
    console.error("Error al enviar mensaje:", error);

    $q.notify({
      message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      timeout: 3000,
      color: "negative",
      position: "top",
      icon: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped lang="postcss">
.contact-page {
  @apply min-h-screen bg-gray-50 dark:bg-gray-950 
         py-20 px-4 transition-colors duration-300;
}

.contact-section {
  @apply flex justify-center items-start;
}

.contact-container {
  @apply w-full max-w-3xl mx-auto;
}


.contact-header {
  @apply text-center mb-12;
}

.contact-description {
  @apply text-lg text-gray-600 dark:text-gray-400 mt-4;
}


.contact-form {
  @apply bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
         rounded-2xl shadow-md p-8 md:p-10 space-y-6 mb-12 transition-colors;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-semibold text-gray-700 dark:text-gray-300;
}

.form-error {
  @apply text-error text-sm mt-1 animate-slide-up;
}


.social-section {
  @apply bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
         rounded-2xl shadow-md p-8 text-center transition-colors;
}
</style>
