// components/drawer-inner/drawer-inner.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        nowoptions: {
            type: Array,
            value: []
        },
        nowc: {
            type: String,
            value: ''
        },
        nowe: {
            type: String,
            value: ''
        },
        nowv: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        //  当前选中的
        current: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 多选按钮
        handleFruitChange({
            detail = {}
        }) {
            const index = this.data.current.indexOf(detail.value);
            index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
            this.setData({
                current: this.data.current
            });
        },
        // 点击确定按钮
        okHan() {
            this.triggerEvent('ok', {
                e: this.properties.nowe,
                options: this.data.current
            })

        },
        cancelHan() {
            this.triggerEvent('cancel')
        }
    },
    // 生命周期
    lifetimes: {
        attached: function () {
            // 获取高度
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            })
            this.setData({
                current: this.properties.nowv
            })

        }
    },
})