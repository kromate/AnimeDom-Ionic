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
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGE_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASURE_ID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


const app =
createApp(App).use(store).use(IonicVue).use(router).component('Modal', Modal).component('Loader', Loader);

router.isReady().then(() => {
  app.mount('#app');
});