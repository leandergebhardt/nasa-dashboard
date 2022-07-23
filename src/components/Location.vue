<template>
<div class="loaction-wrapper">
  <h1 class="white-headline">{{ location.name }}</h1>
  <div class="location-container">
    <div class="location-details">
      <h2 class="headline">Infos</h2>
      <hr>
      <p>Climate: <strong>{{ location.climate }}</strong></p>
      <p>Terrain: <strong>{{ location.terrain }}</strong></p>
      <p>Surface Water: <strong>{{ location.surface_water }}</strong></p>
    </div>
    <div class="location-details">
      <h2 class="headline">Films</h2>
      <hr>
      <ul>
        <li v-for="film in films" :key="film.id" class="list-item">
          <router-link :to='"/film/" + film.id' active-class="active" class="white">
            {{ film.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="location-details">
      <h2 class="headline">Residents</h2>
      <hr>
      <ul>
        <li v-for="resident in residents" :key="resident.id" class="list-item">
          <router-link :to='"/person/" + resident.id' active-class="active" class="white">
            {{ resident.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Location',
    data() {
    return {
      location: {},
      films: [],
      residents: [],
    }
    },
    async created() {
        let locationID = this.$route.params.id;

        console.log(locationID);
        await this.GetLocationData(locationID);
    },
    computed: {
    },
    watch: {
        location() {
            this.GetFilms();
            this.GetResidents();
        }
    },
    methods: {
      GetLocationData(locationID) {
          axios.get(`https://ghibliapi.herokuapp.com/locations/${locationID}`).then(resp => {
              this.location = resp.data;
          });
      },
      GetFilms() {
        console.log(this.location.name);
        if(this.location.films) {
          for(let index = 0; index < this.location.films.length; index++) {
              axios.get(this.location.films[index]).then(resp => {
                  this.films.push(resp.data);
              });
          }
        }
      },
      GetResidents() {
         if(this.location.residents) {
          for(let index = 0; index < this.location.residents.length; index++) {
              axios.get(this.location.residents[index]).then(resp => {
                  this.residents.push(resp.data);
              });
          }
        }
      }
    }

}
</script>

<style scoped lang="scss">

.location-wrapper {
    display: flex;
}

a {
  color: white;
}

a:hover {
  color: white;
  font-weight: 600;
}
.location-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
}

.headline {
  margin-bottom: 25px;
}

.location-details {
  background-color: #5c5c5c;
  border: 1px solid #737373;
  border-radius: 15px;
  color: white;
  padding: 25px;
  text-align: left;
  width: 300px;
  margin: auto;
  -webkit-box-shadow: 10px 10px 25px -6px rgba(255,255,255,1);
  -moz-box-shadow: 10px 10px 25px -6px rgba(255,255,255,1);
  box-shadow: 10px 10px 25px -6px rgba(255,255,255,1);
}

.white {
  color: white;
}

.white-headline {
  color: white;
  margin: 25px;
}

</style>