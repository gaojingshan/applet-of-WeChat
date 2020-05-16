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
        // 形式转换后的品牌名和车系的对象
        allbs: {},
        brand_arr: ['宝马', '奔驰', '奥迪', '本田', '丰田', '标致', '日产', '五菱'],
        now: {
            // 当前选择的车系，由于可以多选，所以数组存放
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
        nowoptions: [],
        // 时间
        date1: '',
        date2: '',
        // 今天的日期
        nowdate: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 显示所有品牌
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
            this.triggerEvent('ok', {
                brand: this.data.brand,
                color: this.data.now.color,
                fuel: this.data.now.fuel,
                exhaust: this.data.now.exhaust,
                engine: this.data.now.engine,
                series: this.data.now.series,
                date1: this.data.date1,
                date2: this.data.date2,
            })
        },
        // 点击品牌做的事情
        pphan(e) {
            // 判断，如果当前用户点击的，和当前一样，那么就去掉
            // 否则设置
            if (this.data.brand == e.target.dataset.pinpai) {
                this.setData({
                    brand: '',
                    // 车系也要同时清空
                    now: {
                        ...this.data.now,
                        series: []
                    }
                })
            } else {
                this.setData({
                    brand: e.target.dataset.pinpai,
                    // 车系也要同时清空
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
        // 查看全部选项 和 品牌系列的查看全部
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
        // 时间
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
        // 时间重置按钮
        resetbtn_times() {
            this.setData({
                date1: '',
                date2: ''
            })
        },

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
                        series: this.properties.series
                    },
                    date1: this.properties.date1,
                    date2: this.properties.date2
                }),
                // 请求所有品牌
                // Ajax 拉取所有品牌数据
                wx.request({
                    url: 'http://www.aiqianduan.com:56506/allbs',
                    success: (data) => {
                        console.log(data.data);
                        // 形式转换
                        // 去掉所有的大写字母，用品牌当作键名，组合成为新的对象
                        var o = {};
                        for (let zimu in data.data) {
                            for (let pinpai in data.data[zimu]) {
                                o[pinpai] = data.data[zimu][pinpai]
                            }
                        }
                        this.setData({
                            allbs: o
                        })

                    }
                });
            // 设置data2
            var y = new Date().getFullYear();
            var m = String(new Date().getMonth() + 1).padStart(2, '0');
            var d = String(new Date().getDate()).padStart(2, '0');
            if (this.data.date2 == '') {
                this.setData({
                    date2: y + '-' + m + '-' + d
                })
            } else {
                this.setData({
                    date2: this.properties.date2
                })
            }
            this.setData({
                nowdate: y + '-' + m + '-' + d
            })
        },

    },
})