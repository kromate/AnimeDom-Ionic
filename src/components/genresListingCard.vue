<template>
  <article class="movie-card md:mr-5 ">
    <div class="movie-card__image">
      <img :src="data.image" alt="Poster for Project Power" />
    </div>
    <div class="movie-card__details">
      <h4 class="movie-card__details__title text-xs text-center">{{ data.name }}</h4>
      <p class="movie-card__details__release-year text-center font-normal text-sm">
        <span>released:</span> <em>{{ data.released }} </em>
      </p>

      <button class="nominate-button movie-btn w-100" @click="direct(data.link, data.image)">
        {{ type == "recent" ? "Download" : "View" }}
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: "genresListingCard",

  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      link: "",
    };
  },
  methods: {
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

<style scoped>
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

.movie-card .nominate-button {
  width: 100%;
  margin: 1rem 0 0;
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
</style>
