<template>

  <ion-app>
    <TopHeader/>
    <SideBar />
    <Modal
      :showModal="authModal"
      title="Sign In"
      sub="you need to sign in to use certain features"
      @close="authModal = false"
    >
      <div class="mt-3">
        <button class="loginBtn loginBtn--google max-w-xs bg-black" @click="google()">
          <span v-if="!g_loading">Login with Google</span>
          <Loader v-else />
        </button>
        <button class="loginBtn loginBtn--twitter max-w-xs bg-black" @click="twitter()">
          <span v-if="!t_loading">Login with Twitter</span>
          <Loader v-else />
        </button>
      </div>
    </Modal>
    <Modal :showModal="errorModal" title="Error !" :sub="errMsg" @close="errorModal = false">
      <template v-slot:image>
        <ion-icon :icon="warning" class="text-6xl"></ion-icon>
      </template>
    </Modal>
    <Modal
      :showModal="successModal"
      title="Successful"
      sub="Action Successfully perform, tap anywhere to close"
      @close="successModal = false"
    >
      <template v-slot:image>
        <ion-icon :icon="checkmarkCircle" class="text-6xl"></ion-icon>
      </template>
    </Modal>
    <router-view  id="main"/>
  </ion-app>

</template>

<script>
import { save, checkmarkCircle, warning } from "ionicons/icons";
import firebase from "firebase/app";
import "firebase/auth";
import SideBar from "@/components/Sidebar.vue";
import { IonApp, IonIcon} from "@ionic/vue";
import TopHeader from "./components/TopHeader.vue";

export default {
  name: "App",
  components: {
    IonApp,  SideBar,
    IonIcon, TopHeader, 
},

  data() {
    return {
      warning,
      checkmarkCircle,
      save,
      g_loading: false,
      t_loading: false,
      errMsg: "Something went wrong, please try again",
    };
  },

  computed: {
    errorModal: {
      get() {
        return this.$store.state.errorModal;
      },
      set(value) {
        this.$store.state.errorModal = value;
      },
    },
    successModal: {
      get() {
        return this.$store.state.successModal;
      },
      set(value) {
        this.$store.state.successModal = value;
      },
    },

    authModal: {
      get() {
        return this.$store.state.authModal;
      },
      set(value) {
        this.$store.state.authModal = value;
      },
    },

    show() {
      if (this.$route.meta.requiresGuest) {
        return false;
      } else {
        return true;
      }
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {


    twitter() {
      this.t_loading = !this.t_loading;

      const provider = new firebase.auth.TwitterAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          const user = firebase.auth().currentUser;
          this.$store.commit("loginUser", user);
          this.t_loading = !this.t_loading;
          this.authModal = false;
          this.successModal = true;
        })
        .catch((error) => {
          this.loader = false;
          this.errMsg = error.message;
          this.t_loading = !this.t_loading;
          this.errorModal = true;
        });
    },
    google() {
      this.g_loading = !this.g_loading;

      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
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
          this.errMsg = error.message;
          this.errorModal = true;
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "KoHo", sans-serif;
  box-sizing: border-box !important;
}
body {
  background: #000 !important;
}

.IonSize {
  font-size: 1.5rem;
}
button {
  width: 100%;
  min-width: 200px;
  margin: 1rem 0 0;
  background: #18540f;
  color: #fff;
  text-transform: uppercase;
  border: none;
  padding: 0.7rem 0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  font-size: 0.7rem;
  overflow: hidden;
  position: relative;
  transition: background 0.2s linear;
  cursor: pointer;
}
</style>
