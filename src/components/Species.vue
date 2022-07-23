<template>
<div class="person-wrapper">
  <h1 class="white">{{ species.name }}</h1>
  <div class="person-container">
    <div class="person-details">
      <h2 class="headline">Infos</h2>
      <hr>
      <p>Classification: <strong>{{ species.classification }}</strong></p>
      <p>Eye Color: <strong>{{ species.eye_colors }}</strong></p>
      <p>Hair Color: <strong>{{ species.hair_colors }}</strong></p>
    </div>
    <div class="person-details">
      <h2 class="headline">Films</h2>
      <hr>
      <ul>
        <li v-for="film in films" :key="film.id" class="list-item">
          <router-link :to='"/film/" + film.id' active-class="active">
            {{ film.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="person-details">
      <h2 class="headline">People</h2>
      <hr>
      <ul>
        <li v-for="person in people" :key="person.id" class="list-item">
          <router-link :to='"/person/" + person.id' active-class="active">
            {{ person.name }}
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
    name: 'Person',
    data() {
    return {
      species: {},
      films: [],
      people: [],
    }
    },
    async created() {
        let speciesID = this.$route.params.id;

        console.log(speciesID);
        await this.GetSpeciesData(speciesID);
        // this.GetFilms();
    },
    computed: {
        filteredPeople() {
            return this.people.filter(person => {
                return person.name.toLowerCase().indexOf(this.searchName.toLowerCase()) > -1
            })
        }
    },
    watch: {
        species() {
            this.GetFilms();
            this.GetPeople();
        }
    },
    methods: {
      GetSpeciesData(speciesID) {
          axios.get(`https://ghibliapi.herokuapp.com/species/${speciesID}`).then(resp => {
              this.species = resp.data;
          });
      },
      GetFilms() {
        if(this.species.films) {
          for(let index = 0; index < this.species.films.length; index++) {
              axios.get(this.species.films[index]).then(resp => {
                  this.films.push(resp.data);
              });
          }
        }
      },
      GetPeople() {
        if(this.species.people) {
          for(let index = 0; index < this.species.people.length; index++) {
              axios.get(this.species.people[index]).then(resp => {
                  this.people.push(resp.data);
              });
          }
        }
      }
    }

}
</script>

<style scoped lang="scss">

.person-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
}

.headline {
  margin-bottom: 25px;
}

.person-details {
  background-color: #5c5c5c;
  border: 1px solid #737373;
  border-radius: 15px;
  color: white;
  padding: 25px;
  text-align: left;
  width: 300px;
  margin: auto;
}

.list-item a{
  color: white;
  text-decoration: underline;
}

.white {
  color: white;
}

</style>