import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { routes } from './routes/routes'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './connections/firebaseConfig'

const app = createApp(App)

app.use(routes)
app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()],
})

app.mount('#app')