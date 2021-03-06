// pages/index/index.js
const app = getApp();
Page({
  data: {
    xbararr: ['首页', '生鲜', '厨房用品', '食品饮料', '电脑办公', '图书', '手机', '腕表珠宝', '箱包皮具', '男鞋', '男装', '母婴', '医疗健康', '运动'],
    nowcur: '首页',
    scrollintoview: 'i0',
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    // 生鲜、厨房用品什么的里面的小图标第1行
    tjarr1: [],
    // 生鲜、厨房用品什么的里面的小图标第2行
    tjarr2: [],
    isShowLoading: true,
    // 瀑布流左边列
    left_arr: [],
    // 瀑布流右边列
    right_arr: [],
    page: 1,
    // 首页
    indexArr: [],
    // 时间
    diff_h: '00',
    diff_m: '00',
    diff_s: '00',
  },
  // 页面一加载
  onReady() {
    // 拉取接口
    this.loadData()
  },
  // 跳转到搜索页面
  gotososo() {
    wx.navigateTo({
      url: '/pages/soso/soso',
    })
  },
  loadData() {
    // 判断，如果不是首页
    if (this.data.nowcur != '首页') {
      // 发出Ajax请求，请求小栏目接口
      wx.request({
        url: 'http://192.168.43.106:3000/xlm?lm=' + this.data.nowcur,
        success: (data) => {
          this.setData({
            tjarr1: data.data.slice(0, 5),
            tjarr2: data.data.slice(5, 10),
            isShowLoading: false
          })
        }
      })


    } else {
      // 首页
      // 请求首页接口
      wx.request({
        url: 'http://192.168.43.106:3000/indexapi',
        success: (data) => {
          // console.log(data.data);
          this.setData({
            indexArr: data.data
          })

          // 页面一加载，就运行倒计时
          this.timestamp();
          // 开定时器，制作倒计时
          setInterval(() => {
            this.timestamp();
          }, 1000)

        }
      })
    }
    // 显示正在加载
    wx.showLoading({
      title: '正在加载',
    })
    // 发出请求，请求瀑布流接口
    wx.request({
      url: 'http://192.168.43.106:3000/pbl?lm=' + this.data.nowcur + '&page=' + this.data.page,
      success: (data) => {
        // console.log(data.data);
        for (let i = 0; i < data.data.length; i++) {
          if (i % 2 == 0) {
            // 临时用一下push，但是不引发视图更新，后面一起setData
            this.data.left_arr.push(data.data[i])
          } else {
            this.data.right_arr.push(data.data[i])
          }
        }
        // console.log(this.data.left_arr, this.data.right_arr);
        // 引发视图更新
        this.setData({
          left_arr: this.data.left_arr,
          right_arr: this.data.right_arr
        })

        // 拉取数据后隐藏正在加载
        wx.hideLoading()

      }

    })

  },
  // 制作倒计时，封装函数
  timestamp() {
    // 如果是上午，就计算到12:00的倒计时
    // 如果是下午，就计算到0:00的倒计时

    // 时间戳12:00是43200000的倍数
    // 24*60*60*1000 / 2 = 43200000

    // 时间戳0:00都是86400000的倍数
    // 24*60*60*1000 = 86400000

    // 目标时间点的时间戳
    // 12:00
    var targetTimeStamp12 = Math.ceil(Date.parse(new Date()) / 43200000) * 43200000 - 8 * 60 * 60 * 1000;

    // 0:00
    var targetTimeStamp0 = Math.ceil(Date.parse(new Date()) / 86400000) * 86400000 - 8 * 60 * 60 * 1000;

    // 现在的时间戳
    var nowTimeStamp = Date.parse(new Date());

    // 判断现在是下午还是上午
    if (new Date().getHours() <= 12) {
      // 差
      var diff = targetTimeStamp12 - nowTimeStamp;
    } else {
      // 差
      var diff = targetTimeStamp0 - nowTimeStamp;
    }

    // 合多少小时
    var diff_h = parseInt(diff / (60 * 60 * 1000));
    // 零头是多少分
    var diff_m = parseInt(diff % (60 * 60 * 1000) / (60 * 1000));
    // 零头是多少秒
    var diff_s = diff % (60 * 1000) / 1000;


    // console.log(diff_h, diff_m, diff_s);
    this.setData({
      diff_h: diff_h.toString().padStart(2, '0'),
      diff_m: diff_m.toString().padStart(2, '0'),
      diff_s: diff_s.toString().padStart(2, '0')
    })
  },
  // 切换小栏目的选项块
  xxktap(e) {
    const title = e.target.dataset.title;
    const index = e.target.dataset.index;
    this.setData({
      nowcur: title,
      scrollintoview: 'i' + (index - 1),
      isShowLoading: true,
      left_arr: [],
      right_arr: []
    }, () => {
      this.loadData();
    });


  },
  // 瀑布流，当页面到底时触发
  lowerHandler() {
    // 这里直接更改page,不需要setData
    // 因为这个page不会直接引发试图更新，所以可以直接更改page
    this.data.page++;
    this.loadData();

  }

})