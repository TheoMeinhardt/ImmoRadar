// eslint-disable import/no-unresolved
import { createRouter, createWebHashHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import FormView from '../views/FormView.vue';
import LoginView from '../views/subviews/LoginView.vue';
import RegisterView from '@/views/subviews/RegisterView.vue';
import SuccessView from '../views/StripeSuccessView.vue';
import CancelView from '../views/StripeCancelView.vue';
import CheckoutView from '../views/StripeCheckoutView.vue';
import NotFound from '../views/404View.vue';
import UserView from '@/views/UserView.vue';
import SearchView from '@/views/SearchView.vue';
import AddHouseView from '@/views/AddHouseView.vue';
import UserOverview from '@/views/subviews/UserOverview.vue';
import EstateView from '@/views/EstateView.vue';
import CommentView from '../views/CommentView.vue';

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
          path: '',
          name: 'userOverview',
          component: UserOverview,
        },
        {
          path: '/user/details',
          name: 'userDetails',
          component: () => import('../views/subviews/UserDetails.vue'),
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
          component: RegisterView,
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
    {
      path: '/comments',
      name: 'comments',
      component: CommentView,
    },
    {
      path: '/estateview/:reID',
      name: 'estateview',
      component: EstateView,
      props: true,
    },
    { path: '/:catchAll(.*)', component: NotFound },
  ],
});

export default router;
