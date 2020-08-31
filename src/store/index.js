import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tag: [
			{ name: '首页', type: 'primary', path: '/' },
		],
		menu: [
			{
				id: 'menu-1-1',
				name: '首页',
				path: '/mainshow',
				ismenu: false
			},
			{
				id: 'menu-1-2',
				name: '教练管理',
				path: '/coach',
				ismenu: true,
				menu: [
					{
						id: 'menu-2-2-1',
						name: '教练个人信息',
						path: '/coach/personinfo',
						ismenu: false,
					}
				]
			},
			{
				id: 'menu-1-3',
				name: '学员管理',
				path: '/student',
				ismenu: true,
				menu: [
					{
						id: 'menu-2-3-1',
						name: '报名',
						path: '/student/singup',
						ismenu: false,
					},
					{
						id: 'menu-2-3-2',
						name: '所有学员',
						path: '/student/allstu',
						ismenu: false,
					},
					{
						id: 'menu-2-3-3',
						name: '已拿证学员',
						path: '/student/overstu',
						ismenu: false,
					}
				]
			},
			{
				id: 'menu-1-4',
				name: '收入支出',
				path: '/property',
				ismenu: true,
				menu: [
					{
						id: 'menu-2-4-1',
						name: '添加支出',
						path: '/property/addPay',
						ismenu: false,
					},
					{
						id: 'menu-2-4-2',
						name: '缴费信息',
						path: '/property/PayInfo',
						ismenu: false,
					},
					{
						id: 'menu-2-4-3',
						name: '支出',
						path: '/property/description',
						ismenu: false,
					},
					{
						id: 'menu-2-4-4',
						name: '总计',
						path: '/property/total',
						ismenu: false,
					}
				]
			},
		]
	},
	mutations: {
		addtag(state, newtag){
			let name = '';
			state.menu.forEach((item) => {
				if(item.menu !== undefined){
					item.menu.forEach((item2) => {
						if(item2.path === newtag){
							name = item2.name;
						}
					});
				}
			});

			state.tag.push({name: name, path: newtag, type: ''});
		},
		deletetag(state, index){
			if(index !== 0){
				state.tag.splice(index, 1);
			}
		},
		active(state, i){
			let tag = state.tag
			for (let index = 0; index < tag.length; index++) {
				if(index === i){
					tag[i].type = 'success';
				} else {
					tag[i].type = '';
				}
			}
		}
	},
	actions: {
	},
	modules: {
	}
})
