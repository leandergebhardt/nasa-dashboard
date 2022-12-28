<template>
<div class="weather">
    <h1>Mars 🚀</h1>
    <b-col sm="4">
      <p>Date on Mars: {{ now }} SOL</p>
      <b-input-group prepend="SOL">
        <b-form-input v-model="solInpu" id="sol-input" type="number"></b-form-input>
      </b-input-group>
      <b-form-select v-model="selectedCam" :options="options"></b-form-select>
      <b-button class="submit-btn" pill variant="info" @click="GetData" :disabled="!readyToSend">Get Images</b-button>
    </b-col>
    <ul v-if="data !== {}">
      <li class="no-list" v-for="photo in data.photos" :key="photo.id">
        <MarsDetails :image="photo.img_src" :date="photo.earth_date" :data="photo"/>
      </li>
    </ul>
    <p v-if="requestSent && (data.photos.length == 0)">No Data found :(</p>
</div>
</template>

<script>
  import axios from 'axios'
  import MarsDetails from './MarsDetails.vue'
  import MarsDate from '../helpers/marsdate.min.js'
  const keys = require('/Users/leonardoschuster/Documents/workspace/nasa-dashboard/config/keys.js')

export default {
  name: 'Mars',
  components: {
    MarsDetails,
  },
  created: function () {
    this.GetTodaysDate();
    this.now = new MarsDate();
  },
  mounted () {
  
  },
  computed: {
    readyToSend() {
      return this.selectedCam !== null && this.solInpu !== null;
    },
  },
  watch: {
    data: function(){
      this.GetPictures();
    }
  },
  data() {
    return {
      data: {},
      now: '',
      requestSent: false,
      solInpu: 3600,
      selectedCam: null,
      options: [
        { value: null, text: 'Please select a camera' },
        { value: 'fhaz', text: 'Front Hazard Avoidance Camera' },
        { value: 'rhaz', text: 'Rear Hazard Avoidance Camera' },
        { value: 'mast', text: 'Mast Camera' },
        { value: 'chemcam', text: 'Chemistry and Camera Complex' },
        { value: 'mahli', text: 'Rear Hazard Avoidance Camera' },
        { value: 'mardi', text: 'Mars Descent Imager' },
        { value: 'navcam', text: 'Navigation Camera' },
        
      ],
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
      axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${keys.apiKey}&camera=${this.selectedCam}&page=2&sol=${this.solInpu}`).then(resp => {
          this.data = resp.data;
      });
      this.requestSent = true;
    },
  }
}
</script>

<style scoped lang="scss">
  h1 {
    padding: 20px;
    color: white;
  }

  p{
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

  .form-input {
    width: 80%;
    display: block;
    margin: auto;
  }

  .submit-btn {
    margin: 15px;
  }
</style>
