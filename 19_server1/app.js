const express = require('express');

const app = express();
const url = require('url');
app.use(express.static('www'));
app.get('/xlm', (req, res) => {
  const lm = url.parse(req.url, true).query.lm;
  if (lm == '生鲜') {
    res.json([
      {
        c: '牛排',
        pic: 'http://192.168.43.106:3000/1.jpg',
      },
      {
        c: '肉卷',
        pic: 'http://192.168.43.106:3000/2.jpg',
      },
      {
        c: '皮蛋',
        pic: 'http://192.168.43.106:3000/3.jpg',
      },
      {
        c: '虾仁',
        pic: 'http://192.168.43.106:3000/4.jpg',
      },
      {
        c: '海鲜',
        pic: 'http://192.168.43.106:3000/5.jpg',
      },
      {
        c: '海参',
        pic: 'http://192.168.43.106:3000/6.jpg',
      },
      {
        c: '奇异果',
        pic: 'http://192.168.43.106:3000/7.jpg',
      },
      {
        c: '百香果',
        pic: 'http://192.168.43.106:3000/8.jpg',
      },
      {
        c: '肉',
        pic: 'http://192.168.43.106:3000/9.jpg',
      },
      {
        c: '大虾',
        pic: 'http://192.168.43.106:3000/10.jpg',
      },
    ]);
  } else if (lm == '厨房用品') {
    res.json([
      {
        c: '茶具',
        pic: 'http://192.168.43.106:3000/11.jpg',
      },
      {
        c: '锅',
        pic: 'http://192.168.43.106:3000/12.jpg',
      },
      {
        c: '刀',
        pic: 'http://192.168.43.106:3000/13.jpg',
      },
      {
        c: '保鲜盒',
        pic: 'http://192.168.43.106:3000/14.jpg',
      },
      {
        c: '饭盒',
        pic: 'http://192.168.43.106:3000/15.jpg',
      },
      {
        c: '刀组',
        pic: 'http://192.168.43.106:3000/16.jpg',
      },
      {
        c: '健康锅',
        pic: 'http://192.168.43.106:3000/17.jpg',
      },
      {
        c: '烧水壶',
        pic: 'http://192.168.43.106:3000/18.jpg',
      },
      {
        c: '茶几',
        pic: 'http://192.168.43.106:3000/19.jpg',
      },
      {
        c: '锅盆',
        pic: 'http://192.168.43.106:3000/20.jpg',
      },
    ]);
  }
});
app.listen(3000);
