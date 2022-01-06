<template>
  <IonContent class="mx-auto">
    <div class="flex bg-black mx-auto w-100 ">
      <main class="flex-col mx-auto container" v-if="true">
        <div>
          <h1 class="green text-4xl font-bold mb-3 pl-4">Search</h1>
          <div class="container__item">
            <form class="form" @submit.prevent="search()" @keyup.enter="search()">
              <input
                type="text"
                class="form__field"
                placeholder="Your an Anime Name"
                v-model="searchValue"
              />
              <button
                type="button"
                class="btn btn--primary btn--inside uppercase"
                @click="search()"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div>
          <h1 class="green md:text-2xl  font-bold my-3 pl-4">{{ title }}</h1>
          <div class="flex flex-wrap md:justify-start justify-between w-full px-4 gap-5">
            <searchCard v-for="n in searchAnimeList" :data="n" :key="n" type="popular" />
          </div>
          <Loader v-if="loading" />
        </div>
      </main>
    </div>
  </IonContent>
</template>

<script>
import { IonContent } from "@ionic/vue";
import searchCard from "@/components/searchCard.vue";
export default {
  components: { searchCard, IonContent },
  data() {
    return {
      loading: false,
      searchValue: "",
    };
  },
  computed: {
    searchAnimeList() {
      return this.$store.state.searchAnimeList;
    },
    title() {
      return this.$store.state.searchTitle;
    },
  },
  methods: {
    search() {
      this.$store.commit("changeSearchTitle", "searching...");
      this.loading = true;
      this.searchAnimeList = [];
      let value = encodeURIComponent(this.searchValue);

      fetch(`https://anime-web-scraper.herokuapp.com/search/?name=${value}`)
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit(
            "changeSearchTitle",
            `showing ${data.length} animes for ${this.searchValue}`
          );
          this.loading = false;
          this.$store.commit("addSearchAnimeList", data);
        })
        .catch((err) => {
          console.log(err);
           this.$store.commit("changeErrorModal", true);
          this.$store.commit("changeSearchTitle", `Oops, Something went Wrong. Try again later`);
          this.loading = false;
        });
    },
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

.uppercase {
  text-transform: uppercase;
}

.btn {
  display: inline-block;
  background: transparent;
  color: inherit;
  font: inherit;
  border: 0;
  outline: 0;
  padding: 0;
  transition: all 200ms ease-in;
  cursor: pointer;
}
.btn--primary {
  background: #18540f;
  color: #fff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 8px 36px;
}
.btn--primary:hover {
  background: #648e33;
  box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
}
.btn--primary:active {
  background: #7f8ff4;
  box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
}
.btn--inside {
  margin-left: -90px;
}

.form__field {
  max-width: 80vw;
  width: 360px;
  background: #fff;
  color: #423e3e;
  font: inherit;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  padding: 13px 18px;
}
</style>
