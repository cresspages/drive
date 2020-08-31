create database drive;

use drive;

create table admin(
  aId int primary key auto_increment,
  aUser varchar(20) not null,
  aPassword varchar(20) not null
);
alter table admin auto_increment=1001;

insert into admin(aUser, aPassword) values('cress', 123456);

create table coachinfo(
  cid int primary key auto_increment,
  cname varchar(20) not null,
  csex int not null,
  cbrithday date not null,
  cpay decimal not null
);
alter table coachinfo auto_increment=1001;

select * from coachinfo;

insert into coachinfo(cname, csex, cbrithday, cpay) values('刘能', 0, '1978-10-04', 6000);
insert into coachinfo(cname, csex, cbrithday, cpay) values('赵四', 0, '1976-10-04', 7000);
insert into coachinfo(cname, csex, cbrithday, cpay) values('许三多', 0, '1980-10-04', 5000);

create table student(
  sId int primary key auto_increment,
  sName varchar(20) not null,
  sSex int not null,
  sAge int not null,
  supTime date not null, -- 报名时间
  supCost decimal not null, -- 报名费用
  sSubject int not null, -- 科目 0 刚开始报名   1 科目一   2 科目二   3 科目三   4 科目四   5 拿证
  steTime datetime not null, -- 考试时间
  steCost decimal not null -- 考试费用
);
alter table student auto_increment=2019001;

drop table student;

select * from student;

insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('gnfdhg', 0, 21, '2019-05-11', 2018, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('fasdf', 1, 18, '2019-05-11', 2018, 1, '2019-09-10-09-00-00', 150);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('wfsa', 0, 22, '2019-05-11', 2018, 2, '0000-00-00-00-00-00', 230);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('srfsdf', 1, 18, '2019-05-11', 2018, 1, '0000-00-00-00-00-00', 150);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('resv', 0, 19, '2019-05-11', 2018, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('asgfda', 0, 22, '2019-05-11', 2018, 1, '0000-00-00-00-00-00', 150);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('asvdsa', 1, 23, '2019-05-11', 2018, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('sdfv', 0, 18, '2019-05-11', 2018, 2, '0000-00-00-00-00-00', 230);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('sagvfds', 0, 23, '2019-05-11', 2018, 2, '0000-00-00-00-00-00', 230);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('wsagas', 1, 20, '2019-05-11', 2018, 2, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('ersges', 0, 18, '2019-05-11', 2018, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('regt', 0, 19, '2019-05-11', 2018, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('jnhfgn', 1, 24, '2019-05-11', 2018, 4, '0000-00-00-00-00-00', 0);



```
# 支出信息
create table pay(
  pId int primary key auto_increment,
  pType varchar(20) not null, -- 支出类型
  pCost decimal not null, -- 支出金额
  pDescription varchar(100) -- 支出描述
);
alter table pay auto_increment=1000000;

insert into pay(pType, pCost, pDescription) values('考试费', 150, '用于学员fasdf，于2019-09-10 09:00:00的科目一考试');

select * from pay;
```













create database drive;

use drive;

create table admin(
  aId int primary key auto_increment,
  aUser varchar(20) not null,
  aPassword varchar(20) not null
);
alter table admin auto_increment=1001;

insert into admin(aUser, aPassword) values('cress', 123456);

create table coachinfo(
  cid int primary key auto_increment,
  cname varchar(20) not null,
  csex int not null,
  cbrithday date not null,
  cpay decimal not null
);
alter table coachinfo auto_increment=1001;

select * from coachinfo;

insert into coachinfo(cname, csex, cbrithday, cpay) values('刘能', 0, '1978-10-04', 6000);
insert into coachinfo(cname, csex, cbrithday, cpay) values('赵四', 0, '1976-10-04', 7000);
insert into coachinfo(cname, csex, cbrithday, cpay) values('许三多', 0, '1980-10-04', 5000);

create table student(
  sId int primary key auto_increment,
  sName varchar(20) not null,
  sSex int not null,
  sAge int not null,
  supTime date not null, -- 报名时间
  supCost decimal not null, -- 报名费用
  sSubject int not null, -- 科目 0 刚开始报名   1 科目一   2 科目二   3 科目三   4 科目四   5 拿证
  steTime datetime not null, -- 考试时间
  steCost decimal not null -- 考试费用
);
alter table student auto_increment=2019001;

drop table student;

select * from student;

insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('gnfdhg', 0, 21, '2019-05-11', 2018, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('fasdf', 1, 18, '2019-05-11', 2018, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('wfsa', 0, 22, '2019-05-11', 2800, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('srfsdf', 1, 18, '2019-05-11', 2018, 0, '0000-00-00-00-00-00', 0);
insert into student(sName, sSex, sAge, supTime, supCost, sSubject, steTime, steCost) values('resv', 0, 19, '2019-05-11', 3000, 0, '0000-00-00-00-00-00', 0);

create table sSubject1(
  jId int not null,
  j1num int(2) primary key auto_increment, -- 考试次数
  j1Score int(10) not null, -- 科目一分数
  foreign key(jId) references student(sId)
);
alter table sSubject1 auto_increment=1;

create table sSubject2(
  jId int not null,
  j2num int(2) primary key auto_increment, -- 考试次数
  j2Score int(10) not null, -- 总分
  j2DeSub varchar(200) not null, -- 失分科目  存在的项目 倒车入库 直角转弯 曲线行驶 坡道定点 侧方停车
  foreign key(jId) references student(sId)
);
alter table sSubject2 auto_increment=1;

create table sSubject3(
  jId int not null,
  j3num int(2) primary key auto_increment, -- 考试次数
  j3Score int(10) not null, -- 总分
  j3DeSub varchar(200) not null, -- 失分科目  存在的项目 上车准备 灯光模拟 起步 直线行驶 百米加减 变更车道 转弯 掉头 靠边停车
  foreign key(jId) references student(sId)
);
alter table sSubject3 auto_increment=1;

create table sSubject4(
  jId int not null,
  j4num int(2) primary key auto_increment, -- 考试次数
  j4Score int(10) not null, -- 分数
  foreign key(jId) references student(sId)
);
alter table sSubject4 auto_increment=1;



-- 科目一
insert into sSubject1(jId,j1Score) values(2019001, 92);

-- 科目二
insert into sSubject2(jId,j2Score,j2DeSub) values(2019001, 80, '倒车入库');

-- 科目三
insert into sSubject3(jId,j3Score,j3DeSub) values(2019001, 92, '直线行驶');

-- 科目四
insert into sSubject4(jId,j4Score) values(2019001, 96);

select * from sSubject1;
select * from sSubject2 where jId=2019003;
select * from sSubject3;
select * from sSubject4;

drop table sSubject1;
drop table sSubject2;
drop table sSubject3;
drop table sSubject4;










# 支出信息
create table pay(
  pId int primary key auto_increment,
  pType varchar(20) not null, -- 支出类型
  pCost decimal not null, -- 支出金额
  pDescription varchar(100) -- 支出描述
);
alter table pay auto_increment=1000000;

insert into pay(pType, pCost, pDescription) values('考试费', 150, '用于学员fasdf，于2019-09-10 09:00:00的科目一考试');

select * from pay;