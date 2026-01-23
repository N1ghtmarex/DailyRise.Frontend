import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router';

import "./styles/globals.scss";

var app = createApp(App);

app.use(router);

app.mount('#app');