//index.js
Page({
    data: {
        windowHeight: 0,
        products: {},
        products_keys: [],
        // 当前在哪个栏目,就是左边栏哪个栏目加cur
        nowtype: '健康坚果',
        // 跳转到哪个id去
        nowid: 0
    },
    // 页面加载完毕
    onReady() {
        // 读取微信的API，可以调用系统信息，从而得到屏幕高度
        wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            }),
            // Ajax
            wx.request({
                url: 'http://www.aiqianduan.com:8922/product',
                success: (data) => {
                    console.log(data.data.products);
                    this.setData({
                        products: data.data.products,
                        // 提取对象的键名
                        products_keys: Object.keys(data.data.products)
                    })
                }
            })
    },
    // 左边栏的点击事件
    lmHandle(e) {
        const index = e.target.dataset.index;
        const name = e.target.dataset.name;
        this.setData({
            nowid: index,
            nowtype: name
        })
    }
})