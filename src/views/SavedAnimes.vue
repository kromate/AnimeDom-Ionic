<template>
  <IonContent class="mx-auto">
    <div class="flex bg-black mx-auto w-100 ">
      <main class="flex-col mx-auto container" v-if="SavedAnimes.length">
        <div>
          <h1 class="green text-4xl font-bold mb-3">Your Saved Animes</h1>
          <div class="flex flex-wrap justify-start ac">
            <savedCard v-for="n in SavedAnimes" :data="n" :key="n" type="recent" />
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
import savedCard from "@/components/savedCard.vue";
export default {
  components: { savedCard, IonContent },
  data() {
    return {
      listening: false,
    };
  },
  computed: {
    SavedAnimes() {
      return this.$store.state.SavedAnimes;
    },
  },
  methods: {
    init() {
      this.$store.dispatch("getSavedAnimes");
    },
  },
  mounted() {
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
