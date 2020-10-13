Page({
  data: {
    windowHeight: 0
  },
  onReady() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })

      }
    })
  }
})