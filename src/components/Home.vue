<template>
<div class="home">
    <h1>Home</h1>
    <div class="home-component">
        <img class="img" :src="data.hdurl" alt="">
        <h2>{{ data.title }}</h2>
        <p>{{ data.explanation }}</p>
    </div>
</div>
</template>

<script>
  import axios from 'axios'
  const keys = require('/Users/leonardoschuster/Documents/workspace/nasa-dashboard/config/keys.js')

export default {
  name: 'Home',
  components: {
    
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
      data: {},
    }
  },
   methods: {
    GetArtworks() {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.apiKey}`).then(resp => {
            this.data = resp.data;
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

  .img {
    width: 100%;
    height: auto;
  }

  .home-component {
    padding: 0 20px 80px;
    color: white;
  }
</style>
