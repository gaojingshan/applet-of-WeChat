// component/all-brand/all-brand.js
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
        nowbrand: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            // console.log(event.detail, 'click right menu callback data')
        },
        // 获取当前点击的品牌
        brand_click(e) {
            this.setData({
                nowbrand: e.target.dataset.brand
            })
        },
        // 全部品牌页面点击确定按钮
        allbrand_okHan() {
            this.triggerEvent('ok', {
                brand: this.data.nowbrand
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
            })
            // Ajax
            wx.request({
                url: 'http://www.aiqianduan.com:56506/allbs',
                success: (data) => {
                    console.log(data.data);
                    var arr = [];
                    for (var zimu in data.data) {
                        var nowitem = {
                            key: zimu,
                            list: []
                        }
                        arr.push(nowitem)
                        for (var pinpai in data.data[zimu]) {
                            nowitem.list.push(pinpai)
                        }
                    }
                    console.log(arr);
                    this.setData({
                        allbs: data.data,
                        allbs_arr: arr,
                        allbs_keys: Object.keys(data.data)
                    })
                }
            })
        }
    },
})