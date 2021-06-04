<template>
  <IonContent>
    <div class="container grid place-items-center  mx-auto h-screen">
      <div class="flex flex-col justify-center items-center ">
        <img src="@/assets/general/Female.png" alt="" class="resImg" />

        <p class="text-xl mt-3 text-center">Open source, ads free anime platform</p>
        <button class="nominate-button movie-btn w-100" @click="promptInstall()">
          <ion-icon :icon="download" class="text-xl mr-4"></ion-icon> Click to install
        </button>
      </div>
    </div>
  </IonContent>
</template>

<script>
import { IonContent, IonIcon } from "@ionic/vue";
import { download } from "ionicons/icons";

export default {
  components: { IonContent, IonIcon },
  name: "Details",
  data() {
    return {
      download,
      data: "",
      Episodes: [],
      link: "",
      show: false,
    };
  },

  methods: {
    checkPWA() {
      window.addEventListener("appinstalled", () => {
        console.log("INSTALL: Success");
        this.deferredPrompt = false;
      });
    },
    listenForInstall() {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
      });
    },
    promptInstall() {
      this.deferredPrompt.prompt();
    },
  },

  created() {
    this.listenForInstall();
    this.checkPWA();
  },
};
</script>

<style scoped>
button {
  width: 100%;
  min-width: 180px;
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
.resImg {
  width: 200px;
  height: auto;
}
</style>
