<template>
  <IonContent>
    <div class="container text-center mx-auto text-white flex flex-col items-center justify-center">
      <h1 class="text-3xl">Hello 👋👋</h1>
      <p class="max-w-2xl mt-6 px-2">
        So you clicked on the little bell at the top right corner of the screen and were navigated
        to this page, subarashii. <br />
        There is really nothing to see here, you know. Just me playing around as usual Before you
        leave, if you are a developer and you write vue js and would love to contribute to this
        project, check it out on GitHub
        <a href="https://github.com/kromate/AnimeDom-Ionic" class="text-l green font-bold">here.</a>
        <br />
        <br />
        Ah yes, I haven't introduced myself yet 💆. I'm Kromate, a full stack Javascript developer
        and I built both the frontend and backend of this application. I've also built some really
        cool stuff. You can check them out on my
        <a href="https://github.com/kromate" class="text-l green font-bold">GitHub</a> or my
        <a href="https://kromate.github.io/portfolio/" class="text-l green font-bold">portfolio</a>.
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
