<template>
<div>
  <h1>Species</h1>
  <b-form-input class="search-field" v-model="search" placeholder="Enter location name here"></b-form-input>
    <b-list-group class="container">
        <b-list-group-item class="d-flex align-items-center" v-for="species in filteredSpecies" :key="species.id">
            <router-link :to='"/species/" + species.id' active-class="active" class="no-styling">
                <span class="mr-auto">{{ species.name }}</span>
            </router-link>
        </b-list-group-item>
    </b-list-group>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Species',
    data() {
    return {
      species: [],
      search: '',
    }
    },
    created() {
        this.GetSpecies();
    },
    computed: {
        filteredSpecies() {
            return this.species.filter(type => {
                return type.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    },
    methods: {
    GetSpecies() {
        axios.get('https://ghibliapi.herokuapp.com/species').then(resp => {
            this.species = resp.data;
        });
    },
    }

}
</script>

<style scoped lang="scss">

    .container {
        max-width: 600px;
        margin: 50px auto;
    }

 h1 {
    padding: 20px;
    color: white;
  }

  .no-list {
    list-style: none;
  }

  .person-name {
    color: white;
  }
  .no-styling {
    text-decoration: none;
    color: black;
    font-weight: 600;
  }
  .search-field {
    max-width: 600px;
    margin: auto;
  }

</style>