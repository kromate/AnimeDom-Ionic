<template>
  <transition name="slide" appear>
    <div class="bg" v-if="showModal" @click="$emit('close')">
      <ion-card class="card">
        <p v-html="Details"></p>
      </ion-card>
    </div>
  </transition>
</template>

<script>
import { IonCard } from "@ionic/vue";
export default {
  components: { IonCard },
  name: "NotificationCards",
  props: ["showModal", "Details"],
};
</script>

<style scoped>
p {
  font-size: 1rem;
}
.bg {
  position: fixed;
  background-color: rgba(41, 37, 37, 0.568);
  min-width: 100%;
  min-height: 300%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.img {
  width: 100px;
}
.card {
  margin-top: 5rem;
  padding: 1rem;
  width: 420px;
  max-width: 95vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 4px;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: scale(0);
}
</style>
