const app = getApp();
Page({
  data: {
    m: app.globalData.m,
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    navigationBarHeight: app.globalData.navigationBarHeight,
    xbararr: ['首页', '生鲜', '厨房用品', '食品饮料', '电脑办公', '图书', '手机', '腕表珠宝', '箱包皮具', '男鞋', '男装', '母婴', '医疗健康', '运动'],
    nowcur: '首页',
    scrollintoview: 'i0',
    // 生鲜、厨房用品等里面的小图标。接口拉取的数据 
    tjarr1: [],
    tjarr2: [],
    isShowLoading: true,
    // 瀑布流接口数据
    left_arr: [],
    right_arr: [],
    page: 1,
    // 首页接口数组
    indexArr: [],
    // 倒计时的时分秒
    diff_h: '00',
    diff_m: '00',
    diff_s: '00',
  },
  onReady() {
    this.loadData();
  },
  gotososo() {
    wx.navigateTo({
      url: '/pages/soso/soso',
    })
  },
  changeGlobal() {
    app.globalData.m++;
    this.setData({
      m: app.globalData.m
    })
  },
  loadData() {
    // 发出Ajax请求，请求小栏目接口
    wx.request({
      url: 'http://127.0.0.1:3000/xlm?lm=' + this.data.nowcur,
      success: (data) => {
        this.setData({
          tjarr1: data.data.slice(0, 5),
          tjarr2: data.data.slice(5, 10),
          isShowLoading: false
        })
      }
    });
    wx.showLoading({
      title: '正在加载',
    })
    // 发出请求，请求瀑布流接口
    wx.request({
      url: 'http://127.0.0.1:3000/pbl?lm=' + this.data.nowcur + '&page=' + this.data.page,
      success: (data) => {
        for (let i = 0; i < data.data.length; i++) {
          if (i % 2 == 0) {
            // 这里临时push一下，但是不引发视图更新，后面一起setData
            this.data.left_arr.push(data.data[i])
          } else {
            this.data.right_arr.push(data.data[i])
          }
        }
        // 引发视图更新
        this.setData({
          left_arr: this.data.left_arr,
          right_arr: this.data.right_arr
        })
        wx.hideLoading();
      }
    })
    if (this.data.nowcur == '首页') {
      // 首页 
      // 请求首页接口
      wx.request({
        url: 'http://127.0.0.1:3000/indexapi',
        success: (data) => {
          console.log(data.data);
          this.setData({
            indexArr: data.data
          })
          // 开定时器，制作倒计时
          setInterval(() => {
            // 如果是上午，就计算到12：00的倒计时
            // 如果是下午，就计算到0：00的倒计时
            // 时间戳12：00和0：00都是43200000（60*60*1000*24/2）的倍数
            // Date.parse(new Date()) 当前时间的时间戳
            // Math.ceil(Date.parse(new Date()) / 43200000) 下一个12点的时间
            // new Date((Math.ceil(Date.parse(new Date()) / 43200000))*43200000-8*60*60*1000)  下一个12点的时间

            // Math.ceil(Date.parse(new Date()) / 86400000) 下一个零点的时间
            // new Date((Math.ceil(Date.parse(new Date()) / 86400000))*86400000-8*60*60*1000)  下一个零点的时间

            // 目标时间点的时间戳(终点)
            var targetTimeStamp = Math.ceil(Date.parse(new Date()) / 86400000) * 86400000 - 8 * 60 * 60 * 1000;

            // 现在的时间戳
            var nowTimeStamp = Date.parse(new Date());

            // 差
            var diff = targetTimeStamp - nowTimeStamp;
            // console.log(diff);

            // 合多少小时，零头是多少分钟，零头是多少秒
            var diff_h = parseInt(diff / (60 * 60 * 1000));
            var diff_m = parseInt(diff % (60 * 60 * 1000) / (60 * 1000));
            var diff_s = diff % (60 * 1000) / 1000;
            // console.log(diff_h, diff_m, diff_s);
            this.setData({
              diff_h: diff_h.toString().padStart(2, '0'),
              diff_m: diff_m.toString().padStart(2, '0'),
              diff_s: diff_s.toString().padStart(2, '0'),
            })



          }, 1000)
        }
      })
    }
  },
  // 切换小栏目
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
      this.loadData()
    });

  },
  // 瀑布流
  lowerHandler() {
    // 这里直接更改page，不需要setData
    // 因为这个page不会直接引发视图更新
    this.data.page++;
    this.loadData();
  }
})