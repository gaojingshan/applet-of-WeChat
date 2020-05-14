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
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        // 品牌数组
        brand_arr: ['宝马', '奔驰', '奥迪', '本田', '丰田', '标致', '日产', '五菱'],
        // 当时显示的页面，main主页面  allbrand全部品牌页面 showall显示除品牌之外的栏目
        nowShow: 'main',
        brand: '',
        // 现在点击
        now: {
            color: [],
            fuel: [],
            exhaust: [],
            engine: []

        },
        // 现在点击谁的全部
        nowc: '颜色',
        nowe: 'color',
        nowoptions: ['红', '橙']
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击查看全部按钮
        allbrand_Click() {
            this.setData({
                nowShow: 'allbrand'
            })
        },
        // 筛选品牌
        allbrand_Han(e) {
            console.log();
            this.setData({
                nowShow: 'main',
                brand: e.detail.brand
            })
        },
        // 点击确定按钮
        okHan() {
            this.triggerEvent('ok', {
                brand: this.data.brand,
                color: this.data.now.color,
                fuel: this.data.now.fuel,
                exhaust: this.data.now.exhaust,
                engine: this.data.now.engine,
            })
        },
        // 点击品牌
        brand_btn(e) {
            this.setData({
                brand: e.target.dataset.brand
            })
        },
        // 点击除品牌之外的所有栏目的查看全部
        showall_Han(_e) {
            var c = _e.target.dataset.c;
            var e = _e.target.dataset.e;
            var options = _e.target.dataset.options;

            this.setData({
                nowShow: 'showall',
                nowc: c,
                nowe: e,
                nowoptions: options

            })
        },
        // 接收过来的值
        showall_Han2(e) {
            this.setData({
                now: {
                    ...this.data.now,
                    [e.detail.e]: e.detail.options
                },
                nowShow: 'main'
            })
        },
        // 点击除品牌外的选项
        btn_options(e) {
            // 获取当前点击的这个值
            var v = e.target.dataset.v;
            var k = e.target.dataset.k;

            if (this.data.now[k].includes(v)) {
                // 删除
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
        // 点击关闭按钮
        closebtn() {
            this.triggerEvent('close')
        },
        // 重置
        resetbtn() {
            this.setData({
                brand: '',
                now: {
                    color: [],
                    fuel: [],
                    exhaust: [],
                    engine: []
                }
            })
        },
        
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
            // 把properties设置为data
            this.setData({
                brand: this.properties.brand,
                filters: this.properties.filters,
                now: {
                    color: this.properties.color,
                    fuel: this.properties.fuel,
                    exhaust: this.properties.exhaust,
                    engine: this.properties.engine
                }

            })
        },

    },
})