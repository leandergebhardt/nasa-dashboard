<template>
  <div class="artwork-wrapper">
    <div class="artwork-image">
        <router-link :to='"/film/" + artwork.id' active-class="active">
          <img 
            :src="show ? artwork.movie_banner : artwork.image" 
            alt="film-banner" 
            @mouseover="show = true"
            @mouseleave="show = false"
          />
        <Transition name="slide">
          <div 
            class="info-box" 
            v-show="show"
            @mouseover="show = true"
          >
            <p 
              class="movie-title">
              {{ artwork.title }}
            </p>
            <p 
              class="movie-description"
            >
              {{ artwork.original_title }}
            </p>
            <div class="movie-details">
              <p 
                class="movie-duration"
              >
                <b-icon-clock></b-icon-clock> {{ artwork.running_time }} min
              </p>
              <p 
                class="movie-duration"
              >
                <b-icon-person-circle></b-icon-person-circle> {{ artwork.director }}
              </p>
              <p 
                class="movie-duration"
              >
                <b-icon-star-fill></b-icon-star-fill> {{ artwork.rt_score }}
              </p>
            </div>
          </div>
          </Transition>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Artwork',
  props: ['artwork'],
  created: function () {

  },
  mounted () {
  
  },
  computed: {

  },
  data() {
    return {
      show: false,
    }
  },
   methods: {

  },
}
</script>

<style scoped lang="scss">

.artwork-wrapper {
  position: relative;
}

.movie-title {
  color: white;
}

.movie-description {
  color: rgb(161, 242, 255);
}

.movie-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.movie-duration {
  color: white;
  font-size: 11px;
  font-weight: 500;
}

/* Animation */
.slide-enter-active {
    -moz-transition-duration: 0.75s;
   -webkit-transition-duration: 0.75s;
   -o-transition-duration: 0.75s;
   transition-duration: 0.75s;
   -moz-transition-timing-function: ease;
   -webkit-transition-timing-function: ease;
   -o-transition-timing-function: ease;
   transition-timing-function: ease;
}

.slide-leave-active {
   -moz-transition-duration: 0.75s;
   -webkit-transition-duration: 0.75s;
   -o-transition-duration: 0.75s;
   transition-duration: 0.75s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100%;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

.artwork-image img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    object-position: top;
    border-radius: 15px;

    -webkit-box-shadow: 10px 10px 31px -12px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 31px -12px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 31px -12px rgba(0,0,0,0.75);
}

.artwork-image img:hover {
    cursor: pointer;
    transform: scale(1.06);


    -webkit-box-shadow: 10px 10px 25px -6px rgba(255,255,255,1);
    -moz-box-shadow: 10px 10px 25px -6px rgba(255,255,255,1);
    box-shadow: 10px 10px 25px -6px rgba(255,255,255,1);
}

.artwork-image img {
    transition: all 1.75s ease-in-out;
}

.info-box {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: #5c5c5c7b;
  text-align: left;
  min-width: 230px;
  max-width: 230px;
  border-radius: 12px;
  padding: 10px;
}

.film-item {
  margin: 15px 10px;
  width: 250px;
  height: 250px;
}

</style>