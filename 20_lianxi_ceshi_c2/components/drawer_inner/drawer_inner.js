// components/drawer_inner/drawer_inner.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        // 现在展示的页面，main  all_brand
        nowPage: 'main',
        // 当前的品牌
        brand: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handle_ok(e) {
            this.setData({
                brand: e.detail.pinpai,
                nowPage: 'main'
            })
            console.log();

        },
        // 点击确定展示全部品牌
        all_show() {
            this.setData({
                nowPage: 'all_brand'
            })
        },
        click_pinpai(e) {
            this.setData({
                brand: e.target.dataset.brand
            })
        },
        // 点击确认实现真正的筛选
        handle_ok2(e) {
            this.triggerEvent('ok', {
                brand: e.target.dataset.brand2
            })
        }
    },
    // 生命周期
    lifetimes: {
        attached: function () {
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            })
        },
    }
})