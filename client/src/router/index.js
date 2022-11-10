import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SuccessView from '../views/StripeSuccessView.vue';
import CancelView from '../views/StripeCancelView.vue';
import CheckoutView from '../views/StripeCheckoutView.vue';
import NotFound from '../views/404View.vue';
// import PortalView from '../views/StripePortalView.vue';

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView,
    },
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
