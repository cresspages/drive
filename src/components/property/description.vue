<template>
    <div class="container">
        <h2>支出信息</h2>
        <el-table :data="tableData" show-summary border max-height="calc(100% - 100px)">
            <el-table-column label="支出类型" prop="pType" min-width="100"></el-table-column>
            <el-table-column label="支出金额" prop="pCost" min-width="150"></el-table-column>
            <el-table-column label="支出描述" prop="pDescription" min-width="100"></el-table-column>
        </el-table>
    </div>
</template>

<script>

    import axios from 'axios';
    import qs from 'qs';

    export default {
        data(){
            return {
                tableData: []
            }
        },
        beforeRouteEnter(to, from, next){

            next(vm => {
                
                axios.get('/findinfo?table=pay')
                .then(res => {
                    let data = res.data;

                    vm.tableData = data;
                }).catch(err => {
                    console.log(err);
                });

            });
            
        }
    }

</script>

<style scoped>

    @import '../../assets/css/coachpublic.css';

    .el-table{
        min-width: 1100px;
    }

    .ctrl{
        margin: 10px 0;
    }

</style>