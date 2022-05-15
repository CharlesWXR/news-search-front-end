import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import AntDesign, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import axios from 'axios'

const app = createApp(App).use(store);

app.use(router);
app.use(AntDesign);

axios.defaults.baseURL = 'http://172.25.120.153:8088/api/';
app.config.globalProperties.$http = axios;

app.use(router).mount('#app');