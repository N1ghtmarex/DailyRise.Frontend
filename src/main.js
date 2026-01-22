import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router';

var app = createApp(App);

app.use(router);

app.mount('#app');