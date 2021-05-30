<template>
  <IonContent>
    <Modal :showModal="true" title="Sign In" sub="you need to sign in to use certain features">
      <div class="mt-3">
        <button class="loginBtn loginBtn--google max-w-xs" @click="google()">
          Login with Google
        </button>
        <button class="loginBtn loginBtn--twitter max-w-xs" @click="twitter()">
          Login with Twitter
        </button>
      </div>
    </Modal>
    <div class="container mx-auto" v-if="data.name">
      <DescriptionModal :showModal="showModal" :link="link" @close="showModal = false" />
      <div class="details mx-2">
        <h2>{{ data.name }}</h2>

        <p>
          <span class="title ">
            summary
          </span>
          <br />
          {{ data.summary }}
        </p>
        <p>
          <button class="nominate-button movie-btn w-100" :href="data.link">
            <ion-icon :icon="save" class="text-xl mr-4"></ion-icon> Save for later
          </button>
        </p>

        <p v-if="data.status">
          <span class="title">
            Status
          </span>
          <br />
          {{ data.status }}
        </p>
        <p v-if="data.otherNames">
          <span class="title">
            Other Names
          </span>
          <br />
          {{ data.otherNames }}
        </p>

        <p v-if="data.release">
          <span class="title">
            Release
          </span>
          <br />
          {{ data.release }}
        </p>

        <p v-if="data.type">
          <span class="title">
            Type
          </span>
          <br />
          {{ data.type }}
        </p>

        <p v-if="data.genre">
          <span class="title">
            Genre
          </span>
          <br />
          {{ data.genre }}
        </p>

        <div class="epic">
          <span class="title ept">
            Episodes
          </span>
          <br />
          <div class="flex flex-wrap justify-center">
            <div
              class="epi"
              v-for="(ep, index) in data.episodes"
              :key="index"
              @click="getEpis(data.id, ep.start, ep.end, data.name)"
            >
              {{ ep.start }} - {{ ep.end }}
            </div>
          </div>
        </div>

        <!-- EPISODES -->
        <div v-if="show" class="epicES">
          <Loader v-if="!Episodes.length" />
          <div
            v-else
            class="epiES"
            v-for="(ep, index) in Episodes"
            :key="index"
            @click="getLinks(ep.link)"
          >
            {{ ep.name }}
          </div>
        </div>
      </div>

      <div class="detImg ">
        <img :src="$route.query.image" alt="" />
      </div>
    </div>

    <div class="container2" v-else>
      <div>
        <Loader w="233.39" h="340" b="8" />
        <p class="lood">loading....</p>
      </div>
    </div>
  </IonContent>
</template>

<script>
import { IonContent, IonIcon } from "@ionic/vue";
import DescriptionModal from "@/components/DownloadModal.vue";
import Loader from "@/components/Loader.vue";
import { save } from "ionicons/icons";
export default {
  components: { DescriptionModal, Loader, IonContent, IonIcon },
  name: "Details",
  data() {
    return {
      save,
      data: "",
      Episodes: [],
      showModal: false,
      link: "",
      show: false,
    };
  },
  computed: {
    desc() {
      return this.$store.state.desc;
    },
  },

  methods: {
    getLinks(link) {
      let uplink = encodeURIComponent(link.trim());
      this.link = uplink;
      this.showModal = true;
    },
    getEpis(id, start, end, name) {
      this.Episodes = [];
      this.show = true;

      // https://anime-web-scraper.herokuapp.com/episodes/?start=0&end=99&id=1089&name=naruto

      fetch(
        `https://anime-web-scraper.herokuapp.com/episodes/?start=${start}&end=${end}&id=${id}&name=${name}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.Episodes = data;
          // this.Eload = false;
        })
        .catch((err) => {
          console.log(err);
          // this.Eload = false;
          this.Error = true;
        });
    },
    getDetails() {
      this.data = {};
      fetch(`https://anime-web-scraper.herokuapp.com/desc/?link=${this.$route.query.link}`)
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.Error = true;
        });
    },
  },
  created() {
    if (this.desc == null && this.$route.query.link == undefined) {
      this.$router.push("/");
    } else {
      this.getDetails();
    }
  },
};
</script>

