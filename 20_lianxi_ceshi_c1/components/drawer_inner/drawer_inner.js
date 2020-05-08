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
        // main  all_brand
        showPage: 'all_brand',
        brand: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击查看全部更改页面
        allPinpai() {
            this.setData({
                showPage: 'all_brand'
            })
        },
        all_brand_okHan(e) {

            this.setData({
                showPage: 'main',
                brand: e.detail.pinpai
            })
        },
        // 点确定按钮
        ok_han_yes() {
            this.triggerEvent('ok', {
                'brand': this.data.brand
            })
        }

    },
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
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
})