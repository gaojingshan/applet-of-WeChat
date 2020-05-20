//app.js
App({
    globalData: {
        windowWidth: 0,
        windowHeight: 0,
        screenHeight: 0,
        statusBarHeight: 0
    },
    // 页面加载的时候
    onLaunch() {
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.windowWidth=res.windowWidth;
                this.globalData.windowHeight=res.windowHeight;
                this.globalData.screenHeight=res.screenHeight;
                this.globalData.statusBarHeight=res.statusBarHeight;

            }
        })
    }
})