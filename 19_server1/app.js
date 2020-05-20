const express = require('express');

const app = express();

const url = require('url');

const mockjs = require('mockjs');

const Random = mockjs.Random;

// 模块
const arr1 = require('./arr1.js');
const arr2 = require('./arr2.js');

// 开静态
app.use('/images', express.static('images'));

// 小栏目接口
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
    var THEARR = arr1;
  } else if (lm == '厨房用品') {
    var THEARR = arr2;
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
app.listen(3000);
