<template>
    <div class="container">
        <h2>添加学员</h2>
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
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
    data(){
        return {
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
            }
        }
    },
    methods: {
        submitForm(formName) { // 添加、修改
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    axios.post('/insertstu', qs.stringify(this.ruleForm)).then(res=> {
                        if(res.data == '1'){

                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });

                            let that = this;
                            setTimeout(() => {
                                that.$router.push('/student/allstu');
                            }, 200);

                        } else if(res.data == '0'){
                            this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    });
                }
            });
        },
        resetForm(formName) { // 清空添加修改
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style scoped>

@import '../../assets/css/coachpublic.css';

.el-form{
    margin-top: 20px;
    width: 500px;
}

</style>