// 当前页面，这个页码不会直接引发视图更新
var page = 1;
Page({
    data: {
        windowHeight: 0,
        // 存放结果的
        results: [],
        isShowDrawer: true,
        brand: '',
        color: '',
        fuel: '',
        exhaust: '',
        engine: '',
        // 筛选条件
        filters: [{
                'c': '颜色',
                'e': 'color',
                'options': ['红', '黄', '蓝', '绿', '黑', '白', '银灰', '咖啡', '香槟', '橙', '灰']
            },
            {
                'c': '燃料',
                'e': 'fuel',
                'options': ['汽油', '柴油', '油电混合', '纯电动']
            },
            {
                'c': '尾气标准',
                'e': 'exhaust',
                'options': ['国一', '国二', '国三', '国四', '国五']
            },
            {
                'c': '发动机排量',
                'e': 'engine',
                'options': ['1.0L', '1.2L', '1.4L', '1.4T', '1.6L', '1.6T', '1.8L', '1.8T', '2.0L', '2.0T', '2.2L', '2.2T', '3.0L', '3.0T', '4.0L', '4.0T', '5.0L', '5.0T']
            }
        ]
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
                url: 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + this.data.brand + '&color=' + this.data.color.join('v') + '&fuel=' + this.data.fuel.join('v') + '&exhaust=' + this.data.exhaust.join('v') + '&engine=' + this.data.engine.join('v'),
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
                url: 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + this.data.brand + '&color=' + this.data.color.join('v') + '&fuel=' + this.data.fuel.join('v') + '&exhaust=' + this.data.exhaust.join('v') + '&engine=' + this.data.engine.join('v'),
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
            // Ajax拉取数据
            wx.request({
                url: 'http://www.aiqianduan.com:7897/cars?page=1&brand=' + e.detail.brand + '&color=' + e.detail.color.join('v') + '&fuel=' + e.detail.fuel.join('v') + '&exhaust=' + e.detail.exhaust.join('v') + '&engine=' + e.detail.engine.join('v'),
                success: (data) => {
                    this.setData({
                        results: data.data.results,
                        brand: e.detail.brand,
                        color: e.detail.color,
                        fuel: e.detail.fuel,
                        exhaust: e.detail.exhaust,
                        engine: e.detail.engine,
                    })
                    wx.hideLoading()
                }

            })


    },
    closeHan() {
        this.setData({
            isShowDrawer: false
        })
    }
})