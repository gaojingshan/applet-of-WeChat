// pages/soso/soso.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputvalue: '华为P40手机',
    lishiwords: []
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 读取本地存储
    wx.getStorage({
      key: 'lishisousuo',
      success: (res) => {
        console.log(res.data);
        if (res.data != undefined && res.data != null) {
          this.setData({
            lishiwords: JSON.parse(res.data)
          })
        }
      }
    })
  },
  // 点击确定按钮
  confirmhan(e) {
    // 存本地存储
    wx.setStorage({
      key: 'lishisousuo',
      data: JSON.stringify([...this.data.lishiwords, e.detail.value]),
    })
    wx.navigateTo({
      url: '/pages/search_result/search_result',
    })
  },
  // 点击垃圾桶，清空本地存储
  clearstorage() {
    wx.clearStorage();
    this.setData({
      lishiwords: []
    })
  },
  // 返回上一层
  goback(){
    wx.navigateBack({
      delta: 1,
    })
  }
})