// 当前页面，这个页码不会直接引发视图更新
var page = 1;
Page({
    data: {
        windowHeight: 0,
        // 存放结果的
        results: [],
        isShowDrawer: true
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
            }),

            // Ajax拉取数据
            wx.request({
                url: 'http://www.aiqianduan.com:7897/cars?page=' + page,
                success: (data) => {
                    this.setData({
                        results: data.data.results
                    })
                }
            })
    },
    // 滚动到底部了
    lowerHandler() {
        console.log('到底了');
        // 加页码
        page++;
        wx.showLoading({
                title: '加载中'
            }),
            // Ajax拉取数据
            wx.request({
                url: 'http://www.aiqianduan.com:7897/cars?page=' + page,
                success: (data) => {
                    this.setData({
                        results: [...this.data.results, ...data.data.results]
                    })
                    wx.hideLoading()
                }

            })

    },
    // 点击筛选按钮，打开抽屉
    ShowDrawer() {
        this.setData({
            isShowDrawer: true
        })
    },
    // 点击黑色遮罩，关闭抽屉
    onClose() {
        this.setData({
            isShowDrawer: false
        })
    }
})