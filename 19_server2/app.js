const express = require('express');

const url = require('url');

const mockjs = require('mockjs');
const Random = mockjs.Random;

const app = express();

app.use('/images', express.static('images'));

const arr1 = require('./arr1.js');
const arr2 = require('./arr2.js');

// 小栏目的接口
app.get('/xlm', (req, res) => {
  const lm = url.parse(req.url, true).query.lm;

  if (lm == '生鲜') {
    res.json(arr1);
  } else if (lm == '厨房用品') {
    res.json(arr2);
  }
});

// 瀑布流接口
app.get('/pbl', (req, res) => {
  const lm = url.parse(req.url, true).query.lm;

  if (lm == '生鲜') {
    var THEWHERE = arr1;
  } else if (lm == '厨房用品') {
    var THEWHERE = arr2;
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
        
      },
    },
  ]);
});

app.listen(3000);
