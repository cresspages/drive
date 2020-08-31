<template>
    <div class="container">
        <h2>学员信息</h2>

        <div class="select">
            <template>
                <el-input class="search-input" v-model="search" placeholder="输入姓名搜索"/>
            </template>
            <template>
                <el-select class="search-select" v-model="nowsub" placeholder="请选择">
                    <el-option
                    v-for="item in sub"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </template>

            <el-button type="primary" @click='find'>查询</el-button>
            <el-button @click='clear'>重置</el-button>
        </div>

        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" max-height="calc(100% - 100)">
            <el-table-column label="姓名" prop="sName" min-width="100"></el-table-column>
            <el-table-column label="性别" prop="sSex" min-width="50"></el-table-column>
            <el-table-column label="年龄" prop="sAge" min-width="50"></el-table-column>
            <el-table-column label="报名时间" prop="supTime" min-width="150"></el-table-column>
            <el-table-column label="进度" prop="sSubject" min-width="100"></el-table-column>
            <el-table-column align="right" min-width="250">
                <template slot="header">
                    操作
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>

                    <template>
                        <el-popconfirm title="确定删除吗？" @onConfirm='define' @onCancel='cancel'>
                            <el-button slot="reference" size="mini" type="danger" @click.native.prevent="deleteRow(scope.$index, tableData, scope.row)">删除</el-button>
                        </el-popconfirm>
                    </template>
                    <el-button type="success" size='mini' @click="checkmore(scope.row)">管理科目</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template>
            <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            :page-sizes='size'
            @size-change='sizechange'
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
            </el-pagination>
        </template>

        <el-dialog title="修改" :visible.sync="dialogVisible" width="450px" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="sName">
                    <el-input v-model="ruleForm.sName"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sSex">
                    <el-radio-group v-model="ruleForm.sSex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="sAge">
                    <el-input v-model="ruleForm.sAge" type="number" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                </el-form-item>
                <el-form-item label="报名日期" required>
                    <el-col :span="11">
                    <el-form-item prop="supTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.supTime" style="width: 100%;" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="报名费用" prop="supCost">
                    <el-input v-model="ruleForm.supCost" type="number" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

    import axios from 'axios';
    import qs from 'qs';

    export default {
        data() {
            return {
                tableData: [],
                tableData2: [],
                currentPage: 1, // 默认从第一页开始
                pagesize: 5, // 默认显示多少条数据
                size: [5, 10, 15], // 每页显示多少条数据
                search: '', // 查询到的数据
                index: '', 
                table: '',
                nowinfo: '',
                dialogVisible: false, // 修改框
                type: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                            }
                        }
                    ]
                },
                ruleForm: {
                    sName: '',
                    sSex: '',
                    sAge: '',
                    supTime: '',
                    supCost: '',
                    sSubject: 0,
                    steTime: '0000-00-00-00-00-00',
                    steCost: 0
                    },
                rules: {
                    sName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    sSex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    sAge: [
                        { required: true, message: '请输入年龄', trigger: 'blur' }
                    ],
                    supTime: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    supCost: [
                        { required: true, message: '请输入报名费用', trigger: 'blur' }
                    ],
                },
                sub: [
                    {value: '报名',
                    lable: '报名'},
                    {value: '科目一',
                    lable: '科目一'},
                    {value: '科目二',
                    lable: '科目二'},
                    {value: '科目三',
                    lable: '科目三'},
                    {value: '科目四',
                    lable: '科目四'},
                    {value: '拿证',
                    lable: '拿证'},
                ],
                nowsub: ''
            }
        },
        methods: {
            find(){
                this.tableData = this.tableData2.filter(data => !this.search || data.sName.toLowerCase().includes(this.search.toLowerCase()))
                .filter(data => !this.nowsub || data.sSubject.toLowerCase().includes(this.nowsub.toLowerCase()));
            },
            clear(){
                this.search = '';
                this.nowsub = '';
            },
            handleCurrentChange(val) {
                this.currentPage = +val;
            },
            sizechange(val){
                this.pagesize = val;
            },
            handleEdit(index, row) { // 修改

                this.dialogVisible = true;

                this.index = index;
                this.nowinfo = row;

                this.ruleForm.sName = row.sName;
                this.ruleForm.sSex = row.sSex;
                this.ruleForm.sAge = row.sAge;
                // this.ruleForm.supTime = row.supTime; // 会报错
                this.ruleForm.supCost = row.supCost;

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            deleteRow(index, row, nowinfo) { // 删除

                this.index = index;
                this.table = row;
                this.nowinfo = nowinfo;

            },
            submitForm(formName) { // 修改
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            
                        let id = this.nowinfo.sId;

                        let info = {...this.ruleForm};

                        info.sId = id;

                        var date = new Date(info.supTime);
                        var date1 = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)}-${date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()}`;
                        info.supTime = date1;

                        axios.post('/updatestu', qs.stringify(info)).then(res => {
                            this.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success'
                                });
                        });

                        this.tableData.forEach((item, index) => { // 页面改变数据
                            if(item.sId == id){
                                this.tableData[index] = info;

                                this.tableData[index].sSubject = '报名';

                            }
                        });
                        
                        this.dialogVisible = false;

                    }
                });
            },
            define(){ // 确认删除
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                });

                this.table.splice(this.index, 1);

                let id = this.nowinfo.sId;

                let data = {table: 'student', id: id};

                axios.post('/delete', qs.stringify(data));

            },
            cancel(){// 删除取消
                this.$message({
                    showClose: true,
                    message: '取消删除'
                });

                this.index = '';
                this.table = '';
                this.nowinfo = '';
            },
            checkmore(row){ // 查看更多

                this.$router.push({
                    path: '/student/allstu/fullinfo',
                    query: {
                        id: row.sId
                    }
                });
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

                            let newsex = element.sSex == 0 ? '男' : '女';
                            data[index].sSex = newsex;

                            switch(element.sSubject){
                                case 0:
                                    data[index].sSubject = '报名';
                                    break;
                                case 1:
                                    data[index].sSubject = '科目一';
                                    break;
                                case 2:
                                    data[index].sSubject = '科目二';
                                    break;
                                case 3:
                                    data[index].sSubject = '科目三';
                                    break;
                                case 4:
                                    data[index].sSubject = '科目四';
                                    break;
                                case 5:
                                    data[index].sSubject = '拿证';
                                    break;
                            }

                            var json_date = new Date(element.steTime).toJSON();
                            let newdate =  new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                            data[index].steTime = newdate;

                        });

                        vm.tableData = data;
                        vm.tableData2 = data;
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

.el-pagination{
    text-align: center;
    margin-top: 30px;
}

.el-input{
    width: 70%;
}

.select{
    margin: 30px 0;
}

.search-input, .search-select{
    width: 200px;
    margin-right: 30px;
}

</style>