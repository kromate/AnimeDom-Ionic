<template>
      <ion-header :translucent="true" v-if="true">
      <ion-toolbar>
        <ion-title>{{ $route.name }}</ion-title>

        <ion-buttons slot="start">
          <ion-menu-button menu="main-menu" :auto-hide="false"> </ion-menu-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button @click="logout()" v-if="user">
            <ion-icon :icon="logOut" class="IonSize"></ion-icon>
          </ion-button>
          <ion-button @click="authModal = true" v-else>
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
</template>

<script>
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon} from "@ionic/vue";
import { notifications, logOut, logIn } from "ionicons/icons";
import { computed } from 'vue'
import { useStore } from 'vuex'


export default {
name: "TopHeader",
components:{
       IonHeader,IonIcon, IonTitle,
    IonToolbar, IonButtons, IonMenuButton,
     IonButton,
},

methods:{
      logout() {
      this.$store.commit("logOut");
    },
},

setup(){
  const store = useStore()
   const authModal = computed({
         get() {
        return store.state.authModal;
      },
      set(value) {
        store.state.authModal = value;
      },
   })

   const user = computed(()=> store.state.user)

return{
      logIn, logOut, notifications,
      authModal, user
}
},


mounted(){
  console.log(
    this
  );
}

}
</script>

<style>

</style>