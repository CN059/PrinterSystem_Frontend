// src/plugins/vuetify.ts

import { createVuetify } from 'vuetify'
import 'vuetify/styles' // 引入所有样式
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
})
