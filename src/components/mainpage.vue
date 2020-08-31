<template>
	<div id="main">
		<div class="header">
			<el-card class="income">
				<span class="iconfont">&#xe677;</span>
				<div>
					<h3>今日驾校收入</h3>
					<span>￥{{ income }}</span>
				</div>
			</el-card>
			<el-card class="outlay">
				<span class="iconfont">&#xe61f;</span>
				<div>
					<h3>今日驾校支出</h3>
					<span>￥{{ outlay }}</span>
				</div>
			</el-card>
			<el-card class="addstu">
				<span class="iconfont">&#xe601;</span>
				<div>
					<h3>今日新增学员</h3>
					<span>{{ addstu }}</span>
				</div>
			</el-card>
			<el-card class="overstu">
				<span class="iconfont">&#xe647;</span>
				<div>
					<h3>今日拿证学员</h3>
					<span>{{ overstu }}</span>
				</div>
			</el-card>
		</div>

		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				income: 111,
				outlay: 111,
				addstu: 11,
				overstu: 5
			}
		},
		beforeRouterEnter(to, from, next){
		}
	}
</script>

<style scoped>

	@import '../assets/css/public.css';

	#main{
		padding: 10px;
	}

	.header{
		display: flex;
		height: 150px;
		justify-content: left;
	}

	.el-card{
		min-width: 250px;
		margin-right: 20px;
		cursor: pointer;
		border: none;
	}

	.iconfont{
		font-size: 30px;
		float: left;
		width: 40px;
	}

	.iconfont + div{
		text-align: center;
		color: #fff;
	}

	.income{
		background-color: #8df15a;
	}
	.income .iconfont{
		color: rgb(54, 198, 241);
	}
	.income:hover{
		box-shadow: 0 0 20px #8df15a;
	}

	.outlay{
		background-color: #F56C6C;
	}
	.outlay:hover{
		box-shadow: 0 0 20px #F56C6C;
	}

	.addstu{
		background-color: #2190f8;
	}
	.addstu:hover{
		box-shadow: 0 0 20px #2190f8;
	}

	.overstu{
		background-color: #f82145;
	}
	.overstu:hover{
		box-shadow: 0 0 20px #f82145;
	}

</style>