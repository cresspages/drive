<template>
    <div class="container">
        <h2>添加支出</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="支出类型" prop="pType">
                <el-select v-model="ruleForm.pType" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金额" prop="pCost">
                <el-input v-model="ruleForm.pCost" type="number" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
            </el-form-item>
            <el-form-item label="支出描述" prop='pDescription'>
                <el-input type="textarea" v-model="ruleForm.pDescription"></el-input>
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
            options: [
                {
                    value: '考试缴费',
                    label: '考试缴费'
                }, {
                    value: '车辆方面',
                    label: '车辆方面'
                }, {
                    value: '其他',
                    label: '其他'
                }
            ],
            ruleForm: {
                pType: '',
                pCost: '',
                pDescription: ''
            },
            rules: {
                pType: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                pCost: [
                    { required: true, message: '请输入金额', trigger: 'blur' }
                ],
                pDescription: [
                    { required: true, message: '请输入详细信息', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) { // 添加、修改
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    axios.post('/addpay', qs.stringify(this.ruleForm)).then(res=> {
                        if(res.data == '1'){

                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });

                            this.ruleForm.pType = '';
                            this.ruleForm.pCost = '';
                            this.ruleForm.pDescription = '';
                            this.$refs[formName].resetFields();

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

<style>
@import '../../assets/css/coachpublic.css';
.el-form{
    margin-top: 20px;
    width: 500px;
}
</style>