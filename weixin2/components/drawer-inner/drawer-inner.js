// components/drawer_inner/drawer_inner.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        now: {
            type: Object,
            value: {}
        },
        // 筛选条件
        filters: {
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
        brandArr: ['宝马', '奔驰', '奥迪', '本田', '丰田', '标志', '日产', '五菱'],
        // 当前是什么界面,main 表示主界面， allbrand 表示全部品牌， showall 表示查看全部选项
        nowshow: 'main',
        now: {
            // 当前选择的品牌
            brand: '',
            // 当前选择的车系，由于可以多选，所以数组存放
            series: [],
            // 当前选择的颜色，由于可以多选，所以数组存放
            color: [],
            // 当前选择的燃料，由于可以多选，所以数组存放
            fuel: [],
            // 当前选择的尾气标准，由于可以多选，所以数组存放
            exhaust: [],
            // 当前选择的发动机排量，由于可以多选，所以数组存放
            engine: [],
        },
        // 父亲传入的筛选器
        filters: [],
        // 当前正在点谁的“全部”
        nowc: '颜色',
        nowe: 'color',
        nowoptions: ['红', '黄', '蓝', '绿', '哈哈', '嘻嘻'],
        // 形式转换后的车系
        allbs: {},
        // 时间
        date1: '',
        date2: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 展示全部品牌
        showallbrand() {
            this.setData({
                nowshow: 'allbrand'
            })
        },
        // 查看全部选项
        showalloption(_e) {
            var c = _e.target.dataset.c;
            var e = _e.target.dataset.e;
            var options = _e.target.dataset.options;
            this.setData({
                nowc: c,
                nowe: e,
                nowoptions: options,
                nowshow: 'showall'
            })
        },
        all_brand_okHan(e) {
            // 收到了全部汽车品牌子组件的ok
            this.setData({
                nowshow: 'main',
                now: {
                    ...this.data.now,
                    brand: e.detail.pinpai
                }
            })
        },
        show_all_okHan(e) {
            // 收到的其他选项的ok
            var nowe = e.detail.nowe;
            var current = e.detail.current;
            this.setData({
                now: {
                    ...this.data.now,
                    [nowe]: current
                },
                nowshow: 'main'
            })
        },
        // 查看全部的取消按钮的事件处理程序
        show_all_closeHan() {
            this.setData({
                nowshow: 'main'
            })
        },
        // 全部品牌的取消按钮的事件处理程序
        all_brand_closeHan() {
            this.setData({
                nowshow: 'main'
            })
        },
        // 关闭按钮做的事情
        closeBtnHan() {
            // 自己不能把自己关闭了，必须找父亲
            this.triggerEvent('close')
        },
        // 重置按钮做的事情
        resetBtnHan() {
            // 小程序是MVVM模式的，数据变化了，数据就变化了
            this.setData({
                now: {
                    ...this.data.now,
                    brand: '',
                    color: [],
                    fuel: [],
                    exhaust: [],
                    engine: [],
                },
                date1: '',
                date2: '',
            })
        },
        // 确定按钮做的事情
        okHan() {
            this.triggerEvent('ok', {
                brand: this.data.now.brand,
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
            if (this.data.now.brand == e.target.dataset.pinpai) {
                this.setData({
                    now: {
                        ...this.data.now,
                        brand: '',
                        // 车系也要同时清空
                        series: []
                    }
                })
            } else {
                this.setData({
                    now: {
                        ...this.data.now,
                        brand: e.target.dataset.pinpai,
                        // 车系也要同时清空
                        series: []
                    }
                })
            }

        },
        // 除了品牌之外的点击，双色球的逻辑
        ppphan(e) {
            var k = e.target.dataset.k;
            var v = e.target.dataset.v;

            // 双色球逻辑，如果在就删除，如果不在就加入
            if (this.data.now[k].includes(v)) {
                // 删除怎么删？用filter
                this.setData({
                    now: {
                        ...this.data.now,
                        [k]: this.data.now[k].filter(item => item != v)
                    }
                })
            } else {
                // 加入
                this.setData({
                    // 点点点表示不改变now的其他选项
                    now: {
                        ...this.data.now,
                        // 只改变"k"这个选项
                        [k]: [...this.data.now[k], v]
                    }
                })
            }

        },
        // 日期
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
        // 清空购买日期
        clear_gmrq_Han() {
            this.setData({
                date1: '',
                date2: '',
            })
        }
    },
    // 组件的生命周期
    lifetimes: {
        // 当组件加载好之后
        attached() {
            // 在组件实例进入页面节点树时执行
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                },
            });
            // 请求所有品牌
            // Ajax 拉取所有品牌数据
            wx.request({
                url: 'http://www.aiqianduan.com:56506/allbs',
                success: (data) => {
                    // console.log(data.data);
                    // 形式转换
                    // 去掉所有的大写字母,用品牌当作键名,组合成为新的对象
                    var o = {};
                    for (let zimu in data.data) {
                        for (let pp in data.data[zimu]) {
                            o[pp] = data.data[zimu][pp]
                        }
                    }
                    // console.log(o);
                    this.setData({
                        allbs: o
                    })
                }
            });
            // 设置date2 为当前时间
            // this.setData({
            //     date2: new Date()
            // })
        }
    },
})