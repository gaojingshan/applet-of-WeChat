// components/show-all/show-all.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filters: {
            type: Object,
            value: {}
        },
        nowc: {
            type: String,
            value: ''
        },
        nowe: {
            type: String,
            value: ''
        },
        nowoptions: {
            type: Array,
            value: []
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        current: [],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleFruitChange({
            detail = {}
        }) {
            const index = this.data.current.indexOf(detail.value);
            index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
            this.setData({
                current: this.data.current
            });
        },
    },
    // 组件的生命周期
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            // 获取窗口高度
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            });
        }
    },
})