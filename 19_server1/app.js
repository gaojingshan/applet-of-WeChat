const express = require('express');

const app = express();

const url = require('url');

const mockjs = require('mockjs');

const Random = mockjs.Random;

const formidable = require('formidable');

const https = require('https');
const iconv = require('iconv-lite');
const fs = require('fs');

// 模块
const arr1 = require('./arr1.js');
const arr2 = require('./arr2.js');
const arr3 = require('./arr3.js');

// 开静态
app.use('/images', express.static('images'));

// 小栏目接口
app.get('/xlm', (req, res) => {
  const lm = url.parse(req.url, true).query.lm;
  if (lm == '生鲜') {
    res.json(arr1);
  } else if (lm == '厨房用品') {
    res.json(arr2);
  } else {
    res.json([]);
  }
});

// 瀑布流接口
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
  // 随机一个数字
  var n = Random.integer(0, 9);
  for (var i = 0; i < 10; i++) {
    // 如果i和随机的数字相同，那么就是用广告
    if (i == n) {
      result.push({
        pic: 'http://192.168.43.106:3000/images/a.png',
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

// 首页
app.get('/indexapi', (req, res) => {
  // 决定用哪个模板
  res.json([
    {
      type: 'myswiper',
      data: {
        images: [
          'http://192.168.43.106:3000/images/banner/1.jpg',
          'http://192.168.43.106:3000/images/banner/2.jpg',
          'http://192.168.43.106:3000/images/banner/3.jpg',
          'http://192.168.43.106:3000/images/banner/4.jpg',
          'http://192.168.43.106:3000/images/banner/5.jpg',
        ],
      },
    },
    {
      type: 'icons',
      data: {
        images: [
          {
            pic: '1.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '2.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '3.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '4.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '5.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '6.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '7.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '8.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '9.png',
            title: 'xx',
            link: '',
          },
          {
            pic: '10.png',
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
          p1: 'yadan.jpg',
          p1link: '',
          p1price: '1.79',
          p2: 'juhua.jpg',
          p2link: '',
          p2price: '1.7',
        },
        g2: {
          title: '天天低价',
          info: '人气好货限时抢',
          p1: 'yadan.jpg',
          p1link: '',
          p1price: '1.79',
          p2: 'juhua.jpg',
          p2link: '',
          p2price: '1.7',
        },
        g3: {
          title: '天天低价',
          info: '人气好货限时抢',
          p1: 'yadan.jpg',
          p1link: '',
          p1price: '1.79',
          p2: 'juhua.jpg',
          p2link: '',
          p2price: '1.7',
        },
        g4: {
          title: '天天低价',
          info: '人气好货限时抢',
          p1: 'yadan.jpg',
          p1link: '',
          p1price: '1.79',
          p2: 'juhua.jpg',
          p2link: '',
          p2price: '1.7',
        },
      },
    },
  ]);
});

// 通过code换OpenId
app.post('/getMyOpenId', (req, outerres) => {
  const form = formidable({multiples: true});
  form.parse(req, (err, fields, files) => {
    // fields参数就是HTTP的报文体中的信息
    console.log('服务器已经收到了你的code' + fields.code);

    var url =
      'https://api.weixin.qq.com/sns/jscode2session?appid=wx4f35b7c886a891eb&secret=418b1d054721a6848fda8a293eeab45e&js_code=' +
      fields.code +
      '&grant_type=authorization_code';

    // 发出https的get请求，等于说是我们的服务器发往小程序的服务器，服务器和服务器之间也可以有https请求。
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

          // 读取“users.txt”模拟数据库
          fs.readFile
        });
      })
      .on('error', function (err) {
        Logger.error(err.stack);
        callback.apply(null);
      });
  });
});

app.listen(3000);
