<template>
  <IonContent class="mx-auto">
    <div class="flex bg-black mx-auto w-100 ">
      <main class="flex-col mx-auto container" v-if="recentAnimeList.length">
        <div>
          <h1 class="green text-4xl font-bold pl-4">Recent</h1>
          <div class="flex flex-wrap md:justify-start justify-between w-full px-4 gap-5">
            <animeCard v-for="n in recentAnimeList" :data="n" :key="n" type="recent" class="" />
          </div>
        </div>
        <div class="mt-12">
          <h1 class="green text-4xl font-bold pl-4">Popular</h1>
          <div class="flex flex-wrap  md:justify-start justify-between w-full px-4 gap-5 ">
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
export default {
  name:"HomePage",
  components: { animeCard, IonContent },
  data() {
    return {
      listening: false,
    };
  },
  computed: {
    recentAnimeList() {
      return this.$store.state.recentAnimeList;
    },
    popularAnimeList() {
      return this.$store.state.popularAnimeList;
    },
  },
  methods: {
    init() {
      if (!this.recentAnimeList.length) {
        fetch(`https://anime-web-scraper.herokuapp.com/recent/?page=1`)
          .then((response) => response.json())
          .then((data) => {
            this.$store.commit("addRecentAnimeList", data);
          })
          .catch((err) => {
            console.log(err);
             this.$store.commit("changeErrorModal", true);
            this.loading = false;
          });
      }
      if (!this.popularAnimeList.length) {
        fetch(`https://anime-web-scraper.herokuapp.com/popular/?page=1`)
          .then((response) => response.json())
          .then((data) => {
            this.$store.commit("addPopularAnimeList", data);
          })
          .catch((err) => {
            console.log(err);
            this.$store.commit("changeErrorModal", true);
            this.loading = false;
          });
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>


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
