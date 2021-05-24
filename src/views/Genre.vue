<template>
  <IonContent class="mx-auto">
    <div class="flex bg-black mx-auto w-100 ">
      <main class="flex-col mx-auto container" v-if="genreAnimeList.length">
        <div>
          <h1 class="green text-4xl font-bold mb-3">Genres</h1>
          <div class="flex flex-wrap justify-start ac">
            <genreCard v-for="n in genreAnimeList" :cardsIcon="n" :key="n" class="genreCard" />
          </div>
        </div>
        <div>
          <h1 class="green text-xl font-bold mb-3">{{ selected }}</h1>
          <div class="flex flex-wrap justify-start ac" v-if="!loading">
            <genresListingCard v-for="n in genresAnimeList" :data="n" :key="n" />
          </div>
          <Loader v-else />
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
import genreCard from "@/components/genreCard.vue";
import genresListingCard from "@/components/genresListingCard.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: { genreCard, genresListingCard, IonContent, Loader },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    selected() {
      return this.$store.state.homeCategoryView;
    },
    genreAnimeList() {
      return this.$store.state.genreAnimeList;
    },
    genresAnimeList() {
      return this.$store.state.genresAnimeList;
    },
  },
  watch: {
    selected() {
      this.loading = true;
      fetch(
        `https://anime-web-scraper.herokuapp.com/gl/?link=${this.$store.state.homeCategoryViewLink}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("addGenresAnimeList", data);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong");
          this.loading = false;
        });
    },
  },

  methods: {
    init() {
      fetch(`https://anime-web-scraper.herokuapp.com/genres/`)
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("addGenreAnimeList", data);
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
    if (!this.genreAnimeList.length) {
      this.init();
    }
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
.genreCard {
  width: fit-content;
}
</style>
