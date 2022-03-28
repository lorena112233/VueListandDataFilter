import { createApp } from "vue";
import App from "./App.vue";
import Button from './components/Button'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import router from "./router/router";
// import store from "./store/store";

const app = createApp(App);
app.component('button-custom', Button); 
// createApp(App).use(store).use(router).mount("#app");

app.mount("#app");
