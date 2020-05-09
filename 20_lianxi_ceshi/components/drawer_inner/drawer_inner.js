// components/drawer_inner/drawer_inner.js
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
        // 当前是什么界面，main表示主界面，allbrand就表示全部品牌，showall表示查看全部选项
        nowshow: 'main',
        // 当前选择的品牌
        brand: '',
        now: {
            // 当前选择的颜色，由于可以多选，数组存放
            color: [],
            // 当前选择的燃料，由于可以多选，数组存放
            fuel: [],
            // 当前选择的尾气标准，由于可以多选，数组存放
            exhaust: [],
            // 当前选择的发动机排量，由于可以多选，数组存放
            engine: []
        },
        // 父亲传入的筛选器
        filters: [],
        // 当前正在点谁的全部
        nowc: '颜色',
        nowoptions: ['红', '黄', '蓝', '绿', '紫', '橙'],
        nowe: 'color'

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
                'brand': this.data.brand,
                'color': this.data.now.color,
                'fuel': this.data.now.fuel,
                'exhaust': this.data.now.exhaust,
                'engine': this.data.now.engine
            });
        },
        pphan(e) {
            this.setData({
                'brand': e.target.dataset.brand
            })
        },
        // 取消按钮
        closeBtnHan() {
            this.triggerEvent('close')
        },
        // 重置按钮
        resetBtnHan() {
            this.setData({
                brand: ''
            })
        },
        // 除了品牌之外的点击
        ppphan(_e) {
            var k = _e.target.dataset.k;
            var v = _e.target.dataset.v;
            // 双色球逻辑，如果在就删除，如果不在就加入
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
        // 查看全部选项
        showalloption(_e) {
            var e = _e.target.dataset.e;
            var c = _e.target.dataset.c;
            var options = _e.target.dataset.options;
            this.setData({
                nowoptions: options,
                nowe: e,
                nowc: c,
                nowshow: 'showall'
            })

        },
        okHan2(e) {
            console.log(e);
            this.setData({
                now: {
                    ...this.data.now,
                    [e.detail.e]: e.detail.current
                },
                nowshow: 'main'
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
                }),
                // 把properties设置为data
                this.setData({
                    brand: this.properties.brand,
                    filters: this.properties.filters
                })
        }
    }
})