const express = require('express');

const app = express();

const url = require('url');

const mockjs = require('mockjs');

const Random = mockjs.Random;

// 模块
const arr1 = require('./arr1.js');
const arr2 = require('./arr2.js');

app.use(express.static('www'));
// 小栏目
app.get('/xlm', (req, res) => {
  const lm = url.parse(req.url, true).query.lm;
  if (lm == '生鲜') {
    res.json(arr1);
  } else if (lm == '厨房用品') {
    res.json(arr2);
  }
});

// 瀑布流
app.get('/pbl', (req, res) => {
  const lm = url.parse(req.url, true).query.lm;
  if (lm == '生鲜') {
    var result = [];
    for (var i = 0; i < 10; i++) {
      result.push({
        title: Random.cword(10, 18),
        info: Random.cword(20, 35),
        price: Random.integer(10, 300),
        pick: Random.pick(arr1).pic,
      });
    }
    res.json(result);
  }
});
app.listen(3000);
