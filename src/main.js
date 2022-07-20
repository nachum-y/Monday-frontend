import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
// import store from './store'
=======
import store from './store'
>>>>>>> 0ceb178fbba032b74daa695f4a741c68c0d0b15e
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './styles/styles.scss'

const app = createApp(App)


app.use(router)
<<<<<<< HEAD
// app.use(store)
=======
app.use(store)
>>>>>>> 0ceb178fbba032b74daa695f4a741c68c0d0b15e

app.use(ElementPlus)
app.mount('#app')
