// component/drawer-inner/drawer-inner.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        brand: {
            type: String,
            value: ''
        },
        filters: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        // main首页  all_brand全部品牌  showall除品牌以外的
        nowShow: 'main',
        brand_arr: ['宝马', '奔驰', '奥迪', '本田', '丰田', '标致', '日产', '五菱'],
        brand: '',
        // 当前选中的
        now: {
            color: [],
            fuel: [],
            exhaust: [],
            engine: []

        },
        filters: [],
        // 当前的所有
        nowc: '',
        nowe: '',
        nowoptions: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 查看全部显示全部品牌
        brand_han_click() {
            this.setData({
                nowShow: 'all_brand'
            })
        },
        // 接收到全部品牌页面传进来的值
        allbrand_Han(e) {
            console.log();
            this.setData({
                brand: e.detail.brand,
                nowShow: 'main'
            })
        },
        // 点击品牌
        click_han(e) {
            this.setData({
                brand: e.target.dataset.brand
            })
        },
        // 点击确定实现筛选
        ok_han() {
            this.triggerEvent('ok', {
                brand: this.data.brand,
                color:this.data.now.color,
                fuel:this.data.now.fuel,
                exhaust:this.data.now.exhaust,
                engine:this.data.now.engine,

            })
        },
        // 除品牌之外的点击确定接收
        ok_han2(e) {
            this.setData({
                now: {
                    ...this.data.now,
                    [e.detail.e]: e.detail.current
                },
                nowShow: 'main'
            })
        },
        // 点击关闭按钮
        delete_han() {
            this.triggerEvent('delete')
        },
        reset_han() {
            this.setData({
                brand: ''
            })
        },
        // 点击除品牌以外的
        click_han2(e) {
            var k = e.target.dataset.k;
            var v = e.target.dataset.v;
            if (this.data.now[k].includes(v)) {
                // 删除
                this.setData({
                    now: {
                        ...this.data.now,
                        [k]: this.data.now[k].filter(item => item != v)
                    }
                })
            } else {
                // 添加
                this.setData({
                    now: {
                        ...this.data.now,
                        [k]: [...this.data.now[k], v]
                    }
                })
            }
        },
        // 除品牌以外的查看全部
        show_all_options(_e) {
            var e = _e.target.dataset.e;
            var c = _e.target.dataset.c;
            var options = _e.target.dataset.options;
            this.setData({
                nowe: e,
                nowc: c,
                nowoptions: options,
                nowShow: 'showall'
            })
        }
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
                }),
                this.setData({
                    brand: this.properties.brand,
                    filters: this.properties.filters
                })
        }
    },
})