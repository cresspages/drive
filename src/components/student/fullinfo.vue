<template>
    <div class="container">
        <h2>学员详细信息</h2>
        <h4>学员： {{ studentinfo.sName }}</h4>
        <el-button type="primary" class="addsub" :disabled="isadd" @click='addsub'>添加考试情况</el-button>
        <div class="subject">
            <div class="now">
                <h3>当前状态：</h3>
                <span><strong>考试时间：</strong>{{ studentinfo.steTime }}</span><br>
                <span><strong>考试费用：</strong>{{ studentinfo.steCost }}</span></div>
            <el-steps :active="active" finish-status="success">
                <el-step title="报名"></el-step>
                <el-step title="科目 1"></el-step>
                <el-step title="科目 2"></el-step>
                <el-step title="科目 3"></el-step>
                <el-step title="科目 4"></el-step>
                <el-step title="拿证"></el-step>
            </el-steps>

            <el-button style="margin-top: 12px;" @click="next" :disabled="nextdisable">下一科目</el-button>
            <el-button style="margin-top: 12px;" @click="anign" :disabled="algindisable">重考</el-button>
            <el-button type="success" @click="centerDialogVisible = true" :disabled="isdisabled">确认</el-button>

            <template>
                
                <div class="grid">
                    <div class="sub1">
                        <h4>科目一考试情况</h4>
                        <el-table :data="tableData1" border>
                            <el-table-column label="考试次数" prop="num"></el-table-column>
                            <el-table-column label="考试分数" prop="score"></el-table-column>
                            <el-table-column label="失分项目" prop="error" min-width="200"></el-table-column>
                            <el-table-column label="状态" prop="type"></el-table-column>
                        </el-table>
                    </div>
                    <div class="sub2">
                        <h4>科目二考试情况</h4>
                        <el-table border :data="tableData2">
                            <el-table-column label="考试次数" prop="num"></el-table-column>
                            <el-table-column label="考试分数" prop="score"></el-table-column>
                            <el-table-column label="失分项目" prop="error" min-width="200"></el-table-column>
                            <el-table-column label="状态" prop="type"></el-table-column>
                        </el-table>
                    </div>
                    <div class="sub3">
                        <h4>科目三考试情况</h4>
                        <el-table border :data="tableData3">
                            <el-table-column label="考试次数" prop="num"></el-table-column>
                            <el-table-column label="考试分数" prop="score"></el-table-column>
                            <el-table-column label="失分项目" prop="error" min-width="200"></el-table-column>
                            <el-table-column label="状态" prop="type"></el-table-column>
                        </el-table>
                    </div>
                    <div class="sub4">
                        <h4>科目四考试情况</h4>
                        <el-table border :data="tableData4">
                            <el-table-column label="考试次数" prop="num" ></el-table-column>
                            <el-table-column label="考试分数" prop="score" ></el-table-column>
                            <el-table-column label="失分项目" prop="error" min-width="200"></el-table-column>
                            <el-table-column label="状态" prop="type"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </template>

            <template>
                <el-dialog
                    title="确认"
                    :visible.sync="centerDialogVisible"
                    width="450"
                    center>
                    <h3>选择考试时间</h3>

                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="活动时间" required>
                            <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            </el-col>
                            <el-dropdown @command="handleCommand">
                                <el-button>
                                    选择时间<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command='09-00-00'>9:00</el-dropdown-item>
                                    <el-dropdown-item command='14-00-00'>14:00</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="centerDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </template>

        </div>
        
        <template>
            <el-dialog
                title="添加科目信息"
                :visible.sync="adddialogVisible"
                width="500px"
                :before-close="handleClose">
                <el-form :model="addruleForm" :rules="addrules" ref="addruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="考试分数" prop="score">
                        <el-input v-model="addruleForm.score" type="number" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                    </el-form-item>
                    <el-form-item label="科目二方面" prop="type1">
                        <el-checkbox-group v-model="addruleForm.type1">
                            <el-checkbox label="倒车入库" name="type1"></el-checkbox>
                            <el-checkbox label="直角转弯" name="type1"></el-checkbox>
                            <el-checkbox label="曲线行驶" name="type1"></el-checkbox>
                            <el-checkbox label="坡道定点" name="type1"></el-checkbox>
                            <el-checkbox label="侧方停车" name="type1"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="科目三方面" prop="type2">
                        <el-checkbox-group v-model="addruleForm.type2">
                            <el-checkbox label="上车准备" name="type2"></el-checkbox>
                            <el-checkbox label="灯光模拟" name="type2"></el-checkbox>
                            <el-checkbox label="起步" name="type2"></el-checkbox>
                            <el-checkbox label="直线行驶" name="type2"></el-checkbox>
                            <el-checkbox label="百米加减" name="type2"></el-checkbox>
                            <el-checkbox label="变更车道" name="type2"></el-checkbox>
                            <el-checkbox label="转弯" name="type2"></el-checkbox>
                            <el-checkbox label="掉头" name="type2"></el-checkbox>
                            <el-checkbox label="靠边停车" name="type2"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addsubmitForm('addruleForm')">重置</el-button>
                    <el-button type="primary" @click="addresetForm('addruleForm')">确 定</el-button>
                </span>
            </el-dialog>
        </template>

    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
    data(){
        return {
            studentinfo: [],
            active: 0,
            centerDialogVisible: false,
            isdisabled: true,
            nextdisable : false,
            algindisable: false,
            ruleForm: {
                date1: '',
                date2: ''
            },
            rules: {
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ]
            },
            tableData1: [],
            tableData2: [],
            tableData3: [],
            tableData4: [],
            isadd: true,
            adddialogVisible: false,
            addruleForm: {
                score: '',
                type1: [],
                type2: []
            },
            addrules: {
                score: [
                    { required: true, message: '请输入分数', trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        active(){
            if(this.active > 0 && this.active < 5){
                this.algindisable = false;
                this.isadd = false;
            } else {
                this.algindisable = true;
                this.isadd = true;
            }
        }
    },
    methods: {
        handleClose(done){
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        addsub(){
            this.adddialogVisible = true;

        },
        addsubmitForm(formName){
            this.$refs[formName].resetFields();
        },
        addresetForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                    this.adddialogVisible = false;

                    let data = null;

                    switch (this.active) {
                        case 1:
                            data = {
                                table: 'sSubject1',
                                'score': this.addruleForm.score
                            }        
                            break;
                        case 2:
                            let type2 = '';
                            this.addruleForm.type1.forEach(item => {
                                type2 += item + ',';
                            });
                            data = {
                                table: 'sSubject2',
                                'score': this.addruleForm.score,
                                'error': type2
                            }
                            break;
                        case 3:
                            let type3 = '';
                            this.addruleForm.type2.forEach(item => {
                                type3 += item + ',';
                            });
                            data = {
                                table: 'sSubject3',
                                'score': this.addruleForm.score,
                                'error': type3
                            }
                            break;
                        case 4:
                            data = {
                                table: 'sSubject4',
                                'score': this.addruleForm.score
                            }
                            break;
                    }

                    data.id = this.$route.query.id;

                    axios.post('/addsubject', qs.stringify(data));

                }
            });
        },
        next(){
            this.isdisabled = false;
            if(this.active < 5){
                this.nextdisable = true;
                this.active++;
            } else {
                this.nextdisable = true;
            }
        },
        anign(){
            if(this.active >= 1 && this.active <= 4){
                this.isdisabled = false;
            }
        },
        handleCommand(command){
            this.ruleForm.date2 = command;
        },
        submitForm(formName) { // 修改
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                    this.centerDialogVisible = false;

                    let id = this.$route.query.id;

                    let sSubject = this.active;

                    var date = new Date(this.ruleForm.date1);
                    var date1 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

                    let fulldate = date1 + '-' + this.ruleForm.date2;

                    console.log(fulldate);

                    axios.post('/updatessubject', qs.stringify({
                        id: id,
                        sSubject: sSubject,
                        date: date
                    })).then(res => {
                        if(res.data == '1'){
                            this.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });

                            let that = this;

                            setTimeout(() => {
                                that.$router.push('/student/allstu');
                            }, 100);

                        }
                    })

                }
            });
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm => {
            let id = vm.$route.query.id;
            
            axios.get(`/findone?id=${id}`).then(res => {
                let nowinfo = res.data[0];
                var json_date = new Date(nowinfo.steTime).toJSON();
                let newdate =  new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                nowinfo.steTime = newdate;
                vm.studentinfo = nowinfo;
                vm.active = nowinfo.sSubject;
            });

            let now = vm.active;
            if(now === 0 || now === 5){
                vm.algindisable = true;
                vm.isadd = false;
            }

            // 请求四个科目表的数据
            axios.get(`/findsubject?id=${id}&table=sSubject1`).then(res => {
                let data = res.data;
                let testnum = 1;
                vm.tableData1 = data.map(item => {
                    let num = `第${testnum++}次`;
                    let score = item.j1Score + '分';
                    let type = item.j1Score >= 90 ? '通过' : '未通过';
                    let error = '无记录';
                    return {
                        num : num,
                        score : score,
                        error : error,
                        type : type
                    }
                });
            });

            axios.get(`/findsubject?id=${id}&table=sSubject2`).then(res => {
                let data = res.data;
                let testnum = 1;
                vm.tableData2 = data.map(item => {
                    let num = `第${testnum++}次`;
                    let score = item.j2Score + '分';
                    let type = item.j2Score >= 80 ? '通过' : '未通过';
                    let error = item.j2DeSub;
                    return {
                        num : num,
                        score : score,
                        error : error,
                        type : type
                    }
                });
            });

            axios.get(`/findsubject?id=${id}&table=sSubject3`).then(res => {
                let data = res.data;
                let testnum = 1;
                vm.tableData3 = data.map(item => {
                    let num = `第${testnum++}次`;
                    let score = item.j3Score + '分';
                    let type = item.j3Score >= 90 ? '通过' : '未通过';
                    let error = item.j3DeSub;
                    return {
                        num : num,
                        score : score,
                        error : error,
                        type : type
                    }
                });
            });

            axios.get(`/findsubject?id=${id}&table=sSubject4`).then(res => {
                let data = res.data;
                let testnum = 1;
                vm.tableData4 = data.map(item => {
                    let num = `第${testnum++}次`;
                    let score = item.j4Score + '分';
                    let type = item.j4Score >= 90 ? '通过' : '未通过';
                    let error = '无记录';
                    return {
                        num : num,
                        score : score,
                        error : error,
                        type : type
                    }   
                });
            });

        });
    }
}
</script>

<style scoped>
    @import '../../assets/css/coachpublic.css';

    h4{
        margin: 10px 0 20px 0;
    }

    .now{
        margin: 0 0 20px 0;
    }

    h3{
        margin: 20px 0;
    }

    .grid{
        margin: 30px 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 300px 300px;
        gap: 10px;
        grid-template-areas: 
            "sub1 sub2"
            "sub3 sub4"
        ;
    }

    .sub1{
        grid-area: sub1;
    }
    .sub2{
        grid-area: sub2;
    }
    .sub3{
        grid-area: sub3;
    }
    .sub4{
        grid-area: sub4;
    }

    .container{
        position: relative;
    }

    .addsub{
        position: absolute;
        top: 70px;
        right: 50px;
    }

</style>