import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';

import App from './App.vue';
import router from './router';

import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';

import 'quasar/src/css/index.sass';

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
});

app.use(createPinia());
app.use(router);

app.config.globalProperties.$VITE_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

app.mount('#app');
