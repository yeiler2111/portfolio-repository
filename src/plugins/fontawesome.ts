import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faExclamationTriangle,
  faCheck,
  faWindowClose,
  faServer,
  faCode,
  faNetworkWired,
  faLaptopCode,
  faWind,
  faGem,
  faEnvelope,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import {
  faReact,
  faAngular,
  faVuejs,
  faGitAlt,
  faBootstrap,
  faWhatsapp,
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faExclamationTriangle,
  faCheck,
  faWindowClose,
  faServer,
  faCode,
  faNetworkWired,
  faLaptopCode,
  faWind,
  faGem,
  faEnvelope,
  faBars,
  faReact,
  faAngular,
  faVuejs,
  faGitAlt,
  faBootstrap,
  faWhatsapp,
  faLinkedin,
  faGithub
)

export default {
  install(app: any) {
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
}
