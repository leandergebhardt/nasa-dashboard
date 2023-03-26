<template>
<div class="home">
    <h1>Home</h1>
    <div class="home-component">
        <h2>{{ data.title }}</h2>
        <p class="description">{{ data.date }}</p>
        <p class="description">© {{ data.copyright }}</p>
        <img v-img:image class="img" :src="data.hdurl" alt="">
        <div class="container">
          <iframe 
            id="videoplayer" 
            type="text/html" 
            class="responsive-iframe"
            :src="data.url"
            frameborder="0">
          </iframe>
        </div>
        <p class="description">{{ data.explanation }}</p>
    </div>
</div>
</template>

<script>
  import axios from 'axios'
  const keys = require('/config/keys.js')

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

  h2{
    text-align: left;
  }

  // VIDEO
  .container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  }

  .responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .img {
    width: 100%;
    height: auto;
  }

  .home-component {
    padding: 0 20px 80px;
    color: white;
  }

  .description {
    text-align: left;
  }
</style>
