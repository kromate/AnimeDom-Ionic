import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';
import './registerServiceWorker'

import App from './App.vue'
import { IonicVue } from '@ionic/vue';
import Loader from "@/components/Loader.vue";
import Modal from '@/components/Modal.vue';
import { createApp } from 'vue'
import firebase from "firebase/app";
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASURE_ID
};

console.log(import.meta.env);
console.log(firebaseConfig);
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const app =
createApp(App).use(store).use(IonicVue).use(router).component('Modal', Modal).component('Loader', Loader);

router.isReady().then(() => {
  app.mount('#app');
});