import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

export const routes = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Login',
			component: () => import('../components/LoginForm.vue'),
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('../components/HelloWorld.vue'),
			meta: { requiresAuth: true, }	
		},
	],
})

routes.beforeEach(async (to) => {
	if (to.meta.requiresAuth) {
		const currentUser = await getCurrentUser()
		
		if (!currentUser) {
			return {
				path: '/',
				query: {
					redirect: to.fullPath,
				},
			}
		}
	}
})