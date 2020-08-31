<template>
	<transition name="fade">
  <div id="app">
		<div id="nav">
			<span class="iconfont">&#xe606;</span>
			<span class="text">后台管理系统</span>
		</div>
		<div class="out">
			<el-button type="warning" @click="dropout">退出</el-button>
		</div>
		<div class="main">
			<div class="sidenav">

				<div v-for="item in menu" :key="item.id" :class="item.id">
					<router-link tag="div" :to="item.path">
						<div @click="fedein">{{ item.name }}</div>
					</router-link>
					<div v-if="item.ismenu" class="menu2">
						<div v-for="item2 in item.menu" :key="item2.id" :class="item2.id">
							<router-link tag="div" :to="item2.path">
								{{ item2.name }}
							</router-link>
						</div>
					</div>
				</div>

			</div>
			<div class="viewcontent">
				<div class="nav">
					<el-tag
					v-for="tag in tags"
					:key="tag.name"
					:type="tag.type"
					closable
					@close="handleClose(tag)"
					:name='tag.path'>
					<router-link tag='el-link' :to="tag.path">{{tag.name}}</router-link>
					</el-tag>
				</div>
				<transition name='fade'>
					<router-view/>
				</transition>
			</div>
		</div>
  </div>
	</transition>
</template>

<script>
	
	export default {
		data(){
			return {
				tags: this.$store.state.tag,
				menu: this.$store.state.menu,
				admin: ''
			}
		},
		methods: {
			fedein(e){
				let changeElem = e.target.parentElement.nextElementSibling;
				if(changeElem != null){
					if(changeElem.classList.contains('menu-hide') == true){
						changeElem.classList.remove('menu-hide');
					} else {
						changeElem.classList.add('menu-hide');
					}
				}
			},
			handleClose(nowtag){
				let {tag} = this.$store.state;
				let index = '';
				tag.forEach((item,i)=> {
					if(item.path === nowtag.path){
						index = i;
					}
				});
				this.$store.commit('deletetag', index);

				this.$router.push(tag[index - 1].path);
			},
			dropout(){
				sessionStorage.removeItem('cress');
				this.$router.push('/login');
			}
		},
		mounted(){
			let nowpath = this.$route.fullPath;
			let {tag} = this.$store.state;
			tag.forEach((item,i)=> {
				if(item.path === nowpath){
					
				}
			});
		}
	}

</script>

<style>

	@import './assets/css/public.css';

	@import './assets/css/home.css';

    .fade-enter-active {
        transition: opacity 1s;
    }
    .fade-enter /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

	.nav{
		width: calc(100% - 20px);
		height: 40px;
		background-color: #eee;
		padding-left: 20px;
		position: relative;
	}

	.el-tag{
		margin-right: 20px;
	}

	.out{
		position: absolute;
		right: 50px;
		top: 10px;
	}

</style>
