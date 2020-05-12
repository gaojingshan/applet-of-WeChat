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
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        // 当前是什么界面,main表示主界面，allbrand表示全部品牌,showall查看全部选项
        nowshow: 'showall',
        // 当前选择的品牌
        brand: '',
        brand_arr: ['宝马', '奔驰', '奥迪', '本田', '丰田', '标致', '日产', '五菱'],
        now: {
            // 当前选择的颜色，由于可以多选，所以数组存放
            color: ['红', '黑'],
            // 当前选择的燃料，由于可以多选，所以数组存放
            fuel: [],
            // 当前选择的尾气，由于可以多选，所以数组存放
            exhaust: ['国二'],
            // 当前选择的排量，由于可以多选，所以数组存放
            engine: []
        },
        // 父亲传入的筛选器
        filters: [],
        // 当前正在点谁的全部
        nowc: '颜色',
        nowe: 'color',
        nowoptions: ['红', '黄']
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
            this.triggerEvent('ok', {
                brand: this.data.brand
            })
        },
        pphan(e) {
            this.setData({
                brand: e.target.dataset.pinpai
            })
        },

        closeBtnHan() {
            // 自己不能把自己关闭了，必须找父亲
            this.triggerEvent('close')
        },
        // 重置按钮
        resetBtnHan() {
            // 小程序是MVVM模式的，数据变化了，视图就变化了
            this.setData({
                brand: ''
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
            });
            // 把properties设置为data
            this.setData({
                brand: this.properties.brand,
                filters: this.properties.filters
            })
        }
    },
})