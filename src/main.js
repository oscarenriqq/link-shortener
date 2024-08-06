import './assets/main.css'

import { addIcons, OhVueIcon } from 'oh-vue-icons'
import { BiGithub } from "oh-vue-icons/icons"

addIcons(BiGithub)

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.mount('#app')
