import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

// Component Imports
import Home from './components/Home.vue'
import SwaggerUi from './components/SwaggerUi.vue'
import Earth from './components/Earth.vue'
import Mars from './components/Mars.vue'

// import User from './components/user/User.vue'
// import Login from './components/user/Login.vue'
// import Register from './components/user/Register.vue'
// import more COMPONENTS here

Vue.use(VueRouter);

export const routes = [
  {
    name: 'home',
    path: '',
    component: Home,
    meta: { guest: true },
  },
  {
    name: 'swagger',
    path: '/docs',
    component: SwaggerUi,
  },
  {
    path: '/earth',
    component: Earth,
    meta: { guest: true },
  },
  {
    path: '/mars',
    component: Mars,
    meta: { guest: true },
  },
  // {
  //   path: '/login',
  //   component: Login,
  //   meta: { guest: true },
  // },
  // {
  //   path: '/register',
  //   component: Register,
  //   meta: { guest: true },
  // },
  // {
  //   path: '/user',
  //   component: User,
  //   meta: { requiresAuth: true },
  // },
  // more ROUTES here
  
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

// Handling routes with Authentification Required
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next ()
  }
});

// Handling routes with Guest permitted
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.guest)) {
    if(store.getters.isAuthenticated) {
      next('/projects')
      return;
    }
    next()
  } else {
    next()
  }
});

export default router;
