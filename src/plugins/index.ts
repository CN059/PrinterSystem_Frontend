/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'

// Types
import type { App } from 'vue'
import router from '@/router'

export function registerPlugins (app: App) {
  app.use(vuetify).use(router)
}
