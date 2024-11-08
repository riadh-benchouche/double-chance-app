import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import config from '@/formkit.config'
import App from './App.vue'
import router from './router'
import {createI18n} from 'vue-i18n'
import messages from '@/utils/locales/messages'

const i18n = createI18n({
    locale: "fr",
    messages: messages,
    legacy: false,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
});
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(plugin, defaultConfig(config))

app.mount('#app')
