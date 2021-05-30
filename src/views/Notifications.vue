<template>
  <IonContent>
    <div class="container text-center mx-auto text-white flex flex-col items-center justify-center">
      <h1 class="text-3xl">Hello 👋👋</h1>
      <p class="max-w-2xl mt-6 px-2">
        So you clicked the little bell on the top right corner of the screen and were navigated to
        this page, Subarashii <br />
        But there is really nothing to see here just me and my jargons. before you leave, if you are
        a developer and you write vue js and would love to contribute to this project, check it out
        on
        <a href="https://github.com/kromate/AnimeDom-Ionic" class="text-l green font-bold"
          >github here</a
        >
        <br />
        <br />
        Ahh yes, just remembered i haven't introduced myself 💆. I'm Kromate,
        <br />A full stack Javascript developer that built both the frontend and backend of this
        application and some other awesome stuff you can check out
        <a href="https://github.com/kromate" class="text-l green font-bold">here on my github</a> or
        my
        <a href="https://kromate.github.io/portfolio/" class="text-l green font-bold">portfolio</a>
      </p>
    </div>
  </IonContent>
</template>

<script>
import { IonContent } from "@ionic/vue";
export default {
  components: { IonContent },
  name: "notification",
};
</script>

<style></style>
