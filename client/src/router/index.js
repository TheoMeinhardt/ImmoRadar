import { createRouter, createWebHashHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import FormView from '../views/FormView.vue';
import LoginView from '../views/subviews/LoginView.vue';
import SuccessView from '../views/StripeSuccessView.vue';
import CancelView from '../views/StripeCancelView.vue';
import CheckoutView from '../views/StripeCheckoutView.vue';
import NotFound from '../views/404View.vue';
import UserView from '@/views/UserView.vue';
import SearchView from '@/views/SearchView.vue';
import AddHouseView from '@/views/AddHouseView.vue';
import UserDetails from '@/views/subviews/UserDetails.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
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
      children: [
        {
          path: '/user/details',
          name: 'userDetails',
          component: UserDetails,
        },
      ],
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/addhouse',
      name: 'addhouse',
      component: AddHouseView,
    },
    {
      path: '/form',
      name: 'form',
      component: FormView,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginView,
        },
        {
          path: '/form/register',
          name: 'register',
          component: () => import('@/views/subviews/RegisterView.vue'),
        },
      ],
    },
    { path: '/success', name: 'success', component: SuccessView },
    {
      path: '/cancel',
      name: 'cancel',
      component: CancelView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    { path: '/:catchAll(.*)', component: NotFound },
  ],
});

export default router;
