<template>
    <div class="container">
        <h2>总计</h2>
        <el-divider content-position="center">收入</el-divider>
        <el-card class="box-card">
            <div slot="header">
                <h3>学员缴费统计</h3>
                <router-link :to="{path: '/property/PayInfo'}" tag="el-link" type="primary">查看更多</router-link>
            </div>
            <div class="text item">
                <div>共有人数：<strong>{{ student.people }}</strong></div>
                <div>缴费总计：<strong>{{ student.total }}</strong></div>
            </div>
        </el-card>

        <el-divider content-position="center">支出</el-divider>
        <el-card class="box-card">
            <div slot="header">
                <h3>全部支出信息</h3>
                <router-link :to="{path: '/property/description'}" tag="el-link" type="primary">查看更多</router-link>
            </div>
            <div class="text item">
                <div>条数总计：<strong>{{ pay.amount }}</strong></div>
                <div>缴费总计：<strong>{{ pay.total }}</strong></div>
            </div>
        </el-card>
        <div id="charts" :style="{width: '500px', height: '400px'}"></div>


    </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';

export default {
    data(){
        return {
            student:{
                people: 0,
                total: 0
            },
            pay:{
                amount: 0,
                total: 0
            },
            payclass: {},
            type: []
        }
    },
    methods: {
        echarts(){
            let div = this.$echarts.init(document.getElementById('charts'));
            div.setOption({
                title: {
                    text: '支出分类',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.type
                },
                series: [
                    {
                        name: '支出类型',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: this.payclass,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        }
    },
    mounted(){
        axios.get('/totalclass')
        .then(res => {
            let data = res.data;
            this.payclass = data;
            this.type = data.map((item) => {
                return item.name;
            });
            this.echarts();
        }).catch(err => {
            console.log(err);
        });
    },
    beforeRouteEnter(to, from, next){

        next(vm => {
            
            axios.get('/totalstudent')
            .then(res => {
                let data = res.data[0];
                vm.student.people = data.people;
                vm.student.total = data.total;
            }).catch(err => {
                console.log(err);
            });

            axios.get('/totalpay')
            .then(res => {
                let data = res.data[0];
                vm.pay.amount = data.amount;
                vm.pay.total = data.total;
            }).catch(err => {
                console.log(err);
            });

        });
        
    }
}

</script>

<style scoped>
@import '../../assets/css/coachpublic.css';

.el-card{
    display: inline-block;
    margin-top: 20px;
    width: 400px;
    margin-right: 30px;
}

.el-link{
    color: #7f9eff;
    float: right;
}

.item > div{
    margin-top: 20px;
}

#charts{
    float: right;
}
</style>