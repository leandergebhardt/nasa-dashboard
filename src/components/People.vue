<template>
<div>
  <h1>People</h1>
  <b-form-input class="search-field" v-model="searchName" placeholder="Enter name here"></b-form-input>
  <!-- <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
    <b-dropdown-item v-for="film in films" :key="film.id">{{ film.title }}</b-dropdown-item>
  </b-dropdown> -->
    <b-list-group class="container">
        <b-list-group-item class="d-flex align-items-center" v-for="person in filteredPeople" :key="person.id">
        <router-link :to='"/person/" + person.id' active-class="active" class="no-styling">
            <b-avatar class="mr-3"></b-avatar>
            <span class="mr-auto">{{ person.name }}</span>
            <b-badge>{{ person.films.length }}</b-badge>
        </router-link>
        </b-list-group-item>
    </b-list-group>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'People',
    data() {
    return {
      people: [],
      searchName: '',
    }
    },
    created() {
        this.GetPeople();
    },
    computed: {
        filteredPeople() {
            return this.people.filter(person => {
                return person.name.toLowerCase().indexOf(this.searchName.toLowerCase()) > -1
            })
        }
    },
    methods: {
    GetPeople() {
        axios.get('https://ghibliapi.herokuapp.com/people').then(resp => {
            this.people = resp.data;
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