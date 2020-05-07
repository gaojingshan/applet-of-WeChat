// pages/search_result/search_result.js
Page({
    data: {
        windowHeight: 0
    },
    onReady() {
        // 读取微信的API，可以调用系统信息，从而得到屏幕高度
        wx.getSystemInfo({
            success: (res) => {
                // 设置为自己的data
                this.setData({
                    windowHeight: res.windowHeight
                })
            }
        })
    }
})