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
        // 当前是什么界面，main表示主界面，allbrand就表示全部品牌
        nowshow: 'main',
        // 当前选择的品牌
        brand: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showallbrand() {
            this.setData({
                nowshow: 'allbrand'
            })
        },
        all_brand_okHan(e) {
            // 收到了全部汽车品牌子组件的ok
            console.log('儿子来信了');
            console.log(e.detail.pinpai);
            this.setData({
                nowshow: 'main',
                brand: e.detail.pinpai
            })
        },
        // 确定按钮的事情
        okHan() {
            this.triggerEvent('ok', {
                'brand': this.data.brand
            });
        },
        pphan(e) {
            this.setData({
                'brand': e.target.dataset.brand
            })
        }
    },
    // 组件的生命周期
    lifetimes: {
        attached() {
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            })
        }
    }
})