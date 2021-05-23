<template>
  <IonContent class="mx-auto">
    <div class="flex bg-black mx-auto w-100 ">
      <main class="flex-col mx-auto container" v-if="genreAnimeList.length">
        <div>
          <h1 class="green text-4xl font-bold mb-3">Genres</h1>
          <div class="flex flex-wrap justify-start ac">
            <genreCard v-for="n in genreAnimeList" :cardsIcon="n" :key="n" type="recent" />
          </div>
        </div>
        <!-- <div>
          <h1 class="green text-4xl font-bold mb-3">Popular</h1>
          <div class="flex flex-wrap justify-start ac">
            <genreCard v-for="n in popularAnimeList" :data="n" :key="n" type="popular" />
          </div>
        </div> -->
      </main>

      <div v-else class="mx-auto mt-5">
        <Loader />
      </div>
    </div>
  </IonContent>
</template>

<script>
import { IonContent } from "@ionic/vue";
import genreCard from "@/components/genreCard.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: { genreCard, IonContent, Loader },
  data() {
    return {
      listening: false,
      genreAnimeList: [],
      popularAnimeList: [],
    };
  },
  methods: {
    init() {
      fetch(`https://anime-web-scraper.herokuapp.com/genres/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.genreAnimeList = data;
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
