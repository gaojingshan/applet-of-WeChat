// 当前页面，这个页码不会直接引发视图更新
var page = 1;
var brand = '';
Page({
    data: {
        windowHeight: 0,
        // 存放结果的
        results: [],
        isShowDrawer: false
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
            page = 1,
            wx.request({
                url: 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + brand,
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
                url: 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + brand,
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
    },
    draw_inner_han(e) {
        console.log('我是页面,抽屉给我发消息了');
        // console.log(e.detail.brand);
        this.setData({
            isShowDrawer: false,
            brand: e.detail.brand
        })
        // 拉取这个品牌
        wx.showLoading({
                title: '加载中'
            }),
            brand = e.detail.brand,
            // Ajax拉取数据
            wx.request({
                url: 'http://www.aiqianduan.com:7897/cars?page=1&brand=' + brand,
                success: (data) => {
                    this.setData({
                        results: data.data.results
                    })
                    wx.hideLoading()
                }

            })


    }
})