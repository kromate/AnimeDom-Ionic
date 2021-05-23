<template>
  <div>
    <label
      :for="cardsIcon.name"
      @click="changeCard(cardsIcon.name)"
      :class="['text-xs', selected == cardsIcon.name ? 'select' : '', 'card']"
    >
      {{ cardsIcon.name }}
    </label>
    <input type="radio" :id="cardsIcon.name" :value="cardsIcon.name" name="item" />

    <!-- <div v-for="(card, index) in cardsImage" :key="index">
      <label
        :for="card.name"
        @click="changeCard(card.name)"
        :class="[selected == card.name ? 'select' : '', 'card']"
      >
        {{ card.name }}
        <img :src="card.img" alt="" class="custom" v-if="loaded" />
        <Loader w="32.02" h="50" b="8" v-else class="custom" />
      </label>
      <input type="radio" :id="card.name" :value="card.name" name="item" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "genreCard",
  data() {
    return {
      inter: "",
      loaded: false,
      selected: "",
    };
  },
  props: {
    cardsIcon: {
      type: Array,
      required: true,
    },
  },

  //   computed: {
  //     selected() {
  //       return this.$store.state.homeCategoryView;
  //     },
  //   },
  methods: {
    changeCard(data) {
      this.selected = data;
      //   this.$store.commit("changeHomeCategoryView", data);
    },
  },
};
</script>

<style scooped>
.select {
  background: #794807d2 !important;
  color: black !important;
  font-weight: 600;
}

@media (max-width: 800px) {
  .catCardCont {
    flex-direction: row;
  }
}
.card {
  padding: 0px 0.8rem;
  background-color: black;
  color: #d79947;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2px;
  border-radius: 2px;

  cursor: pointer;
}
.card + input {
  display: none;
}
label img {
  height: 25px;
  margin-left: 12px;
}
.custom {
  position: relative;
  right: -12px;
  height: 48px;
  border-radius: 4px;
}
</style>
