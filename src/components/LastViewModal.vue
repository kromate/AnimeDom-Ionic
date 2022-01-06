<template>
  <transition name="slide" appear>
    <div class="bg" v-if="showModal" @click="close($event)">
      <div >
        <div class="card flex flex-col" v-if="!loading">
            <span class="green text-xl font-bold">
                Comming Soon
            </span>
            <span class="green">
                You stopped at episode: {{count}}
            </span>

            <input type="number" v-model="countIndex" class="shadow-sm h-10 bg-green-900 text-black font-bold px-3 border-gray-300 rounded-lg m-2 outline-none focus:border-green-400"/>

                  <button
                  disabled
          style="flex-basis:60"
          class="nominate-button movie-btn w-100"
        >
          Coming Soon
        </button>
    
        </div>

        <div v-else>
          <Loader />
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: "success",
  props: ["showModal", "count"],
  data() {
    return {
      loading: false,
      options: [],
      countIndex:0,
      // downloadMode: localStorage.getItem("mode") == "Download",
    };
  },

  computed: {
    modal() {
      return this.showModal;
    },
  },
  watch: {
    modal() {
        this.countIndex = this.count
      // this.downloadMode = localStorage.getItem("mode") == "Download";
    },
  },
  methods: {
     close(e) {
      if (e.target.className == "bg") {
        this.$emit("close");
        this.options = [];
        this.loading = true;
      }
    },
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
