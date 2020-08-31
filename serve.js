const express = require('express');
const bodyparser = require('body-parser');

const sql = require('./sql');

const app = express();
app.use(bodyparser.urlencoded({extended: false}));

// 登录
app.post('/loginport', (req, res) => {

    sql.findall(req.body.table, (err, result) => {
        if(err){
            res.send('0'); // 数据库报错
            return;
        }

        let bool = true;
        result.forEach((element, index) => {

            if(element.aUser == req.body.user){
                bool = false;
                if(element.aPassword == req.body.password){

                    res.send('1'); // 登录成功

                    return;
                } else {

                    res.send('2'); // 密码错误

                    return;
                }
            }

            if(index == result.length - 1 && bool){
                res.send('3'); // 用户不存在
            }

        });

    });    

});

// 教练， 学员完整信息
app.get('/findinfo', (req, res) => {

    let table = req.query.table;

    sql.findinfo(table, (err, result) => {
        if(err){
            console.log('数据库错误');
            return;
        }
        res.send(result);
    });
});

// 删除学生、教练
app.post('/delete', (req, res) => {
    let id = req.body.id;
    let table = req.body.table;
    sql.delete(table, id, (err) => {
        if(err){
            res.end('0');
        }
        res.send('1');
    });
});

// 添加学生
app.post('/insertstu', (req, res) => {
    let data = req.body;
    sql.insertstu(data, (err) => {
        if(err){
            res.end('0');
        }
        res.send('1');
    });
});

// 修改学生
app.post('/updatestu', (req, res) => {
    let data = req.body;

    let arr = [];
    for (const key in data) {
        if(key == 'sSex'){
            data[key] == '男' ? arr.push(0) : arr.push(1);
        } else if(key == 'sAge' || key ==  'supCost' || key ==  'sSubject' || key ==  'steCost' || key ==  'sId'){
            arr.push(+data[key]);
        } else if (key == 'supTime') {
            arr.push(data[key].slice(0,data[key].indexOf('T')));
        } else {
            arr.push(data[key]);
        }
    }

    sql.updatestu(arr, (err) => {
        if(err){
            res.end('0');
        }
        res.send('1');
    });

});

// 查询某一个学生
app.get('/findone', (req, res) => {
    let id = +req.query.id;
    sql.findone(id, (err, result) => {
        if(err){
            res.end('0');
            return;
        }
        res.send(result);
    })
});

// 修改学生考情况
app.post('/updatessubject', (req, res) => {
    let data = req.body;

    let arr = [];

    arr.push(+data.sSubject);

    var json_date = new Date(data.date).toJSON();
    let newdate =  new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 

    arr.push(newdate);

    switch (data.sSubject) {
        case '0':
            arr.push(0);
            break;
        case '1':
            arr.push(150);
            break;
        case '2':
            arr.push(230);
            break;
        case '3':
            arr.push(230);
            break;
        case '4':
            arr.push(0);
            break;
        case '5':
            arr.push(0);
            break;
    }
    arr.push(+data.id);

    sql.updatesSubject(arr, (err) => {
        if(err){
            res.end('0');
            return;
        }
        res.send('1');
    })
});

// 查询已拿证学员
app.get('/findover', (req, res) => {
    sql.findover((err, result) => {
        if(err){
            res.end('0');
        }
        res.send(result);
    });
});

// 添加支出
app.post('/addpay', (req, res) => {

    let data = req.body;
    let arr = [];
    for (const key in data) {
        arr.push(data[key]);
    }
    arr[1] = +arr[1];

    sql.addpay(arr, (err, result) => {
        if(err){
            res.end('0');
        }
        res.send('1');
    });
});

// 学员缴费统计
app.get('/totalstudent', (req, res) => {
    sql.totalstudent((err, result) => {
        if(err){
            res.end('0');
        }
        res.send(result);
    });
});

// 支出缴费统计
app.get('/totalpay', (req, res) => {
    sql.totalpay((err, result) => {
        if(err){
            res.end('0');
        }
        res.send(result);
    });
});

// 支出分类统计
app.get('/totalclass', (req, res) => {
    sql.totalclass((err, result) => {
        if(err){
            res.end('0');
        }
        res.send(result);
    });
});

// 查询科目表
app.get('/findsubject', (req, res) => {
    let table = req.query.table;
    let id = req.query.id;
    sql.subject(table, id, (err, result) => {
        if(err){
            res.end('0');
        }
        res.send(result);
    });
});

// 添加考试情况
app.post('/addsubject', (req, res) => {
    let table = req.body.table;
    let arr = [];
    arr.push(req.body.id);
    arr.push(req.body.score);
    if(req.body.error !== undefined){
        arr.push(req.body.error);
    }
    sql.addsubject(table, arr, (err, result) => {
        if(err){
            res.end('0');
        }
        res.send(result);
    });
});


app.listen(9000);