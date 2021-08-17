const express = require('express');

const app = express();

const url = require('url');

const mockjs = require('mockjs');
const Random = mockjs.Random;

const formidable = require('formidable');
const https = require('https');
const iconv = require('iconv-lite');

const fs = require('fs');

const request = require('request');

const arr1 = require('./arr1.js');
const arr2 = require('./arr2.js');
const arr3 = require('./arr3.js');

// 开静态
app.use('/images', express.static('images'));

// 小栏目的接口
app.get('/xlm', (req, res) => {
  const lm = url.parse(req.url, true).query.lm;
  console.log(lm);
  if (lm == '生鲜') {
    res.json(arr1);
  } else if (lm == '厨房用品') {
    res.json(arr2);
  } else {
    res.json([]);
  }
});

// 瀑布流的接口
app.get('/pbl', (req, res) => {
  const lm = url.parse(req.url, true).query.lm;
  if (lm == '生鲜') {
    var THEARR = arr1;
  } else if (lm == '厨房用品') {
    var THEARR = arr2;
  } else if (lm == '首页') {
    var THEARR = arr3;
  } else {
    var THEARR = [];
  }

  var result = [];
  var n = Random.integer(0, 9);

  for (var i = 0; i < 10; i++) {
    // 如果i和随机的这个数字相同，那么就是用广告
    if (i == n) {
      result.push({
        pic: 'http://127.0.0.1:3000/images/a.png',
        type: 2,
        width: 362,
        height: 427,
      });
    } else {
      result.push({
        title: Random.cword(10, 18),
        info: Random.cword(20, 35),
        price: Random.integer(10, 300),
        pic: Random.pick(THEARR).pic,
        type: 1,
        hot: Random.pick([true, false]),
        width: 360,
        height: 360,
      });
    }
  }
  res.json(result);
});

// 首页接口
app.get('/indexapi', (req, res) => {
  // 决定用哪个模板
  res.json([
    {
      type: 'myswiper',
      data: {
        images: [
          'https://gw.alicdn.com/imgextra/i1/104/O1CN01J4phPW1Cdfn7lggoD_!!104-0-lubanu.jpg',
          'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
          'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg',
          'https://img.alicdn.com/imgextra/i3/96/O1CN01ETGAv11Ca0ceDv427_!!96-0-luban.jpg',
          'https://gw.alicdn.com/imgextra/i2/71387/O1CN01wQacQW1M7HwaLoffA_!!71387-0-lubanu.jpg',
        ],
      },
    },
    {
      type: 'icons',
      data: {
        images: [
          {
            pic: '158140198536389245.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225094251284751.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225098618947382.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225102941495158.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225106790473382.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225110605546246.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225119197911173.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225123358512204.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225135374622745.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '158225129991255185.png',
            title: 'xx',
            link: '',
          },
        ],
      },
    },
    {
      type: 'hotpro',
      data: {
        g1: {
          title: '天天低价',
          info: '人气好货限时抢',
          p1: '10053830810571249739picH_1.jpg',
          p1link: '',
          p1price: '1.79',
          p2: '10053913811701644223picH_1.jpg',
          p2link: '',
          p2price: '1.7',
        },
        g2: {
          title: '天天低价',
          info: '人气好货限时抢',
          p1: '10053830810571249739picH_1.jpg',
          p1link: '',
          p1price: '1.79',
          p2: '10053913811701644223picH_1.jpg',
          p2link: '',
          p2price: '1.7',
        },
        g3: {
          title: '天天低价',
          info: '人气好货限时抢',
          p1: '10053830810571249739picH_1.jpg',
          p1link: '',
          p1price: '1.79',
          p2: '10053913811701644223picH_1.jpg',
          p2link: '',
          p2price: '1.7',
        },
        g4: {
          title: '天天低价',
          info: '人气好货限时抢',
          p1: '10053830810571249739picH_1.jpg',
          p1link: '',
          p1price: '1.79',
          p2: '10053913811701644223picH_1.jpg',
          p2link: '',
          p2price: '1.7',
        },
      },
    },
  ]);
});

// 登录接口,post请求需要formidable
// 通过code换OpenId，OpenId是唯一标识
/* app.post('/getMyOpenId', (req, outerres) => {
  const form = formidable({ multiples: true });

  // fields为form表单提交的参数对象，如：{ user: 'guomushan', password: '111111' };
  form.parse(req, (err, fields, files) => {
    console.log('服务器已经收到了你的code' + fields.code);

    var url =
      'https://api.weixin.qq.com/sns/jscode2session?appid=wx4f35b7c886a891eb&secret=7493712d433c25ff372485bf30cdcdc0&js_code=' +
      fields.code +
      '&grant_type=authorization_code';

    // 发出https的get请求，等于说是我们的服务器发往小程序的服务器，服务器与服务器之间也可以有https请求
    https
      .get(url, function (res) {
        var datas = [];
        var size = 0;
        res.on('data', function (data) {
          datas.push(data);
          size += data.length;
          //process.stdout.write(data);
        });
        res.on('end', function () {
          var buff = Buffer.concat(datas, size);
          var result = iconv.decode(buff, 'utf8'); //转码//var result = buff.toString();//不需要转编码,直接tostring
          console.log(result);
          //  JSON.parse() 方法将数据转换为 JavaScript 对象
          var resultobj = JSON.parse(result);

          // 读取“users.txt”模拟数据库  ，这个文件里面要先留个空对象{}，否则会报错
          fs.readFile('./users.txt', (err, content) => {
            var obj = JSON.parse(content.toString());
            // 判断键名是否存在，键名就是openid
            // hasOwnProperty()函数用于指示一个对象自身(不包括原型链)是否具有指定名称的属性。
            if (!obj.hasOwnProperty(resultobj.openid)) {
              // 如果没有这个键，就要加上这个键
              obj[resultobj.openid] = {
                tel: '',
              };
              // 再把这个对象写进去
              fs.writeFile('./users.txt', JSON.stringify(obj), (err) => {
                outerres.json({ ok: 1 });
              });
            } else {
              outerres.json({ ok: 1 });
            }
          });
        });
      })
      .on('error', function (err) {
        Logger.error(err.stack);
        callback.apply(null);
      });
  });
}); */

// 发送验证码
app.get('/sendsms', (req, res) => {
  request({
    url:
      'http://yzxtz.market.alicloudapi.com/yzx/notifySms?phone=18610725427&templateId=TP19082016&variable=code:123123',
    method: 'POST',
    json: true,
    headers: {
      'content-type': 'application/json',
      Authorization: 'APPCODE8ae5612c0e7f4d2ba70ae79e1490bf88',
    },
    body: {},
  },
    function (error, response, body) {
      console.log(error);

      console.log(response); // 请求成功的处理逻辑
      console.log(body); // 请求成功的处理逻辑
      res.json({ ok: 1 });
    });
});


// 图片上传接口
app.post('/doup', (req, res) => {
  // 在这里进行上传图片的接收
  const form = formidable({
    multiples: true,
    uploadDir: './uploads',
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ fields, files }, null, 2));
  });
})

app.listen(3000);
