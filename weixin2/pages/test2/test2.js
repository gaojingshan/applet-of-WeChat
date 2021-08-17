// pages/test2/test2.js
Page({
  data: {
    a: 10
  },
  gotocate() {
    wx.switchTab({
      url: '/pages/category/category',
    })
  },
  gotoA() {
    this.setData({
      a: this.data.a + 1
    })
  },
  // 返回上一层
  goback(){
    wx.navigateBack({
      delta: 1,
    })
  }
})