import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './styles/styles.scss'

const app = createApp(App)
app.use(router)
// app.use(store)
<<<<<<< HEAD
=======

>>>>>>> bd1061716c058c14f6716467b9676673fde5f007
app.use(ElementPlus)
app.mount('#app')
