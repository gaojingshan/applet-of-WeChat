const express = require('express');
const mockjs = require('mockjs');
const Random = mockjs.Random;

const app = express();

// 无穷滚动
app.get('/info', (req, res) => {
  // 按理说应该收一个page请求，但是因为收不收都是模拟的
  // 所以不收了
  var arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push({
      title: Random.cword(20, 35),
    });
  }
  res.json({arr});
});

app.listen(3000);
