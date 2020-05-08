// 全局的分页
var page = 1;

Page({
    data: {
        windowHeight: 0,
        results: [],
        show: true
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
                'url': 'http://www.aiqianduan.com:7897/cars?page=' + page,
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
            'url': 'http://www.aiqianduan.com:7897/cars?page=' + page,
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
    }
})