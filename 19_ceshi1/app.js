//app.js
App({
    globalData: {
        windowHeight: 0,
        statusBarHeight: 0,
        screenHeight: 0

    },
    // 当小程序初始化的时候
    onLaunch() {
        // 得到屏幕可用高度、状态栏高度
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.windowHeight = res.windowHeight;
                this.globalData.statusBarHeight = res.statusBarHeight;
                this.globalData.screenHeight = res.screenHeight;
                console.log(res);

            }
        })
    }
})