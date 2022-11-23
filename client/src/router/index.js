import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SuccessView from '../views/StripeSuccessView.vue';
import CancelView from '../views/StripeCancelView.vue';
import CheckoutView from '../views/StripeCheckoutView.vue';
import NotFound from '../views/404View.vue';
// import PortalView from '../views/StripePortalView.vue';
import AboutView from '../views/AboutView.vue';
import UserView from '@/views/UserView.vue';
import SearchView from '@/views/SearchView.vue';
import AddHouseView from '@/views/AddHouseView.vue';

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
    {
      path: '/addhouse',
      name: 'addhouse',
      component: AddHouseView,
    },
    // {
    //   path: '/form',
    //   name: 'form',
    //   component: FormView,
    //   children: [
    //     {
    //       path: '',
    //       name: 'login',
    //       component: LoginView,
    //     },
    //     {
    //       path: '/form/register',
    //       name: 'register',
    //       component: RegisterView,
    //     },
    //   ],
    // },
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
    // {
    //   path: '/portal',
    //   name: 'portal',
    //   component: PortalView,
    // },
  ],
});

export default router;
