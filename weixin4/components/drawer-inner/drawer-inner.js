// components/drawer-inner/drawer-inner.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filters: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        brandArr: ['宝马', '奔驰', '奥迪', '本田', '丰田', '标致', '日产', '五菱'],
        // 当前展示的 ， main  allbrand  showall
        show: 'main',
        // 当前选中的
        now: {
            brand: '',
            color: [],
            exhaust: [],
            fuel: [],
            engine: []
        },
        filters: {},
        // 当前在点击谁的全部
        nowe: 'color',
        nowc: '颜色',
        nowoptions: ['啊', '的', '我', '额'],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击选项块的时候
        clickCellHan(e) {
            this.setData({
                now: {
                    ...this.data.now,
                    brand: e.target.dataset.brand
                }
            })
        },
        // 点击其他的选项块的时候
        pppHan(_e) {
            console.log(_e.target.dataset);
            var e = _e.target.dataset.e;
            var xxkk = _e.target.dataset.xxkk;
            if (this.data.now[e].includes(xxkk)) {
                // 删除
                this.setData({
                    now: {
                        ...this.data.now,
                        [e]: this.data.now[e].filter(item => item != xxkk)
                    }
                })

            } else {
                // 添加
                this.setData({
                    now: {
                        ...this.data.now,
                        [e]: [...this.data.now[e], xxkk]
                    }
                })
            }

            console.log(this.data.now);

        },
        // 点击全部品牌的时候
        all_brand_Han() {
            this.setData({
                show: 'allbrand'
            })
        },
        // 其他选项的全部按钮
        show_all_Han(e) {
            var nowe = e.target.dataset.nowe;
            var nowc = e.target.dataset.nowc;
            var nowoptions = e.target.dataset.nowoptions;
            this.setData({
                show: 'showall',
                nowe: nowe,
                nowc: nowc,
                nowoptions: nowoptions,
            })
        },
        // 全部品牌的确定按钮
        allbrand_okHan(e) {
            this.setData({
                show: 'main',
                now: {
                    ...this.data.now,
                    brand: e.detail.brand
                }
            })
        },
        // 点击确定按钮的时候
        okHan() {
            this.triggerEvent('ok', {
                now: this.data.now
            })
        }
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
            })
        }
    },
})