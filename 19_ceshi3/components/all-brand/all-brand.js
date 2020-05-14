// components/drawer-inner/drawer-inner.js
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
        // 形式转换后的车品牌数组
        allbs_arr: [],
        // 当前点击的品牌
        brand: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击品牌
        brand_click(e) {
            this.setData({
                brand: e.target.dataset.brand
            })
        },
        // 点击确定按钮
        okHan() {
            this.triggerEvent('ok', {
                brand: this.data.brand
            })
        }
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
                }),
                // 拉取Ajax
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
                            for (var xiang in data.data[zimu]) {
                                nowitem.list.push((xiang))
                            }
                        }
                        this.setData({
                            allbs_arr: arr
                        })
                        console.log(arr);
                    }
                })
        }
    },
})