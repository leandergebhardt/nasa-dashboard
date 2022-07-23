<template>
  <div class="artwork-detials-wrapper">
    <h2 class="film-title">{{ film.title }}</h2>
    <h3 class="original-titels">
        {{ film.original_title }} ( {{ film.original_title_romanised }} )
    </h3>

    <img 
        class="film-image" 
        :src="film.image" 
        alt=""
    >
    <p class="description">{{ film.description }}</p>
    <div class="film-info">
        <p><strong>Director(s):</strong> {{ film.director }}</p>
        <p><strong>Producer(s):</strong> {{ film.producer }}</p>
        <p><strong>Release Date: </strong> {{ film.release_date }}</p>
        <p><b-icon-clock></b-icon-clock> {{ film.running_time }} min</p>
        <p><strong>Rotten Tomatoes: </strong> {{ film.rt_score }} 🍅</p>
    </div>
    <div class="objects">
        <b-dropdown variant="success" text="People" class="m-2">
            <b-dropdown-item 
                href="#" 
                v-for="person in people" 
                :key="person.id"
            >
            <router-link :to='"/person/" + person.id' active-class="active" class="black">
                {{ person.name }}
            </router-link>
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown variant="success" text="species" class="m-2">
            <b-dropdown-item 
                href="#"
                v-for="species in species" 
                :key="species.id"
            >
            <router-link :to='"/species/" + species.id' active-class="active" class="black">
                {{ species.name }}
            </router-link>
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown variant="success" text="vehicles" class="m-2">
            <b-dropdown-item 
                href="#"
                v-for="vehicle in vehicles" 
                :key="vehicle.id"
            >
            <router-link :to='"/vehicle/" + vehicle.id' active-class="active" class="black">
                {{ vehicle.name }}
            </router-link>
            </b-dropdown-item>
        </b-dropdown>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ArtworkDetail',
    data() {
        return {
            film: {},
            people: [],
            species: [],
            vehicles: [],
            locations: [],
        }
    },
    created() {
        let filmID = this.$route.params.id;

        console.log(filmID);
        this.getFilm(filmID);
    },
    watch: {
        film() {
            this.GetPeople();
            this.GetSpecies();
            this.GetVehicles();
            this.GetLocations();
        }
    },
    methods: {
        getFilm(filmId) {
            axios.get(`https://ghibliapi.herokuapp.com/films/${filmId}`).then(resp => {
                this.film = resp.data;
            });
        },
        GetPeople() {
            if(this.film.people[0] == 'https://ghibliapi.herokuapp.com/people/'){
                this.people = [{name: 'No people specified'}];
            } else {
                for(let index = 0; index < this.film.people.length; index++) {
                    axios.get(this.film.people[index]).then(resp => {
                        this.people.push(resp.data);
                    });
                    
                }
            }
        },
        GetSpecies() {
            if(this.film.species[0] == 'https://ghibliapi.herokuapp.com/species/'){
                this.species = [{name: 'No species specified'}];
            } else {
                for(let index = 0; index < this.film.species.length; index++) {
                    axios.get(this.film.species[index]).then(resp => {
                        this.species.push(resp.data);
                    });
                    
                }
            }
        },
        GetVehicles() {
            if(this.film.vehicles[0] == 'https://ghibliapi.herokuapp.com/vehicles/'){
                this.vehicles = [{name: 'No vehicles'}];
            } else {
                for(let index = 0; index < this.film.vehicles.length; index++) {
                    axios.get(this.film.vehicles[index]).then(resp => {
                        this.vehicles.push(resp.data);
                    });
                    
                }
            }
        },
        GetLocations() {
            for(let index = 0; index < this.film.locations.length; index++) {
                axios.get(this.film.locations[index]).then(resp => {
                    this.locations.push(resp.data);
                });
                
            }
        },
    }
}
</script>

<style scoped lang="scss">
.artwork-detials-wrapper {
    margin: 50px 0;
}

.original-titels {
    color: rgb(161, 242, 255);
}

.film-title {
  color: white;
}

.black {
    color: black;
}

.description {
    color: white;
    font-size: 18px;
    line-height: 1.4rem;
    margin: 2rem 40%;
    text-align: left;
}

.film-info {
    position: absolute;
    left: 25px;
    top: 50%;
    background-color: #5c5c5c;
    border: 1px solid #737373;
    border-radius: 15px;
    color: white;
    padding: 25px;
    text-align: left;
    max-width: 300px;
}

.film-image {
    height: 400px;
}

</style>