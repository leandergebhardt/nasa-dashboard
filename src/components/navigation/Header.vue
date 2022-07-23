<template>
<div class="navbar">
  <b-nav pills>
    <router-link to="/" tag="b-navbar-brand" active-class="active"><a><img class="logo" src="../../../public/NASA_logo.png" alt=""></a></router-link>
    <router-link to="/earth" tag="b-nav-item" active-class="active"><a>Earth 🌍</a></router-link>
    <span v-if="isLoggedIn">
      <b-nav-item><a @click="logout"><b-icon-box-arrow-left style="color=white"></b-icon-box-arrow-left> Logout</a></b-nav-item>
    </span>
    <b-nav-item-dropdown
      v-else
      id="my-nav-dropdown"
      text="Login"
      toggle-class="nav-link-custom"
      right
      class="dropdown"
    >
      <router-link to="/register" tag="b-dropdown-item" active-class="active" style="color: black;">Register</router-link>
      <b-dropdown-divider></b-dropdown-divider>
      <router-link to="/login" tag="b-dropdown-item">Login</router-link>
    </b-nav-item-dropdown>
   
  </b-nav>
</div>
</template>

<script>
import { mapGetters ,mapMutations } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters({design: "StateDesign"}),
    isLoggedIn: function(){ 
      return this.$store.getters.isAuthenticated
    },
  },
  methods: {
    ...mapMutations(['setDesign']),
    async logout() {
      await this.$store.dispatch('LogOut')
      this.$router.push('/login')
    },
    defineDesign(design) {
      this.setDesign(design);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.logo{
  width: 50px;
  height: 40px;
  object-fit: cover;
}
  .navbar {
    background: black;
    color: white;
    padding: 0.5rem;
  }
  a {
    color: white !important;
    text-decoration: none;
  }

  .nav-item {
    
    &:hover {
      border-radius: 5px 5px 0 0;
      background-color: #2B1DAE;
    }
  }

  .dropdown-item a {
    color: black !important;
  }
</style>
