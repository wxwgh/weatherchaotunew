import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "../App.vue";
import store from "../store/index";
import { getToken } from "@/util/auth";

Vue.use(VueRouter)

const routes = [
	{
	  path: '/',
	  name: 'App',
	  component: App
	}
	// ,{
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	
	if (getToken()) {
		
		next();
		
	} else {
		//没有用户信息，先获取用户信息，请求后台，判断是否登录，未登录跳转到单点登录页面，已登录，获取用户信息
		store.dispatch("GetUserInfo").then(res => {
			next();
			//next({ ...to, replace: true });
		}).catch(err => {
			store.dispatch("LogOut").then(res => {
				window.location.href = res.data;
			});
		});
	}
})

export default router
