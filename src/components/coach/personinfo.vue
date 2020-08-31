<template>
    <div class="container">
        <h2>教练个人信息</h2>

        <div></div>

        <el-table :data="tableData.filter(data => !search ? data : data.cname.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
            <el-table-column label="姓名" prop="cname"></el-table-column>
            <el-table-column label="性别" prop="csex"></el-table-column>
            <el-table-column label="出生日期" prop="cbrithday"></el-table-column>
            <el-table-column label="工资" prop="cpay"></el-table-column>
            <el-table-column align="right">
                <template slot="header">
                    <el-input v-model="search" size="mini" placeholder="输入姓名搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<template>
                        <el-popconfirm title="确定删除吗？" @onConfirm='define' @onCancel='cancel'>
                            <el-button slot="reference" size="mini" type="danger" @click.native.prevent="deleteRow(scope.$index, tableData, scope.row)">删除</el-button>
                        </el-popconfirm>
                    </template>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>

    import axios from 'axios';
	import qs from 'qs';

	export default {
		data() {
			return {
				tableData: [],
				search: '',
				index: '',
				table: [],
				nowinfo: ''
			}
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			deleteRow(index, row, nowinfo) {

				this.index = index;
				this.table = row;
				this.nowinfo = nowinfo;

			},
			define(){ // 确认删除
				this.$message({
					showClose: true,
					message: '删除成功',
					type: 'success'
				});

				this.table.splice(this.index, 1);

				let id = this.nowinfo.cid;

				let data = {table: 'coachinfo', id: id};

				axios.post('/delete', qs.stringify(data));
				
			},
			cancel(){ // 取消删除
				this.$message({
					showClose: true,
					message: '取消删除'
				});

				this.index = '';
				this.table = [];
				this.nowinfo = '';

			}
		},
		beforeRouteEnter(to, from, next){

			axios.get('/findinfo?table=coachinfo')
			.then(res => {

				next(vm => {
					let data = res.data;

					let newdata = data.forEach((element,index) => {

						let brith = element.cbrithday;
						let newbrith = brith.slice(0,brith.indexOf('T'));
						data[index].cbrithday = newbrith;

						let newsex = element.csex == '0' ? '男' : '女';
						data[index].csex = newsex;

					});

					vm.tableData = data;
				});
			}).catch(err => {
				console.log(err);
			});
			
		}
	}

</script>


<style scoped>

@import '../../assets/css/coachpublic.css';

</style>