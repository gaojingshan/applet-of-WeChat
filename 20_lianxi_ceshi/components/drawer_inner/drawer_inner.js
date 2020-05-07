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
        windowHeight: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    // 组件的生命周期
    lifetimes: {
        attached() {
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight:res.windowHeight
                    })

                }
            })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    }
})