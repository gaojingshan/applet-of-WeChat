//app.js
App({
    // 当小程序运行时
    onLaunch() {
        // 得到系统信息，要得到窗口的高度
        wx.getSystemInfo({
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete: (res) => {
                console.log('窗口高度' + res.windowHeight);
                // 设置全局数据， globalData它的变化引发不了视图更新的
                this.globalData.windowHeight = res.windowHeight;
            },
        })
    },
    // 全局数据
    globalData: {
        windowHeight: 0
    }
})