<style scoped>
.ept {
  margin-bottom: 1rem;
}
.epicES {
  min-height: 140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.epic {
  /* overflow: hidden; */
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 140px;
}
.epiES {
  height: fit-content;

  cursor: pointer;
  display: inline;
  color: #359c26;
  background: black;
  margin: 9px 5px;
  padding: 3px 6px;
  font-size: 1rem;
  font-weight: 600;
}
.epi {
  height: fit-content;
  cursor: pointer;
  display: inline;
  background: #359c26;
  color: black;
  margin: 9px 5px;
  padding: 3px 6px;
  font-size: 1rem;
  font-weight: 600;
}
img {
  position: sticky;
  top: 70px;
  /* right: 54px; */
}
.title {
  font-weight: 700;
  font-size: 1.4rem;
  text-decoration: underline;
}
.priBtn {
  margin: 0px 6px;
  height: 40px;
  border: 1px solid #f4ae53;
  flex-basis: 180px;
  font-size: 2.4rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 2px rgb(0, 0, 0), 2px 4px 2px rgba(0, 0, 0, 0.459);
}
.secBtn {
  flex-basis: 60px;
  margin: 0px 6px;
  height: 38px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.unitBtn {
  margin-top: 10px;
  margin-left: -6px;
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
  color: #f4ae53;
}
.empty {
  font-size: 2rem;
  text-align: center;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.315), 0px 4px 2px rgba(0, 0, 0, 0.541);
  font-weight: 900;
  text-decoration: none;
  width: 260px;
  vertical-align: 20px;
  margin-top: 2rem;
}
.lood {
  font-size: 1.2rem;
  text-align: center;
  font-weight: 600;
  color: #18540f;
}
.text {
  margin-left: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.315), 0px 2px 1px rgba(0, 0, 0, 0.541);
  font-size: 1.3rem;
}
.cartbtn {
  max-width: 180px;
}
.sItem {
  margin: 0px 4px;
  border: 1px solid #18540f;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  font-weight: 400;
  color: #18540f;
}
.size {
  display: flex;
  margin-top: 2rem;
}
h2 {
  margin-top: 1rem;
  font-size: 2.5rem;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.315), 0px 4px 2px rgba(0, 0, 0, 0.541);
}
h1 {
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.315), 0px 4px 2px rgba(0, 0, 0, 0.541);
  font-size: 4rem;
  margin-left: 1rem;
  margin-top: 6rem;
}

.container {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  color: #359c26;
  max-width: 800px;
}
.container2 {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.details {
  order: 2;
  flex-basis: 60%;
  margin: 12px;
  margin-left: 40px;
  max-width: 400px;
}
.detImg {
  order: 1;
  flex-basis: 40%;
  display: flex;
  align-items: flex-start;
}
@media (max-width: 800px) {
  h2 {
    margin-top: 5rem;
    font-size: 1.5rem;
  }
  img {
    position: static;
    max-width: 90%;
  }
  .detImg {
    order: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .details {
    order: 2;
    text-align: center;
    margin: 0px;
    margin-left: 0px;
    max-width: 400px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -65px;
    max-width: 100%;
  }
  .text {
    margin-left: 0px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    flex-direction: column;
  }
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
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
  width: 230px;
  max-width: 80vw;
  height: 42px;
  background-color: #fcfcfc;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2);
  color: black;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}
/* Google */
.loginBtn--google {
  border: 1px solid #ea4335;
  color: #ea4335;
}
.loginBtn--twitter {
  border: 1px solid #00acee;
  color: #00acee;
}
.loginBtn--google:before {
  background: #ea4335;
  background-origin: content-box;
  background-position: center;
  padding: 5px;
}
.loginBtn--twitter:before {
  background: #00acee;
  background-origin: content-box;
  background-position: center;
  padding: 5px;
}
</style>
