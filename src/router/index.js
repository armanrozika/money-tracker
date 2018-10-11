import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Weekly from '@/components/Weekly.vue'
import Monthly from '@/components/Monthly.vue'

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: Dashboard
		},
		{
			path: '/weekly',
			name: 'weekly',
			component: Weekly
		},
		{
			path: '/monthly',
			name: 'monthly',
			component: Monthly
		},
	]
})