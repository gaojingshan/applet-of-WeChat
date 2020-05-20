// pages/index/index.js
const app = getApp();
Page({
  data: {
    xbararr: ['首页', '生鲜', '厨房用品', '食品饮料', '电脑办公', '图书', '手机', '腕表珠宝', '箱包皮具', '男鞋', '男装', '母婴', '医疗健康', '运动'],
    nowcur: '生鲜',
    scrollintoview: 'i0',
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    // 小栏目，生鲜、厨房用品等的小栏目
    tjarr1: [],
    tjarr2: [],
    isShowLoading: true,
    // 瀑布流左边和右边
    left_arr: [],
    right_arr: []
  },
  onReady() {
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

      // 发出请求，请求瀑布流接口
      wx.request({
        url: 'http://192.168.43.106:3000/pbl?lm=' + this.data.nowcur,
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
          console.log(this.data.left_arr, this.data.right_arr);
          // 引发视图更新
          this.setData({
            left_arr: this.data.left_arr,
            right_arr: this.data.right_arr
          })

        }
      })
    }


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


  }

})