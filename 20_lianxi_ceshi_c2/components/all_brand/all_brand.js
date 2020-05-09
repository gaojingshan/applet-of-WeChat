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
        // 获得键名->字母
        allbs_zimu: [],
        // Json数据转换成数组形式
        allbs_array: {},
        // 现在点击的品牌
        nowbrand: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击品牌时触发
        handle_click(e) {
            this.setData({
                nowbrand: e.target.dataset.pinpai
            })
        },
        // 点确定时触发
        handle_ok_que() {
            this.triggerEvent('ok', {
                pinpai: this.data.nowbrand
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
                        for (var zimu in data.data) {
                            o[zimu] = [];
                            for (var pinpai in data.data[zimu]) {
                                o[zimu].push(pinpai);
                            }
                        }
                        this.setData({
                            allbs_zimu: Object.keys(data.data),
                            allbs_array: o
                        })
                        console.log(data.data);
                        console.log(o);
                    }
                })
        },
    }
})