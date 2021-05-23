<template>
  <article class="movie-card">
    <div class="movie-card__image">
      <img
        src="https://m.media-amazon.com/images/M/MV5BYzBhOWU4ODAtZDYzYi00NDU1LWIzZWUtNDZmMDgxODljZTVmXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_SX300.jpg"
        alt="Poster for Project Power"
      />
    </div>
    <div class="movie-card__details">
      <h4 class="movie-card__details__title">Project Power</h4>
      <p class="movie-card__details__release-year"><span>Released:</span> <em>2020 </em></p>
      <button aria-label="Nominate movie" disabled="" class="nominate-button movie-btn disabled">
        Nominated <i class="far fa-check-circle"></i>
      </button>
    </div>
  </article>
</template>

<script>
export default {};
</script>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  color: #fff;
  width: 46%;
  margin-bottom: 2.5rem;
  justify-content: space-between;
}
@media screen and (min-width: 768px) {
  .movie-card {
    width: 31%;
  }
}
.movie-card__image {
  width: 100%;
}
</style>
