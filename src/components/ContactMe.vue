<script setup>
import { ref, reactive } from "vue";
import networkingContact from "./shared/networkingContact.vue";
import Validator from "@/utils/Validator";
import { descriptorContact } from "@/assets/descriptors/Contact";
import { useQuasar } from "quasar";
import { sendEmail } from "@/services/email.services";

const $q = useQuasar();

const form = reactive({
  name: "",
  email: "",
  affair: "",
  message: "",
});

const errors = ref({});

const validateForm = async () => {
  const validator = new Validator(descriptorContact);
  const { validated, errors: validationErrors } = await validator.run(form);
  if (!validated) {
    errors.value = validationErrors;
    console.log(errors.value);
    $q.notify({
      message: "Por favor, completa los campos correctamente.",
      timeout: 3000,
      position: "top",
      color: "red-8",
      icon: "fa fa-exclamation-triangle",
    });
  }
  return { validated: validated, errors: validationErrors };
};

const sendMessage = async () => {
  debugger
  const { validated, errors } = await validateForm();
  if (!validated) {
    errors.value = errors;
    return;
  }
  errors.value = {};

  try {
    const res = await sendEmail({
      to_name: form.name,
      reply_to: form.email,
      from_name: form.affair,
      message: form.message,
    });
    
    $q.notify({
      message: `Transacción Exitosa ${
        res.status == 201
          ? ", enviamos un mensaje a tu correo electrónico!"
          : ""
      }`,
      timeout: 3000,
      color: "green-6",
      position: "top",
      icon: "fa fa-check",
    });
    Object.assign(form, {
      name: "",
      email: "",
      affair: "",
      message: "",
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      message: "Error al enviar el mensaje. Inténtalo de nuevo.",
      timeout: 3000,
      color: "red-8",
      position: "top",
      icon: "fa fa-window-close",
    });
  }
};
</script>

<template>
  <div class="flex justify-center">
    <section
      class="p-6 mt-5 w-3/5 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300"
    >
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Contáctame
      </h1>

      <form @submit.prevent="sendMessage" class="space-y-6">
        <div>
          <label class="text-gray-700 dark:text-gray-300">Nombre</label>
          <input
            v-model="form.name"
            name="name"
            type="text"
            :class="[
              'input-field',
              errors?.name ? 'border-red-500' : 'border-gray-300',
            ]"
          />
          <p v-if="errors?.name" class="text-red-500 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <div>
          <label class="text-gray-700 dark:text-gray-300"
            >Correo Electrónico</label
          >
          <input
            v-model="form.email"
            name="email"
            type="email"
            :class="[
              'input-field',
              errors?.email ? 'border-red-500' : 'border-gray-300',
            ]"
          />
          <p v-if="errors?.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        
        <div>
          <label class="text-gray-700 dark:text-gray-300">Asunto</label>
          <input
            v-model="form.affair"
            name="affair"
            type="text"
            :class="[
              'input-field',
              errors?.affair ? 'border-red-500' : 'border-gray-300',
            ]"
          />
          <p v-if="errors?.affair" class="text-red-500 text-sm mt-1">
            {{ errors.affair }}
          </p>
        </div>
        <div>
          <label class="text-gray-700 dark:text-gray-300">Mensaje</label>
          <textarea
            v-model="form.message"
            name="message"
            rows="4"
            :class="[
              'input-field',
              errors?.message ? 'border-red-500' : 'border-gray-300',
            ]"
          ></textarea>
          <p v-if="errors?.message" class="text-red-500 text-sm mt-1">
            {{ errors.message }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Enviar Mensaje
        </button>
      </form>
      <div class="dark:bg-gray-950 w-100">
        <networkingContact />
      </div>
    </section>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid;
  background-color: #f9fafb;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  border-color: #3b82f6; 
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  outline: none;
}

.dark .input-field {
  background-color: #1f2937; 
  color: #e5e7eb; 
}

.dark .input-field:focus {
  border-color: #60a5fa; /* Azul claro */
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}
</style>
