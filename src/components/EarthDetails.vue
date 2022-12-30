<template>
<div class="weather-details">
    <h2>{{ data.caption }}</h2>
    <img class="photo" :src="img" alt="awesome-picture from earth">
    <div class="description">
      <p>{{ data.date }}</p>
      <p>Coords: Lat: {{ data.coords.centroid_coordinates.lat }} Lon: {{ data.coords.centroid_coordinates.lon }}</p>
    </div>
</div>
</template>

<script>
  import axios from 'axios'

export default {
  name: 'EarthDetails',
  props: [ 
    'image',
    'date',
    'data',
  ],
  created: function () {
    this.GetDate();
    this.GetData();
  },
  mounted () {
  
  },
  computed: {

  },
  watch: {
  },
  data() {
    return {
      img: {},
      dateForAPI: '',
    }
  },
   methods: {
    GetDate() {
      const offset = 2;
      let today = new Date();
      let dd = String(today.getDate() - offset).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      this.dateForAPI = yyyy + '/' + mm + '/' + dd;
    },
    GetData() {
      axios.get(`https://epic.gsfc.nasa.gov/archive/enhanced/${this.dateForAPI}/png/${this.image}.png`, 
      { 
        headers: {
          "Access-Control-Allow-Origin": "*",
        } 
      })
        .then(resp => {
          this.img = resp.data;
        })
        .catch(err => console.log(err));
    },
    GetPictures() {

    }
  }
}
</script>

<style scoped lang="scss">
  h2 {
    font-size: 20px;
    color: white;
  }

  .weather-details {
    margin: 20px;
    padding: 15px;
    color: white;
  }

  .no-list {
    list-style: none;
    margin: 15px 10px;
  }

  .photo {
    width: 100%;
    height: auto;
  }

  .no-list {
    text-decoration: none;
  }

  .description {
    text-align: left;
  }
</style>
