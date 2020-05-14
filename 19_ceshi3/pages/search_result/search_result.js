Page({
    data: {
        windowHeight: 0,
        results: [],
        // 抽屉是否打开
        showDrawer: false,
        page: 1,
        brand: '',
        color: ['红','黑'],
        fuel: [],
        exhaust: [],
        engine: [],
        // 筛选器
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
                'c': '尾气',
                'e': 'exhaust',
                'options': ['国一', '国二', '国三', '国四', '国五']
            },
            {
                'c': '排量',
                'e': 'engine',
                'options': ['1.0L', '1.2L', '1.4L', '1.4T', '1.6L', '1.6T', '1.8L', '1.8T', '2.0L', '2.0T', '2.2L', '2.2T', '3.0L', '3.0T', '4.0L', '4.0T', '5.0L', '5.0T']
            }

        ]
    },
    onShow() {
        // 获得窗口高度
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowHeight: res.windowHeight
                })
            }
        })
        this.setData({
            page: 1
        })
        this.loadData()
    },
    // 封装获取Ajax的方法
    loadData() {
        wx.showLoading({
            title: '加载中',
        })
        // 获取Ajax请求
        wx.request({
            url: 'http://www.aiqianduan.com:56506/cars?' +
                'page=' + this.data.page +
                '&brand=' + this.data.brand +
                '&color=' + this.data.color.join('v') +
                '&fuel=' + this.data.fuel.join('v') +
                '&exhaust=' + this.data.exhaust.join('v') +
                '&engine=' + this.data.engine.join('v'),
            success: (data) => {
                this.setData({
                    results: [...this.data.results, ...data.data.results]
                })
                wx.hideLoading()
                console.log(data.data.results);
            }
        })
    },
    // 页面到底部时触发
    scrolltolower() {
        this.setData({
            page: this.data.page + 1
        }, function () {
            this.loadData()
        })
    },
    // 打开筛选按钮
    openClick() {
        this.setData({
            showDrawer: true
        })
    },
    // 关闭筛选按钮
    closeClick() {
        this.setData({
            showDrawer: false
        })
    },
    // 接收drawer_inner的信息
    drawer_inner_han(e) {
        this.setData({
            // 清空results数组
            results: [],
            brand: e.detail.brand,
            showDrawer: false,
            color: e.detail.color,
            fuel: e.detail.fuel,
            exhaust: e.detail.exhaust,
            engine: e.detail.engine,
            page: 1
        }, function () {
            this.loadData()
        })
    },
    close_han() {
        this.setData({
            showDrawer: false,
        })
    }
})