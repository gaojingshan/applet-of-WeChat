// 全局的分页
var page = 1;
var brand = '';
Page({
    data: {
        windowHeight: 0,
        results: [],
        show: false
    },
    onReady() {
        wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            }),
            page = 1;
        // Ajax
        wx.request({
            'url': 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + brand,
            success: (data) => {
                this.setData({
                    results: data.data.results
                })
                console.log(data.data.results);
            }
        })
    },
    scrolltolower() {
        page++;
        wx.showLoading({
            title: '加载中'
        })
        // Ajax
        wx.request({
            'url': 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + brand,
            success: (data) => {
                this.setData({
                    results: [...this.data.results, ...data.data.results]
                })
                wx.hideLoading();
                console.log(data.data.results);
            }
        })
    },
    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },
    // 筛选
    shaixuan_ok(e) {
        brand = e.detail.brand;
        wx.showLoading({
            title: '加载中'
        })
        // Ajax
        wx.request({
            'url': 'http://www.aiqianduan.com:7897/cars?page=1&brand=' + brand,
            success: (data) => {
                this.setData({
                    results: data.data.results
                })
                wx.hideLoading();
            }
        })
        this.setData({
            show: false
        })
    }
})