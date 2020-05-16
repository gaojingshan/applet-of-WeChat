// components/drawer-inner/drawer-inner.js
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
        },
        color: {
            type: Array,
            value: []
        },
        fuel: {
            type: Array,
            value: []
        },
        exhaust: {
            type: Array,
            value: []
        },
        engine: {
            type: Array,
            value: []
        },
        series: {
            type: Array,
            value: []
        },
        date1: {
            type: String,
            value: ''
        },
        date2: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        // 当前是什么界面,main表示主界面，allbrand表示全部品牌,showall查看全部选项
        nowshow: 'main',
        // 当前选择的品牌
        brand: '',
        allbs: {},
        brand_arr: ['宝马', '奔驰', '奥迪', '本田', '丰田', '标致', '日产', '五菱'],
        date1: '',
        date2: '',
        now: {
            // 当前选择的系列，由于可以多选，所以数组存放
            series: [],
            // 当前选择的颜色，由于可以多选，所以数组存放
            color: [],
            // 当前选择的燃料，由于可以多选，所以数组存放
            fuel: [],
            // 当前选择的尾气，由于可以多选，所以数组存放
            exhaust: [],
            // 当前选择的排量，由于可以多选，所以数组存放
            engine: []
        },
        // 父亲传入的筛选器
        filters: [],
        // 当前正在点谁的全部
        nowc: '',
        nowe: '',
        nowoptions: []
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
        // 收到了全部汽车品牌子组件的ok
        allbrand_okHan(e) {
            this.setData({
                nowshow: 'main',
                brand: e.detail.pinpai
            })
        },
        // 点击确定按钮筛选出品牌
        okHan() {
            // if (this.data.date1_timestamp != 0 && this.data.date2_timestamp != 0) {
            //     var date1_timestamp = Date.parse(new Date(this.data.date1))
            //     var date2_timestamp = Date.parse(new Date(this.data.date2))
            // } else {
            //     var date1_timestamp = 0;
            //     var date2_timestamp = 0;
            // }


            this.triggerEvent('ok', {
                brand: this.data.brand,
                color: this.data.now.color,
                fuel: this.data.now.fuel,
                exhaust: this.data.now.exhaust,
                engine: this.data.now.engine,
                series: this.data.now.series,
                // date1_timestamp: date1_timestamp,
                // date2_timestamp: date2_timestamp,
                date1: this.data.date1,
                date2: this.data.date2
            })
        },
        pphan(e) {
            if (this.data.brand == e.target.dataset.pinpai) {
                this.setData({
                    brand: '',
                    now: {
                        ...this.data.now,
                        series: []
                    }
                })
            } else {
                this.setData({
                    brand: e.target.dataset.pinpai,
                    now: {
                        ...this.data.now,
                        series: []
                    }
                })
            }

        },

        closeBtnHan() {
            // 自己不能把自己关闭了，必须找父亲
            this.triggerEvent('close')
        },
        // 重置按钮
        resetBtnHan() {
            // 小程序是MVVM模式的，数据变化了，视图就变化了
            this.setData({
                brand: '',
                now: {
                    ...this.data.now,
                    color: [],
                    fuel: [],
                    exhaust: [],
                    engine: [],
                    series: []
                },
                date1: '',
                date2: ''
            })
        },
        // 除了品牌之外的点击，双色球的逻辑
        ppphan(e) {
            var k = e.target.dataset.k;
            var v = e.target.dataset.v;

            //双色球逻辑，如果在就删除，如果不在就加入
            if (this.data.now[k].includes(v)) {
                // 删除用filter
                this.setData({
                    now: {
                        ...this.data.now,
                        [k]: this.data.now[k].filter(item => item != v)
                    }
                })
            } else {
                // 加入
                this.setData({
                    now: {
                        ...this.data.now,
                        [k]: [...this.data.now[k], v]
                    }
                })
            }
        },
        // 查看全部选项
        showalloption(_e) {
            this.setData({
                nowe: _e.target.dataset.e,
                nowc: _e.target.dataset.c,
                nowoptions: _e.target.dataset.options,
                nowshow: 'showall'
            })
        },
        okHan2(e) {
            this.setData({
                now: {
                    ...this.data.now,
                    [e.detail.e]: e.detail.current
                },
                nowshow: 'main'
            })
        },
        // 全部品牌的取消按钮的事件处理程序
        all_brand_cancelHan() {
            this.setData({
                nowshow: 'main'
            })
        },
        // 查看全部的取消按钮的事件处理程序
        show_all_cancelHan() {
            this.setData({
                nowshow: 'main'
            })
        },
        // 选择时间
        bindDateChange1(e) {
            this.setData({
                date1: e.detail.value
            })
        },
        bindDateChange2(e) {
            this.setData({
                date2: e.detail.value
            })
        },
        reset_times() {
            this.setData({
                date1: '',
                date2: ''
            })
        }
    },
    // 组件的生命周期
    lifetimes: {
        // 当组件加载好之后
        attached: function () {
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            });
            // 把properties设置为data
            this.setData({
                    brand: this.properties.brand,
                    filters: this.properties.filters,
                    now: {
                        ...this.data.now,
                        color: this.properties.color,
                        fuel: this.properties.fuel,
                        exhaust: this.properties.exhaust,
                        engine: this.properties.engine,
                        series: this.properties.series,
                    },
                    date1: this.properties.date1,
                    date2: this.properties.date2,
                }),

                // 品牌 系列形式转换
                wx.request({
                    url: 'http://www.aiqianduan.com:56506/allbs',
                    success: (data) => {
                        console.log(data.data);
                        var o = {};
                        for (let zimu in data.data) {
                            for (let pinpai in data.data[zimu]) {
                                o[pinpai] = data.data[zimu][pinpai]
                            }
                        }
                        console.log(o);
                        this.setData({
                            allbs: o
                        })

                    }
                })
        }
    },
})