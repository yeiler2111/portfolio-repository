const { configure } = require('quasar/wrappers')

module.exports = configure(() => ({
  plugins: ['Dialog', 'Notify'],
  components: [
    'QBtn',
    'QCard',
    'QCardSection',
    'QChip',
    'QSeparator',
    'QSlideTransition',
    'QTimeline',
    'QTimelineEntry'
  ],
  extras: ['material-icons']
}))
