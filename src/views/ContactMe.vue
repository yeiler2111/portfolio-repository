<template>
  <main id="main-content" class="contact-page" tabindex="-1">
    <section class="contact-section">
      <div class="contact-container">
        <!-- Header -->
        <div class="contact-header">
          <h1 class="heading-2">{{ t(ui.contactPage.title) }}</h1>
          <p class="contact-description">{{ t(ui.contactPage.description) }}</p>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="sendMessage" class="contact-form" novalidate>
          <!--
            Honeypot anti-spam: invisible y fuera del orden de tabulación para
            personas, pero los bots que rellenan todos los campos del formulario
            sí lo completan. Si trae valor, se descarta el envío en silencio.
            La clave pública de EmailJS es visible en el bundle (es inevitable
            con EmailJS), así que conviene además activar el filtro de dominios
            permitidos en su panel.
          -->
          <div class="hp-field" aria-hidden="true">
            <label for="company-website">No completar este campo</label>
            <input
              id="company-website"
              v-model="honeypot"
              type="text"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <!-- Name Field -->
          <div class="form-group">
            <label for="name" class="form-label">
              {{ t(ui.contactPage.name) }}
              <span class="text-error">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              :placeholder="t(ui.contactPage.namePlaceholder)"
              :class="['input', { 'input-error': errors.name }]"
              aria-required="true"
              :aria-invalid="Boolean(errors.name)"
              :aria-describedby="errors.name ? 'name-error' : undefined"
            />
            <p v-if="errors.name" id="name-error" class="form-error">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <label for="email" class="form-label">
              {{ t(ui.contactPage.email) }}
              <span class="text-error">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              :placeholder="t(ui.contactPage.emailPlaceholder)"
              :class="['input', { 'input-error': errors.email }]"
              aria-required="true"
              :aria-invalid="Boolean(errors.email)"
              :aria-describedby="errors.email ? 'email-error' : undefined"
            />
            <p v-if="errors.email" id="email-error" class="form-error">
              {{ errors.email }}
            </p>
          </div>

          <!-- Subject Field -->
          <div class="form-group">
            <label for="affair" class="form-label">
              {{ t(ui.contactPage.subject) }}
              <span class="text-error">*</span>
            </label>
            <input
              id="affair"
              v-model="form.affair"
              type="text"
              :placeholder="t(ui.contactPage.subjectPlaceholder)"
              :class="['input', { 'input-error': errors.affair }]"
              aria-required="true"
              :aria-invalid="Boolean(errors.affair)"
              :aria-describedby="errors.affair ? 'affair-error' : undefined"
            />
            <p v-if="errors.affair" id="affair-error" class="form-error">
              {{ errors.affair }}
            </p>
          </div>

          <!-- Message Field -->
          <div class="form-group">
            <label for="message" class="form-label">
              {{ t(ui.contactPage.message) }}
              <span class="text-error">*</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="6"
              :placeholder="t(ui.contactPage.messagePlaceholder)"
              :class="['input', { 'input-error': errors.message }]"
              aria-required="true"
              :aria-invalid="Boolean(errors.message)"
              :aria-describedby="errors.message ? 'message-error' : undefined"
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
            <span v-if="!isSubmitting">{{ t(ui.contactPage.send) }}</span>
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
              {{ t(ui.contactPage.sending) }}
            </span>
          </button>
        </form>

        <!-- Social Networks -->
        <div class="social-section">
          <h2 class="heading-4 mb-6">{{ t(ui.contactPage.findMeAlso) }}</h2>
          <NetworkingContact />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { descriptorContact } from "@/assets/descriptors/Contact";
import NetworkingContact from "@/components/home/networkingContact.vue";
import { t } from "@/i18n";
import { ui } from "@/i18n/ui";
import { sendEmail } from "@/services/email.services";
import type { ContactForm, EmailData, ValidationErrors } from "@/utils/types";
import Validator from "@/utils/Validator";
import { useToast } from "@/composables/useToast";
import { reactive, ref } from "vue";

const toast = useToast();


const form = reactive<ContactForm>({
  name: "",
  email: "",
  affair: "",
  message: "",
});

const errors = ref<ValidationErrors>({});
const isSubmitting = ref<boolean>(false);
/** Campo trampa: solo un bot lo rellena. Ver el comentario en el template. */
const honeypot = ref<string>("");


const validateForm = async (): Promise<{
  validated: boolean;
  errors: ValidationErrors;
}> => {
  const validator = new Validator(descriptorContact);
  const { validated, errors: validationErrors } = await validator.run(form);

  if (!validated) {
    errors.value = validationErrors;

    toast.error(t(ui.contactPage.validationError), 3000);
  }

  return { validated, errors: validationErrors };
};


const sendMessage = async (): Promise<void> => {
  // Bot detectado: fingimos éxito para no darle pistas y no gastamos cuota.
  if (honeypot.value) {
    toast.success(t(ui.contactPage.success), 5000);
    return;
  }

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

    await sendEmail(emailData);

    toast.success(t(ui.contactPage.success), 5000);

    
    Object.assign(form, {
      name: "",
      email: "",
      affair: "",
      message: "",
    });
  } catch (error) {
    console.error("Error al enviar mensaje:", error);

    toast.error(t(ui.contactPage.sendError), 5000);
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

/* Oculto para personas pero visible para bots (no usa display:none,
   que algunos bots detectan y saltan). */
.hp-field {
  @apply absolute w-px h-px -m-px p-0 overflow-hidden whitespace-nowrap border-0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
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
