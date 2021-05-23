<template>
  <IonContent class="">
    <div class="flex bg-black">
      <main class="flex-col">
        <h3 class="green text-3xl ">Popular</h3>
        <div class="flex flex-wrap justify-center">
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
main {
  padding: 2rem;
  overflow-y: auto;
}
</style>
