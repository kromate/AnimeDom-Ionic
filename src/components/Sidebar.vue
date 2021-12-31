<template>
  <ion-menu menu-id="main-menu" content-id="main" >
    <ion-content>
      <div class="menu_header"></div>
      <div class="header_content">
        <img src="@/assets/general/Female.png" alt="" />
        <ion-label>
          <h2 class="font-bold tracking-wider">AnimeDom</h2>
          <p>all things anime</p>
        </ion-label>
      </div>

      <div class="action_button">
        <ion-button :class="[mode == 'Download' ? 'download' : 'stream']" @click="switchMode()">
          {{ mode }}
        </ion-button>
      </div>
      <div class="von">
        <ion-list class="menu_items" lines="none">
          <div class="row" style="cursor:pointer" v-if="deferredPrompt" @click="promptInstall">
            <ion-item class="download"> <ion-icon :icon="download"></ion-icon> Install </ion-item>
          </div>
          <router-link to="/home">
            <ion-item> <ion-icon :icon="home"></ion-icon> Home </ion-item>
          </router-link>

          <router-link to="/search">
            <ion-item> <ion-icon :icon="search"></ion-icon>Search</ion-item>
          </router-link>

          <router-link to="/genre">
            <ion-item> <ion-icon :icon="listCircle"></ion-icon>Genre</ion-item>
          </router-link>

          <router-link to="/saved">
            <ion-item> <ion-icon :icon="save"></ion-icon>Saved Animes</ion-item>
          </router-link>

        </ion-list>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import {
  IonIcon,
  IonLabel,
  IonContent,
  IonButton,
  IonMenu,
  IonItem,
  IonList,
  menuController,
} from "@ionic/vue";
import { add, home, search, listCircle, save, download } from "ionicons/icons";
export default {
  name: "Menu",
  components: {
    IonIcon,
    IonLabel,
    IonContent,
    IonButton,
    IonMenu,
    IonItem,
    IonList,
  },
  data() {
    return {
      deferredPrompt: "",
      home,
      download,
      add,
      search,
      listCircle,
      save,
      connected: navigator.onLine,
      mode: localStorage.getItem("mode"),
    };
  },

  computed: {
    changes() {
      return this.$store.state.menu;
    },
  },
  watch: {
    changes() {
      menuController.close("main-menu");
    },
  },

  methods: {
    switchMode() {
      if (localStorage.getItem("mode") == "Download") {
        localStorage.setItem("mode", "Stream");
      } else if (localStorage.getItem("mode") == "Stream") {
        localStorage.setItem("mode", "Download");
      } else {
        localStorage.setItem("mode", "Stream");
      }
      this.changeMode();
    },
    changeMode() {
      if (localStorage.getItem("mode") == null) {
        this.mode = "Download";
      } else {
        localStorage.getItem("mode") == "Download"
          ? (this.mode = "Download")
          : (this.mode = "Stream");
      }
    },
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
    handleConnectionChange() {
      window.addEventListener("offline", () => {
        this.connected = false;
      });
      window.addEventListener("online", () => {
        this.connected = true;
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("logOut");
          this.$router.go({ path: "login" });
        });
    },
  },

  created() {
    this.changeMode();
    this.handleConnectionChange();
    this.listenForInstall();
    this.checkPWA();
  },
};
</script>

<style scoped>
/* .download {
  --background: #18540f;
  color: white;
  box-shadow: 1px 1px 0 #1d8758, 0 0 20px 5px #c0ffe4, inset 2px 2px 0 #d3ffec;
  animation: glow 1s infinite forwards;
} */

/* animates box shadow glow effect */
@keyframes glow {
  0% {
    box-shadow: 1px 1px #18540f, 0 0 20px 5px #8b86df, inset 2px 2px #aba9d3;
  }
  50% {
    box-shadow: 1px 1px #18540f, 0 0 16px 8px #8b86df, inset 2px 2px #aba9d3;
  }
  /* 100% {
    box-shadow: 1px 1px #1d8758, 0 0 20px 5px #8fffcf, inset 2px 2px #d3ffec;
  } */
}
/* animates light across diamond */
@keyframes sheen {
  0%,
  100% {
    left: 0;
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  10% {
    left: calc(100% - 4px);
  }
  11%,
  98% {
    left: 100%;
    opacity: 0;
  }
}
/* .download ion-icon {
  color: white !important;
} */
.action_button {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.menu_items {
  margin: 0px;
}
.menu_items ion-icon {
  margin-right: 20px;
  color: #86979f;
}

.menu_items ion-item {
  padding-left: 20px;
  margin-bottom: 10px;
}

ion-button {
  text-transform: capitalize;
  font-weight: 300;

  --border-radius: 3px;
}
.button-native {
  background: inherit;
}

.download {
  --background: #18540f;
  color: #e1e1e1;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 700;
}
.stream {
  --background: #e1e1e1;
  color: #18540f;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 700;
}
ion-icon {
  margin-right: 1px;
}
img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 7px solid #555297;
  margin-right: 7px;
}
h2 {
  font-weight: 300;
  color: #fff;
}
p {
  font-size: 12px;
  color: #e4e4e4;
  font-weight: 100;
  letter-spacing: 0.4px;
}
.header_content {
  position: absolute;
  top: 30px;
  left: 12px;
  display: flex;
  align-items: center;
}
.menu_header {
  height: 170px;
  width: 350px;
  background-color: #18540f;
  background: linear-gradient(90deg, #319e5d 0%, #18540f 100%);
  box-shadow: 0px 1px 10px rgb(98 140 255 / 50%);
  transform: rotate(359deg);
  border-radius: 10px 10px 10px 43px;
  margin-left: -18px;
  margin-top: -50px;
  margin-bottom: 60px;
}
</style>
