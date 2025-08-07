
import '@quasar/extras/material-icons/material-icons.css'
import { Dialog, Notify, QBtn, QCard, QCardSection, QChip, QSeparator, QSlideTransition, QTimeline, QTimelineEntry, Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

export default {
  install(app: any) {
    app.use(Quasar, {
      plugins: { Dialog, Notify },
      components: {
        QTimeline,
        QTimelineEntry,
        QBtn,
        QCard,
        QCardSection,
        QSeparator,
        QSlideTransition,
        QChip
      }
      
    })
  }
}
