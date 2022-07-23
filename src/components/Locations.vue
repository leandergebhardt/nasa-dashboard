<template>
<div>
  <h1>Locations</h1>
  <b-form-input class="search-field" v-model="search" placeholder="Enter location name here"></b-form-input>
    <b-list-group class="container">
        <b-list-group-item class="d-flex align-items-center" v-for="location in filteredLocations" :key="location.id">
            <router-link :to='"/location/" + location.id' active-class="active" class="no-styling">
                <span class="mr-auto">{{ location.name }}</span>
                <b-badge>{{ location.residents.length }}</b-badge>
            </router-link>
        </b-list-group-item>
    </b-list-group>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Locations',
    data() {
    return {
      locations: [],
      search: '',
    }
    },
    created() {
        this.GetLocations();
    },
    computed: {
        filteredLocations() {
            return this.locations.filter(location => {
                return location.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    },
    methods: {
    GetLocations() {
        axios.get('https://ghibliapi.herokuapp.com/locations').then(resp => {
            this.locations = resp.data;
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