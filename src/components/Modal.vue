<template>
  <transition name="slide" appear>
    <div class="bg" v-if="modal" @click="close($event)">
      <div>
        <div class="card" v-if="!loading">
          <a>
            Name
          </a>
        </div>

        <div v-else>
          <Loader />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Loader from "@/components/Loader.vue";
export default {
  components: { Loader },
  name: "success",
  props: ["showModal"],
  data() {
    return {
      loading: false,
      options: [],
      downloadMode: localStorage.getItem("mode") == "Download",
    };
  },

  methods: {
    close() {
      this.$emit("close");
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
