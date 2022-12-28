<template>
<div class="weather">
    <h1>Earth 🌍</h1>
    <div v-if="data.length <= 0">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <ul>
        <li class="no-list" v-for="entry in data" :key="entry.identifier">
          <EarthDetails :image="entry.image" :date="date" :data="entry"/>
        </li>
      </ul>
    </div>  
</div>
</template>

<script>
  import axios from 'axios'
  import EarthDetails from './EarthDetails.vue'

export default {
  name: 'Earth',
  components: {
    EarthDetails
  },
  created: function () {
    this.GetTodaysDate();
    this.GetData();
  },
  mounted () {
  
  },
  computed: {

  },
  watch: {
    data: function(){
      this.GetPictures();
    }
  },
  data() {
    return {
      data: {},
      date: '',
    }
  },
   methods: {
    GetTodaysDate() {
      const offset = 2;
      let today = new Date();
      let dd = String(today.getDate() - offset).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      this.date = yyyy + '-' + mm + '-' + dd;
    },
    GetData() {
        axios.get(`https://epic.gsfc.nasa.gov/api/enhanced/date/${this.date}`).then(resp => {
            this.data = resp.data;
        });
    },
    GetPictures() {

    }
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

  .no-list {
    text-decoration: none;
  }
</style>
