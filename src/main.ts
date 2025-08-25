import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'

// 引入样式
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
