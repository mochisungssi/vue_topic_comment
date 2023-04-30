import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from './store'
import plugins from './plugins/globalPlugins'

loadFonts()

const app = createApp({extends: App})

app.use(vuetify)
app.use(router)
app.use(store)
app.use(plugins)
app.mount('#app')
