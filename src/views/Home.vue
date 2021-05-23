<template>
  <IonContent class="mx-auto">
    <div class="flex bg-black mx-auto">
      <main class="flex-col mx-auto">
        <h3 class="green text-3xl font-bold">Popular</h3>
        <div class="flex flex-wrap justify-start">
          <animeCard v-for="n in 10" :key="n" />
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
h3 {
  font-family: "KoHo", sans-serif;
}
main {
  padding: 2rem;
  overflow-y: auto;
}
</style>
