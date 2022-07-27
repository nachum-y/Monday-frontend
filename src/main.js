import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { clickOutsideDirective, close } from './directives'
import './styles/styles.scss'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

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



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)

/* add font awesome icon component */
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
// console.log(app)