<template>
  <IonContent>
    <div class="container mx-auto" v-if="data.name">
      <DescriptionModal :showModal="showModal" :link="link" @close="showModal = false" />
      <div class="details mx-2">
        <h2>{{ data.name }}</h2>
        <p class="px-4">
          <span class="title ">
            summary
          </span>
          <br />
          {{ data.summary }}
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
import { IonContent } from "@ionic/vue";
import DescriptionModal from "@/components/DownloadModal.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: { DescriptionModal, Loader, IonContent },
  name: "Details",
  data() {
    return {
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
      console.log("object");
    },
    getEpis(id, start, end, name) {
      this.Episodes = [];
      this.show = true;

      // https://anime-web-scraper.herokuapp.com/episodes/?start=0&end=99&id=1089&name=naruto
      console.log(
        `https://anime-web-scraper.herokuapp.com/episodes/?start=${start}&end=${end}&id=${id}&name=${name}`
      );
      fetch(
        `https://anime-web-scraper.herokuapp.com/episodes/?start=${start}&end=${end}&id=${id}&name=${name}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data");
          console.log(data);
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
      console.log(`https://anime-web-scraper.herokuapp.com/desc/?link=${this.$route.query.link}`);
      fetch(`https://anime-web-scraper.herokuapp.com/desc/?link=${this.$route.query.link}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(data.vidOne);
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
    console.log(this.desc);
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
</style>
