//index.js
Page({
    data: {
        windowHeight: 0
    },
    // 页面加载完毕
    onReady() {
        // 读取微信的API，可以调用系统信息，从而得到屏幕高度
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowHeight: res.windowHeight
                })

            }
        })
    }
})