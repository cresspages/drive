<template>
    <div class="container">
        <h2>学员缴费详细信息</h2>
        <el-table :data="tableData" show-summary border height="calc(100% - 100px)">
            <el-table-column label="姓名" prop="sName" min-width="100"></el-table-column>
            <el-table-column label="缴费时间" prop="supTime" min-width="150"></el-table-column>
            <el-table-column label="报名费用" prop="supCost" min-width="100"></el-table-column>
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
                
                axios.get('/findinfo?table=student')
                .then(res => {
                    let data = res.data;

                    let newdata = data.forEach((element,index) => {

                        let time = element.supTime;
                        let newtime = time.slice(0,time.indexOf('T'));
                        data[index].supTime = newtime;

                        var json_date = new Date(element.steTime).toJSON();
                        let newdate =  new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        data[index].steTime = newdate;

                    });

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