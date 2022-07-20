import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
// import store from './store'
=======
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

>>>>>>> 327be542356964f1a73f3a019f75563a480abeba
import './styles/styles.scss'

const app = createApp(App)


app.use(router)
<<<<<<< HEAD
// app.use(store)

=======
app.use(ElementPlus)
>>>>>>> 327be542356964f1a73f3a019f75563a480abeba
app.mount('#app')
