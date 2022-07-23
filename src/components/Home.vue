<template>
<div class="home">
    <h1>Browse</h1>
    <div class="home-component">
        <li 
          v-for="info in data" :key="info.id"
          class="no-list"
        >
        </li>
    </div>
</div>
</template>

<script>
  import axios from 'axios'

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
        axios.get('https://api.nasa.gov/planetary/apod?api_key=lV1VncgFDIOa7T7o9MgFkml2Xw0vzXoOdb6Yaq3a').then(resp => {
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

  .home-component {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit,minmax(250px, 1fr));
    overflow: hidden;
    padding: 0 20px 80px;
  }
</style>
