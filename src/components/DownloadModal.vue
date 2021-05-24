<template>
  <transition name="slide" appear>
    <div class="bg" v-if="modal" @click="close($event)">
      <div class="card" v-if="options.length && !loading">
        <a
          v-for="(ep, index) in options"
          :key="index"
          :href="ep.link"
          target="_blank"
          class="text-sm"
        >
          {{ ep.name }}
        </a>
      </div>

      <div v-else>
        <Loader />
      </div>
    </div>
  </transition>
</template>

<script>
import Loader from "@/components/Loader.vue";
export default {
  components: { Loader },
  name: "success",
  props: ["showModal", "link"],
  data() {
    return {
      loading: false,
      options: [],
    };
  },

  computed: {
    modal() {
      return this.showModal;
    },
  },
  watch: {
    modal() {
      this.getDetails();
    },
  },
  methods: {
    getDetails() {
      this.loading = true;
      this.options = [];
      fetch(`https://anime-web-scraper.herokuapp.com/downloadLink/?link=${this.link}`)
        .then((response) => response.json())
        .then((data) => {
          this.options = data;
          this.loading = false;
          // this.Eload = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          // this.Eload = false;
          this.Error = true;
        });
    },
    close(e) {
      if (e.target.className == "bg") {
        this.$emit("close");
        this.options = [];
        this.loading = true;
      }
    },
  },

  mounted() {
    this.options = [];
    this.loading = true;
  },
  created() {
    this.options = [];
    this.loading = true;
  },
};
</script>

<style scoped>
a {
  background: black;
  margin: 3px;
  color: #359c26;
  padding: 4px;
}
.bg {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(35, 31, 31, 0.893);
  width: 100vw;
  max-width: 100vw;
  min-height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
}
.img {
  width: 100px;
}
.card {
  overflow: hidden;
  padding: 1rem;
  background: white;
  width: 600px;
  max-width: 85vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
  flex-wrap: wrap;
  text-align: center;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: scale(0);
}
</style>
