const express = require('express');

const url = require('url');

const mockjs = require('mockjs');
const Random = mockjs.Random;

const app = express();

app.use('/images', express.static('images'));

const arr1 = require('./arr1.js');
const arr2 = require('./arr2.js');
const arr3 = require('./arr3.js');

// 小栏目的接口
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
    var THEWHERE = arr1;
  } else if (lm == '厨房用品') {
    var THEWHERE = arr2;
  } else if (lm == '首页') {
    var THEWHERE = arr3;
  } else {
    var THEWHERE = [];
  }

  const arr = [];
  // 随机一个不一样尺寸的领券中心
  const n = Random.integer(0, 9);
  for (let i = 0; i < 10; i++) {
    if (n == i) {
      arr.push({
        pic: 'http://192.168.43.106:3000/images/a.png',
        type: 2,
        width: 362,
        height: 427,
      });
    } else {
      arr.push({
        content: Random.cword(18, 30),
        content: Random.cword(18, 30),
        price: Random.integer(10, 300),
        pic: Random.pick(THEWHERE).pic,
        type: 1,
        hot: Random.pick([true, false]),
        width: 360,
        height: 360,
      });
    }
  }
  res.json(arr);
});

// 首页
app.get('/indexapi', (req, res) => {
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
          p1pic: 'yadan.jpg',
          p1price: '1.79',
          p2pic: 'juhua.jpg',
          p2price: '1.7',
        },
        g2: {
          title: '天天低价',
          p1pic: 'yadan.jpg',
          p1price: '1.79',
          p2pic: 'juhua.jpg',
          p2price: '1.7',
        },
        g3: {
          title: '天天低价',
          p1pic: 'yadan.jpg',
          p1price: '1.79',
          p2pic: 'juhua.jpg',
          p2price: '1.7',
        },
        g4: {
          title: '天天低价',
          p1pic: 'yadan.jpg',
          p1price: '1.79',
          p2pic: 'juhua.jpg',
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

    // 百度搜索 nodejs https发出get请求  https://blog.csdn.net/tiramisu_ljh/article/details/78487747
    // https://nodejs.org/api/https.html
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
          var resultobj = JSON.parse(result);

          // 读取“users.txt”模拟数据库
          fs.readFile('./users.txt', (err, content) => {
            var obj = JSON.parse(content.toString());
            // 判断键名是否存在，键名就是openId
            if (!obj.hasOwnProperty(resultobj.openid)) {
              // 如果没有这个键就要加上这个键
              obj[resultobj.openid] = {
                tel: '',
              };
              // 再把这个对象写进去
              fs.writeFile('./users.txt', JSON.stringify(obj), (err) => {
                outerres.json({ok: 1});
              });
            } else {
              outerres.json({ok: 1});
            }
          });
        });
      })
      .on('error', function (err) {
        Logger.error(err.stack);
        callback.apply(null);
      });
  });
});

app.listen(3000);
