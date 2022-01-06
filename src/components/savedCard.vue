<template>
  <article class="flex flex-col text-white  my-3 justify-between  items-center">
    <LastViewModal :showModal="showModal" :count="data.count" @close="showModal = false"/>
    <div class="movie-card__image">
      <img :src="data.img" alt="Poster for Project Power" />
    </div>
    <div class="movie-card__details">
      <h4 class="movie-card__details__title text-l text-center ">{{ comp(data.link) }}</h4>
      <div class="flex items-center justify-center mt-2">
        <button
          style="flex-basis:60"
          class="nominate-button movie-btn w-100"
          :href="data.link"
          @click="direct(data.link, data.img)"
        >
          View
        </button>
        <button
          style="flex-basis:30"
          class="ml-2 del"
          @click="showModal = true;"
        >
          <ion-icon :icon="eye"></ion-icon>
        </button>
        <button
          style="flex-basis:30"
          class="ml-2 del"
          :href="data.link"
          @click="del(data.link, data.img, data.count)"
        >
          <ion-icon :icon="trash"></ion-icon>
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { trash, eye } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import LastViewModal from "./LastViewModal.vue";
export default {
  name: "animeCard",
  components: {  IonIcon, LastViewModal },

  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      link: "",
      trash,eye,
    };
  },
  methods: {
    del(link, image, count) {
      this.$store.commit("selectedSavedAnime", { link: link, img: image, count:count  });
      this.$store.dispatch("delAnime").then(() => {
        this.$emit("reload");
      });
    },
    comp(value) {
      return value.split("/")[2];
    },
    getLinks(link) {
      let uplink = encodeURIComponent(link.trim());
      this.link = uplink;
      this.showModal = true;
    },
    direct(link, image) {
      this.$router.push({
        name: "Detail",
        query: { link: link, image: image },
      });
    },
  },
};
</script>

<style >
.movie-card {
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-right: 1.25em;
  margin-bottom: 2.5rem;
  justify-content: space-between;
}
@media screen and (max-width: 406px) {
  .movie-card {
    flex-basis: 50%;
    margin-right: 0;
  }
}
.movie-card__image {
  height: auto;
  width: 150px;
  object-fit: cover;
}

.movie-card .disabled {
  pointer-events: none;
  cursor: not-allowed;
  background-color: rgba(27, 27, 27, 0.62);
  border-color: rgba(27, 27, 27, 0.62);
}

.nominate-button {
  width: 100%;
  background: #18540f;
  color: #fff;
  text-transform: uppercase;
  border: none;
  padding: 0.7rem 0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  font-size: 0.7rem;
  overflow: hidden;
  position: relative;
  transition: background 0.2s linear;
  cursor: pointer;
}
.movie-card__details {
  width: 150px;
}
.del {
  width: 42px;
  height: 38.5px;
  /* margin: 1rem 0 0; */
  background: #18540f;
  color: #fff;
  border: none;
  padding: 0.2rem 0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  font-size: 0.7rem;
  overflow: hidden;
  position: relative;
  transition: background 0.2s linear;
  cursor: pointer;
}
</style>
