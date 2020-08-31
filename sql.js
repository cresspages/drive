const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "localhost",
    port : "3306",
    user : "root",
    password : "123456",
    database : "drive"
});

// 登录
exports.findall = function(table, callback){
    let sql = `select * from ${table};`;
    connection.query(sql, (err, result) => {
        callback(err, result);
    })
}

// 教练、学生完整信息
exports.findinfo = function(table, callback){
    let sql = `select * from ${table};`;
    connection.query(sql, (err, result) => {
        callback(err, result);
    })
}

// 删除学生、教练
exports.delete = function(table, id, callback){
    let idname = table == 'student' ? 'sId' : 'cid';
    let sql = `delete from ${table} where ${idname} = ?`;
    connection.query(sql, id, (err, result)=>{
        callback(err);
    })
}

// 添加学员
exports.insertstu = function(data, callback){
    let name = data.sName;
    let sex = data.sSex == '男' ? 0 : 1;
    let age = +data.sAge;
    let singupTime = data.supTime.slice(0,data.supTime.indexOf('T'));
    let singupcost = +data.supCost;
    let sSubject = +data.sSubject;
    let steTime = data.steTime;
    let steCost = +data.steCost;
    let sql = "insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values(?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [name, sex, age, singupTime, singupcost, sSubject, steTime, steCost], (err) => {
        callback(err);
    })
}

// 修改学员信息
exports.updatestu = function(arr, callback){
    let sql = "update student set sName=?, sSex=?, sAge=?, supTime=?, supCost=?, sSubject=?, steTime=?, steCost=? where sId=?;";
    connection.query(sql, arr, (err) => {
        callback(err);
    });
}

// 查询某一个学生
exports.findone = function(id, callback){
    let sql = 'select * from student where sId=?';
    connection.query(sql, id, (err, result) => {
        callback(err, result);
    })
}

// 修改学员考试情况
exports.updatesSubject = function(arr, callback){
    let sql = 'update student set sSubject=?, steTime=?, steCost=? where sId=?;';
    connection.query(sql, arr, (err) => {
        callback(err);
    })
}

// 查询已拿证学员
exports.findover = function(callback){
    let sql = 'select * from student where sSubject=5;';
    connection.query(sql, (err, result) => {
        callback(err, result);
    })
}

// 添加支出
exports.addpay = function(arr, callback){
    let sql = 'insert into pay(pType, pCost, pDescription) values(?, ?, ?);';
    connection.query(sql, arr, (err, result) => {
        callback(err, result);
    });
}

// 学员缴费统计
exports.totalstudent = function(callback){
    let sql = 'select sum(supCost) as total,count(*) as people from student;'
    connection.query(sql, (err, result) => {
        callback(err, result);
    });
}

// 支出缴费统计
exports.totalpay = function(callback){
    let sql = 'select sum(pCost) as total,count(*) as amount from pay;'
    connection.query(sql, (err, result) => {
        callback(err, result);
    });
}

// 支出分类统计
exports.totalclass = function(callback){
    let sql = 'select sum(pCost) as value,pType as name from pay group by pType;'
    connection.query(sql, (err, result) => {
        callback(err, result);
    });
}

// 科目表的查询
exports.subject = function(table, id, callback){
    let sql = `select * from ${table} where jId=?`;
    connection.query(sql, id, (err, result) => {
        callback(err, result);
    });
}

// 添加考试情况
exports.addsubject = function(table, arr, callback){
    let sql;
    switch (table) {
        case 'sSubject1':
            sql = `insert into sSubject1(jId, j1Score) values(?, ?)`
            break;
        case 'sSubject2':
            sql = `insert into sSubject2(jId, j2Score, j2DeSub) values(?, ?, ?)`
            break;
        case 'sSubject3':
            sql = `insert into sSubject3(jId, j3Score, j3DeSub) values(?, ?, ?)`
            break;
        case 'sSubject4':
            sql = `insert into sSubject4(jId, j4Score) values(?, ?)`
            break;
    }
    console.log(arr);
    connection.query(sql, arr, (err, result) => {
        callback(err, result);
    });
}