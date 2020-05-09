// components/all_brand/all_brand.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        nowc: {
            type: String,
            value: ''
        },
        nowoptions: {
            type: Array,
            value: []
        },
        nowe: {
            type: String,
            value: ''
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        current: []

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
        okHan() {
            this.triggerEvent('ok', {
                e: this.properties.nowe,
                current: this.data.current
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
            });

        }

    }
})