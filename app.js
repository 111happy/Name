//引入express框架
const express = require('express');

//引入路径处理模块
const path = require('path');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const requset = require('request');
const mongoose = require('mongoose');


//创建web服务器
const app = express();

app.use(bodyParser.json());

//静态资源访问服务器功能
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://itcast:itcast@localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true     //这个即是报的警告
}).then(res => {
    console.log('数据库连接成功')
})

app.get('/first', (req, res) => {

    res.send('Hello');
});

app.get('/responseData', (req, res) => {
    res.send({ "name": "zs" });
});

app.get('/get', (req, res) => {
    res.send(req.query);
});

app.post('/post', (req, res) => {
    res.send(req.body);
});

app.post('/json', (req, res) => {
    res.send(req.body);
});

app.get('/readystate', (req, res) => {
    res.send("hello");
});

app.get('/error', (req, res) => {
    res.status(400).send('not ok');
});

app.get('/cache', (req, res) => {
    fs.readFile('./test.txt', (err, result) => {
        res.send(result);
    });
})
app.get('/verifyEmailAdress', (req, res) => {
    // 接收客户端传递过来的邮箱地址
    const email = req.query.email;
    // 判断邮箱地址注册过的情况
    if (email == 'itheima@itcast.cn') {
        // 设置http状态码并对客户端做出响应
        res.status(400).send({ message: '邮箱地址已经注册过了, 请更换其他邮箱地址' });
    } else {
        // 邮箱地址可用的情况
        // 对客户端做出响应
        res.send({ message: '恭喜, 邮箱地址可用' });
    }
});
// 输入框文字提示
app.get('/searchAutoPrompt', (req, res) => {
    // 搜索关键字
    const key = req.query.key;
    // 提示文字列表
    const list = [
        '黑马程序员',
        '黑马程序员官网',
        '黑马程序员顺义校区',
        '黑马程序员学院报名系统',
        '传智播客',
        '传智博客前端与移动端开发',
        '传智播客大数据',
        '传智播客python',
        '传智播客java',
        '传智播客c++',
        '传智播客怎么样'
    ];
    // 搜索结果
    let result = list.filter(item => item.includes(key));
    // 将查询结果返回给客户端
    res.send(result);
});
app.get('/province', (req, res) => {
    
    const list = [
        
        {
            id: 1,
            name: "北京市",
            city: [
                {   id : 1,
                    name: "北京市",
                    districtAndCounty: ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县", "延庆镇"]
                }
            ]
        },
        {
            id: 2,
            name: "天津市",
            city: [
                {   id : 1,
                    name: "天津市",
                    districtAndCounty: ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "蓟县", "宁河县", "芦台镇", "静海县", "静海镇"]
                }
            ]
        },
        {
            id: 3,
            name: "上海市",
            city: [
                {   id : 1,
                    name: "上海市",
                    districtAndCounty: ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县", "城桥镇"]
                }
            ]
        },
        {
            id : 4,
            name: "河北省",
            city: [
              { id : 1,
                name: "石家庄市",
                districtAndCounty: ["长安区", "桥东区", "桥西区", "新华区", "裕华区", "井陉矿区", "辛集市", "藁城市", "晋州市", "新乐市", "鹿泉市", "井陉县", "微水镇", "正定县", "正定镇", "栾城县", "栾城镇", "行唐县", "龙州镇", "灵寿县", "灵寿镇", "高邑县", "高邑镇", "深泽县", "深泽镇", "赞皇县", "赞皇镇", "无极县", "无极镇", "平山县", "平山镇", "元氏县", "槐阳镇", "赵县", "赵州镇"]
              },
              { id : 2,
                name: "张家口市",
                districtAndCounty: ["桥西区", "桥东区", "宣化区", "下花园区", "宣化县", "张家口市宣化区", "张北县", "张北镇", "康保县", "康保镇", "沽源县", "平定堡镇", "尚义县", "南壕堑镇", "蔚县", "蔚州镇", "阳原县", "西城镇", "怀安县", "柴沟堡镇", "万全县", "孔家庄镇", "怀来县", "沙城镇", "涿鹿县", "涿鹿镇", "赤城县", "赤城镇", "崇礼县", "西湾子镇"]
              },
              {
                id : 3,
                name: "承德市",
                districtAndCounty: ["双桥区", "双滦区", "鹰手营子矿区", "承德县", "下板城镇", "兴隆县", "兴隆镇", "平泉县", "平泉镇", "滦平县", "滦平镇", "隆化县", "隆化镇", "丰宁满族自治县", "大阁镇", "宽城满族自治县", "宽城镇", "围场满族蒙古族自治县", "围场镇"]
              }
            ]
          }
      
    ];
        res.send(list);

});

app.post('/formData', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 解析客户端传递过来的FormData对象
    form.parse(req,(err,fields,files) => {
        res.send(fields);
    })
    
});

// 实现文件上传的路由
app.post('/upload', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径e
    form.uploadDir = path.join(__dirname,'public', 'uploads');
    // 保留上传文件的后缀名字
    form.keepExtensions = true;
    // 解析客户端传递过来的FormData对象
    form.parse(req,(err,fields,files) => {
        res.send({
            path: files.attrName.path.split('public')[1]
        });
    })
 });
 
app.get('/server',(req,res) => {
    requset('http://localhost:3001/cross',(err,response,body) =>{
            
            res.send(body);
    })
});
app.get('/base',(req,res) =>{
    var a = req.query;
    res.send(a);
     // res.send({name : 'lisi',age : 40});
})
app.post('/base',(req,res) =>{
    var a = req.query;
    res.send(a);
    // res.send({name : 'lisi',age : 40});
})
app.post('/user',(req,res) =>{

    res.send('ok..');
});
app.get('/jsonp',(req,res) =>{
    // res.jsonp({
    //     name : 'lisi',
    //     age : 30 
    // })
    const cb = req.query.cb;
    const data = cb + "({name : 'zhaoliu'})";
    res.send(data);
});

const todoRouter = require('./todo')
app.use('/todo', todoRouter);

app.get('/users',(req,res) => {
    res.send('获取用户列表信息的路由');
});
app.get('/users/:id',(req,res) => {
    // 获取客户端传递过来的用户id
   const id = req.params.id;
   res.send(`当前在获取id为${id}的信息`);
});
app.delete('/users/:id',(req,res) => {
    // 获取客户端传递过来的用户id
    const id = req.params.id;
    res.send(`当前在删除id为${id}的信息`);
});
app.put('/users/:id', (req, res) => {
    // 获取客户端传递过来的用户id
    const id = req.params.id;
    res.send(`当前在添加id为${id}的信息`);

});
app.get('/xml', (req, res) => {
    // 设置响应头 ：返回xml数据
    res.header('content-type', 'text/xml');
    res.send('<message><title>消息标题</title><content>消息内容</content></message>');
});

//监听端口
app.listen(3000);

//控制台提示输出
console.log('服务器启动成功');