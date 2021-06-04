<template>
  <ion-app>
    <ion-header :translucent="true" v-if="true">
      <ion-toolbar>
        <ion-title>{{ $route.name }}</ion-title>

        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
          <ion-menu-button menu="main-menu"> </ion-menu-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button @click="logout()" v-if="user">
            <ion-icon :icon="logOut" class="IonSize"></ion-icon>
          </ion-button>
          <ion-button @click="logout()" v-else>
            <ion-icon :icon="logIn" class="IonSize"></ion-icon>
          </ion-button>
          <ion-button>
            <router-link to="/notifications">
              <ion-icon :icon="notifications" class="IonSize"></ion-icon>
            </router-link>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <SideBar />
    <Modal :showModal="authModal" title="Sign In" sub="you need to sign in to use certain features">
      <div class="mt-3">
        <button class="loginBtn loginBtn--google max-w-xs" @click="google()">
          <span v-if="!g_loading">Login with Google</span>
          <Loader v-else />
        </button>
        <button class="loginBtn loginBtn--twitter max-w-xs" @click="twitter()">
          <span v-if="!t_loading">Login with Twitter</span>
          <Loader v-else />
        </button>
      </div>
    </Modal>
    <Modal :showModal="successModal" title="Successful" sub="You have successfully signed in ">
      <template v-slot:image>
        <ion-icon :icon="checkmarkCircle" class="text-7xl"></ion-icon>
      </template>
    </Modal>
    <router-view id="main" class="router" />
  </ion-app>
</template>

<script>
import { save, checkmarkCircle } from "ionicons/icons";
import firebase from "firebase/app";
import "firebase/auth";
import SideBar from "@/components/Sidebar.vue";
import { notifications, logOut, logIn } from "ionicons/icons";
import {
  IonApp,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
} from "@ionic/vue";
export default {
  name: "App",
  components: {
    IonApp,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    SideBar,
    IonButton,
    IonIcon,
  },

  data() {
    return {
      checkmarkCircle,
      save,
      logIn,
      logOut,
      notifications,
    };
  },

  computed: {
    show() {
      if (this.$route.meta.requiresGuest) {
        return false;
      } else {
        return true;
      }
    },
    user() {
      console.log(this.$store.state.user);
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.commit("logOut");
    },

    twitter() {
      this.t_loading = !this.t_loading;

      const provider = new firebase.auth.TwitterAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          const user = firebase.auth().currentUser;
          this.$store.commit("loginUser", user);
          this.t_loading = !this.t_loading;
        })
        .catch((error) => {
          this.loader = false;
          console.log(error.message);
          this.Error = error.message;
          this.t_loading = !this.t_loading;
        });
    },
    google() {
      this.g_loading = !this.g_loading;

      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          const user = firebase.auth().currentUser;
          this.$store.commit("loginUser", user);
          this.g_loading = !this.g_loading;
          this.authModal = false;
          this.successModal = true;
        })
        .catch((error) => {
          this.g_loading = !this.g_loading;
          this.loader = false;
          console.log(error.message);
          this.Error = error.message;
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "KoHo", sans-serif;
}
body {
  background: #000 !important;
}

.IonSize {
  font-size: 1.5rem;
}
</style>
