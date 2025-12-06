// Entry point of the Vue application. This file initializes Vue, Vuetify,
// and global styles, then mounts the root component (App.vue).
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'

// Importing Vuetify's styles and core library components.
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material Design Icons used by Vuetify.
import '@mdi/font/css/materialdesignicons.css'

// Creating the Vuetify instance with all components and directives registered.
const vuetify = createVuetify({
  components,
  directives,
})

// Creating and mounting the Vue application instance.
// Vuetify is registered globally via .use().
createApp(App).use(vuetify).mount('#app')
