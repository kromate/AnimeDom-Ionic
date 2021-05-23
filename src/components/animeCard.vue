<template>
  <article class="movie-card md:mr-5">
    <div class="movie-card__image">
      <img
        src="https://m.media-amazon.com/images/M/MV5BYzBhOWU4ODAtZDYzYi00NDU1LWIzZWUtNDZmMDgxODljZTVmXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_SX300.jpg"
        alt="Poster for Project Power"
      />
    </div>
    <div class="movie-card__details">
      <h4 class="movie-card__details__title">Project Power</h4>
      <p class="movie-card__details__release-year"><span>Released:</span> <em>2020 </em></p>
      <button class="nominate-button movie-btn w-100">
        View <i class="far fa-check-circle"></i>
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
  /* width: 46%; */
  margin-bottom: 2.5rem;
  justify-content: space-between;
}
/* @media screen and (min-width: 768px) {
  .movie-card {
    width: 25%;
  }
} */
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
