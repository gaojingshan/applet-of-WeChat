//app.js
App({
  globalData: {
    windowHeight: 0
  },
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.windowHeight = res.windowHeight;
      }
    })
  }
})