// components/all_brand/all_brand.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        zimu_keys: [],
        // 当前选中的品牌
        nowbrand: '奥迪'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击品牌
        handleClick(e) {
            var pinpai = e.target.dataset.pinpai;
            this.setData({
                nowbrand: pinpai
            })
        },
        // 点击确定
        handle_ok_pinpai() {
            this.triggerEvent('ok', {
                'pinpai': this.data.nowbrand
            })
        }
    },
    // 生命周期
    lifetimes: {
        attached: function () {
            wx.getSystemInfo({
                    success: (res) => {
                        this.setData({
                            windowHeight: res.windowHeight
                        })
                    }
                }),
                // Ajax
                wx.request({
                    url: 'http://www.aiqianduan.com:7897/allbs',
                    success: (data) => {
                        var o = {};
                        for (let zimu in data.data) {
                            o[zimu] = [];
                            for (let pinpai in data.data[zimu]) {
                                o[zimu].push(pinpai)
                            }
                        }
                        console.log(o);
                        // console.log(data.data);
                        this.setData({
                            zimu_keys: Object.keys(data.data),
                            allbs_array: o,
                            allbs: data.data
                        })

                    }
                })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    }
})