import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { clickOutsideDirective, close } from './directives'
import LottieVuePlayer from "@lottiefiles/vue-lottie-player"
import './styles/styles.scss'

const app = createApp(App)

app.directive('click-outside', {
    mounted(el, { value: cb }) {
        el.clickOutside = ({ clientX, clientY }) => {
            const { left, top, width, height } = el.getBoundingClientRect()
            if (
                !(clientX > left &&
                    clientX < left + width &&
                    clientY > top &&
                    clientY < top + height)
            ) {
                cb()
                console.log('outside')
            } else {
                console.log('inside')
            }
        }
        setTimeout(() => {
            document.addEventListener('click', el.clickOutside)
        }, 0)
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutside)
    },
})
app.use(LottieVuePlayer)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
console.log(app)