<template>
<div class="home">
    <h1>Browse</h1>
    <div class="home-component">
        <li 
          v-for="artwork in artworks" :key="artwork.id"
          class="no-list"
        >
          <Artwork :artwork="artwork" />
        </li>
    </div>
</div>
</template>

<script>
  import axios from 'axios'
  import Artwork from './Artwork.vue'

export default {
  name: 'Home',
  components: {
    Artwork,
  },
  created: function () {
    this.GetArtworks();
  },
  mounted () {
  
  },
  computed: {

  },
  data() {
    return {
      artworks: {},
    }
  },
   methods: {
    GetArtworks() {
        axios.get('https://ghibliapi.herokuapp.com/films').then(resp => {
            this.artworks = resp.data;
        });
    },
  }
}
</script>

<style scoped lang="scss">
  h1 {
    padding: 20px;
    color: white;
  }

  .no-list {
    list-style: none;
    margin: 15px 10px;
  }

  .home-component {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit,minmax(250px, 1fr));
    overflow: hidden;
    padding: 0 20px 80px;
  }
</style>
