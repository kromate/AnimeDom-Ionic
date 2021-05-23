<template>
  <IonContent class="mx-auto">
    <div class="flex bg-black mx-auto w-100 ">
      <main class="flex-col mx-auto container">
        <div>
          <h1 class="green text-4xl font-bold mb-3">Popular</h1>
          <div class="flex flex-wrap justify-start ac">
            <animeCard v-for="n in 10" :key="n" />
          </div>
        </div>
      </main>
    </div>
  </IonContent>
</template>

<script>
import { IonContent } from "@ionic/vue";
import animeCard from "@/components/animeCard.vue";
export default {
  components: { animeCard, IonContent },
  data() {
    return {
      listening: false,
    };
  },
  methods: {
    listen() {
      this.listening = !this.listening;
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
</style>
