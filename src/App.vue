<template>
  <ion-app>
    <ion-header :translucent="true" v-if="true">
      <ion-toolbar>
        <ion-title>{{ $route.name }}</ion-title>

        <ion-buttons slot="start">
          <ion-menu-button menu="main-menu"> </ion-menu-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button>
            <router-link to="/notifications">
              <ion-icon :icon="notifications" class="IonSize"></ion-icon>
            </router-link>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <SideBar />
    <router-view id="main" class="router" />
  </ion-app>
</template>

<script>
import SideBar from "@/components/Sidebar.vue";
import { notifications } from "ionicons/icons";
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
</style>
