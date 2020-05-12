// components/drawer-inner/drawer-inner.js
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
        windowHeight: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    // 组件的生命周期
    lifetimes: {
        attached: function () {
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            })
        }
    },
})