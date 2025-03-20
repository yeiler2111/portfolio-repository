// src/plugins/quasar.ts
import iconSet from 'quasar/icon-set/fontawesome-v6';

import { Dialog, Notify, Quasar } from "quasar";
import 'quasar/dist/quasar.css';

export default {
  install(app: any) {
    app.use(Quasar, {
      plugins: { Notify, Dialog }, // Agregar el plugin de notificaciones
      iconSet:iconSet

    });

  },
};
