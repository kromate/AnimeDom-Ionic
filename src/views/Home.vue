<template>
  <IonContent class="mx-auto">
    <div class="flex bg-black mx-auto w-100 ">
      <main class="flex-col mx-auto container" v-if="recentAnimeList.length">
        <div>
          <h1 class="green text-4xl font-bold mb-3">Recent</h1>
          <div class="flex flex-wrap justify-start ac">
            <animeCard v-for="n in recentAnimeList" :data="n" :key="n" type="recent" />
          </div>
        </div>
        <div>
          <h1 class="green text-4xl font-bold mb-3">Popular</h1>
          <div class="flex flex-wrap justify-start ac">
            <animeCard v-for="n in popularAnimeList" :data="n" :key="n" type="popular" />
          </div>
        </div>
      </main>

      <div v-else class="mx-auto mt-5">
        <Loader />
      </div>
    </div>
  </IonContent>
</template>

<script>
import { IonContent } from "@ionic/vue";
import animeCard from "@/components/animeCard.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: { animeCard, IonContent, Loader },
  data() {
    return {
      listening: false,
      recentAnimeList: [],
      popularAnimeList: [],
    };
  },
  methods: {
    init() {
      fetch(`https://anime-web-scraper.herokuapp.com/recent/?page=1`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.recentAnimeList = data;
          //   this.$store.commit("addsearchedRes", data);
          //   this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong");
          this.loading = false;
        });
      fetch(`https://anime-web-scraper.herokuapp.com/popular/?page=1`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.popularAnimeList = data;
          //   this.$store.commit("addsearchedRes", data);
          //   this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong");
          this.loading = false;
        });
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped>
@media screen and (max-width: 406px) {
  .ac {
    justify-content: center;
  }
}

h3 {
  font-family: "KoHo", sans-serif;
}
main {
  padding: 6px;
}
.w-100 {
  width: 100vw;
  min-height: 100vh;
}
</style>
