<template>
  <IonContent>
    <div class="container mx-auto" v-if="data.name">
      <DescriptionModal :showModal="showModal" :link="link" @close="showModal = false" />
      <div class="details mx-2">
        <h2>{{ data.name }}</h2>

        <p class="px-4">
          <span class="font-bold text-2xl underline ">
            summary
          </span>
          <br />
          {{ data.summary }}
        </p>
        <p>
          <button
            v-if="savedLoading"
            class="nominate-button movie-btn w-100"
            @click="saveAnime({ link: $route.query.link, img: $route.query.image, count:0 })"
          >
            <Loader />
          </button>
          <button
            v-else
            class="nominate-button movie-btn w-100"
            @click="saveAnime({ link: $route.query.link, img: $route.query.image, count:0 })"
          >
            <ion-icon :icon="save" class="text-xl mr-4"></ion-icon> Save for later
          </button>
        </p>

        <p v-if="data.status">
          <span class="font-bold text-2xl underline">
            Status
          </span>
          <br />
          {{ data.status }}
        </p>
        <p v-if="data.otherNames">
          <span class="font-bold text-2xl underline">
            Other Names
          </span>
          <br />
          {{ data.otherNames }}
        </p>

        <p v-if="data.release">
          <span class="font-bold text-2xl underline">
            Release
          </span>
          <br />
          {{ data.release }}
        </p>

        <p v-if="data.type">
          <span class="font-bold text-2xl underline">
            Type
          </span>
          <br />
          {{ data.type }}
        </p>

        <p v-if="data.genre">
          <span class="font-bold text-2xl underline">
            Genre
          </span>
          <br />
          {{ data.genre }}
        </p>

        <div class="epic">
          <span class="font-bold text-2xl underline ept">
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


  <Loader v-else/> 
  
  </IonContent>
</template>

<script>
import { IonContent, IonIcon } from "@ionic/vue";
import DescriptionModal from "@/components/DownloadModal.vue";
import { save } from "ionicons/icons";

export default {
  components: { DescriptionModal, IonContent, IonIcon },
  name: "Details",
  data() {
    return {
      save,
      data: "",
      Episodes: [],
      link: "",
      show: false,
      showModal: false,
      
    };
  },
  computed: {
    desc() {
      return this.$store.state.desc;
    },
    savedLoading() {
      return this.$store.state.savedLoading;
    },
  },

  methods: {
    saveAnime(data) {
      if (this.$store.state.user) {
        this.$store.commit("selectedSavedAnime", data);
        this.$store.dispatch("saveAnime");
      } else {
        this.$store.commit("changeAuthModal", true);
      }
    },

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
          this.$store.commit("changeErrorModal", true);
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
  height: 44px;
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
