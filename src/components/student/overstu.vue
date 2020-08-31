<template>
    <div class="container">
        <h2>拿证学员</h2>
        <el-table :data="tableData.filter(data => !search ? data : data.sName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" height='calc(100% - 110px)'>
            <el-table-column label="姓名" prop="sName"></el-table-column>
            <el-table-column label="性别" prop="sSex"></el-table-column>
            <el-table-column label="年龄" prop="sAge"></el-table-column>
            <el-table-column label="报名时间" prop="supTime"></el-table-column>
            <el-table-column label="报名费用" prop="supCost"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return {
                tableData: [],
                search: ''
            }
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                
                axios.get('/findover').then(res => {
                    let data = res.data.filter((item) => item.sSubject == 5); // 查到当前数据
                    vm.tableData = data.map((item) => {

                        let newsex = item.sSex == 0 ? '男' : '女';
                        item.sSex = newsex;

                        let newdate = item.supTime.slice(0,item.supTime.indexOf('T'));
                        item.supTime = newdate;
                        
                        return item;
                    });
                });
                
            });
        }
    }
</script>

<style scoped>

    @import '../../assets/css/coachpublic.css';

</style>