import Vue from 'vue'
import main from './main.vue'
import router from './router'
import store from './store'
import elementUi from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.use(elementUi);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

	let {tag} = store.state;
	let index = to.fullPath.indexOf('?') == -1 ? '' : to.fullPath.indexOf('?');
	let newpath;
	if(index){
		newpath = to.fullPath.slice(0, index);
	} else {
		newpath = to.fullPath.slice(0);
	}

	if(newpath !== '/mainshow' && newpath !== '/login' && newpath !== '/notpage' && newpath !== '/student/allstu/fullinfo'){
		for (let index = 0; index < tag.length; index++) {
			if(newpath === tag[index].path){
				break;
			}
			if(tag.length - 1 === index){
				store.commit('addtag', newpath);
			}
		}
	}

	let isluyou = to.matched[0].meta.luyou; // 判断当前页面是否被路由限制

	if(isluyou){
		let session = sessionStorage.getItem('cress');

		if(session){
			next();
		} else {
			
			next('/login');
		}

	} else {
		next();
	}

});

let vm = new Vue({
	router,
	store,
	render: h => h(main)
}).$mount('#app')
