var page = 1;
var brand = '';
Page({
    data: {
        windowHeight: 0,
        results: [],
        // 是否显示弹出层
        isShow: false,
    },
    onReady() {
        wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            }),
            // Ajax
            wx.request({
                url: 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + brand,
                success: (data) => {
                    this.setData({
                        results: data.data.results
                    })
                    console.log(data.data.results);
                }
            })
    },
    // 滚动到底部时触发
    scrolltolower() {
        // 页面加1
        page++;
        // 显示正在加载
        wx.showLoading({
            title: '正在加载'
        })
        // Ajax
        wx.request({
            url: 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + brand,
            success: (data) => {
                this.setData({
                    results: [...this.data.results, ...data.data.results]
                })
                wx.hideLoading()
                // console.log(data.data.results);
            }
        })
    },
    // 点击筛选按钮
    showPopup() {
        this.setData({
            isShow: true
        });
    },

    onClose() {
        this.setData({
            isShow: false
        });
    },
    // 实现筛选
    handle_sx(e) {
        brand = e.detail.brand;
        this.setData({
            isShow: false
        })
        page = 1;
        // Ajax
        wx.request({
            url: 'http://www.aiqianduan.com:7897/cars?page=' + page + '&brand=' + brand,
            success: (data) => {
                this.setData({
                    results: data.data.results
                })
                wx.hideLoading()
                // console.log(data.data.results);
            }
        })
    }


})