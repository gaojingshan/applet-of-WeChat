// 小程序的入口文件，App()是小程序内置函数，表示启动一个小程序
// 对象是配置参数
//app.js
App({
    globalData: {
        m: 100,
        windowHeight: 0,
        windowWidth: 0,
        statusBarHeight: 0,
        screenHeight: 0,
        navigationBarHeight: 0,
        userInfo: null
    },
    // 当小程序运行的时候
    onLaunch() {
        // 获取系统信息，得到屏幕可用高度、状态栏高度
        wx.getSystemInfo({
            success: (res) => {
                // console.log(res);
                console.log(res.windowWidth);

                this.globalData.windowHeight = res.windowHeight;
                this.globalData.windowWidth = res.windowWidth;
                this.globalData.statusBarHeight = res.statusBarHeight;
                this.globalData.screenHeight = res.screenHeight;

                this.globalData.navigationBarHeight = this.globalData.screenHeight - this.globalData.windowHeight;
                // console.log(this.globalData.screenHeight);
                // console.log(this.globalData.windowHeight);
                // console.log(this.globalData.statusBarHeight);

            }
        })

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(res);
                wx.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:3000/getMyOpenId',
                    data: {
                        code: res.code
                    },
                    success: (data) => {
                        console.log(data);
                    }
                })
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    }
})