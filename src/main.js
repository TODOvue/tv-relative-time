import { createApp } from 'vue'
import { TvDemo } from '@todovue/tv-demo'
import TvRelativeTime from './demo/Demo.vue'
import '@todovue/tv-demo/style.css'

const app = createApp(TvRelativeTime)
app.component('TvDemo', TvDemo)
app.mount('#tv-relative-time')
