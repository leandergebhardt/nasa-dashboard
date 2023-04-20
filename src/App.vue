<template>
  <div id="app">
    <Header/>
    <!-- <Breadcrumb/> -->
    <router-view/>
  </div>
</template>

<script>
import Header from './components/navigation/Header.vue'
// import Breadcrumb from './components/navigation/Breadcrumb.vue'

export default {
  name: 'App',
  components: {
    Header,
    // Breadcrumb,
  }, 
  data() {
    return{
      items: [
        {
          text: 'Home',
          href: '/'
        },
      ],
    }
  },
}
</script>

<style>
@font-face {
    font-family: 'RobotoMono'; /*a name to be used later*/
    src: url('/src/assets/fonts/RobotoMono-VariableFont_wght.ttf');
}
  #app {
    font-family: 'RobotoMono';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    -webkit-font-smoothing: antialiased;
  }
  body {
    background-color: #010101 !important;
    color: white;
  }
</style>
