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
import AddHouseOne from '@/views/subviews/AddHouseOne.vue';
import AddHouseTwo from '@/views/subviews/AddHouseTwo.vue';
import AddHouseThree from '@/views/subviews/AddHouseThree.vue';
import AddHouseFinal from '@/views/subviews/AddHouseFinal.vue';
import UserOverview from '@/views/subviews/UserOverview.vue';

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
			children: [
				{
					path: '',
					name: 'AddHouseOne',
					component: AddHouseOne,
				},
				{
					path: '/addhouse/addhousetwo',
					name: 'AddHouseTwo',
					component: AddHouseTwo,
				},
				{
					path: '/addhouse/addhousethree',
					name: 'AddHouseThree',
					component: AddHouseThree,
				},
				{
					path: '/addhouse/addhousefinal',
					name: 'AddHouseFinal',
					component: AddHouseFinal,
				},
			],
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
		{ path: '/:catchAll(.*)', component: NotFound },
	],
});

export default router;
