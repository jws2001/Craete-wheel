import { createApp } from 'vue';
import App from './App.vue';
import sotre from '@/store/index'
import './reset.scss';
import './style.scss';
import 'highlight.js/scss/tokyo-night-dark.scss'
const app = createApp(App);
app.use(sotre);
app.mount('#app');
