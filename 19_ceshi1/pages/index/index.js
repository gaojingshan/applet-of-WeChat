// pages/index/index.js
const app = getApp();
Page({
  data: {
    xbararr: ['首页', '生鲜', '厨房用品', '食品饮料', '电脑办公', '图书', '手机', '腕表珠宝', '箱包皮具', '男鞋', '男装', '母婴', '医疗健康', '运动'],
    nowcur: '生鲜',
    scrollintoview: 'i0',
    windowHeight: app.globalData.windowHeight,
    tjarr1: [],
    tjarr2: [],
    isShowLoading: true
  },
  onReady() {
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
  },
  // 跳转到搜索页面
  gotososo() {
    wx.navigateTo({
      url: '/pages/soso/soso',
    })
  },
  // 点击选项块
  xxktap(e) {
    const title = e.target.dataset.title;
    const index = e.target.dataset.index;
    this.setData({
      nowcur: title,
      scrollintoview: 'i' + (index - 1),
      isShowLoading: true
    });
    // 判断，如果不是首页，那么
    if (title != '首页') {
      // 发出Ajax请求
      wx.request({
        url: 'http://192.168.43.106:3000/xlm?lm=' + title,
        success: (data) => {
          console.log(data.data);

          this.setData({
            tjarr1: data.data.slice(0, 5),
            tjarr2: data.data.slice(5, 10),
            isShowLoading: false
          })
        }
      })
    }

  }

})