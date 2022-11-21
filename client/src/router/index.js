import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import UserView from '@/views/UserView.vue';
import SearchView from '@/views/SearchView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
  ],
});

export default router;
