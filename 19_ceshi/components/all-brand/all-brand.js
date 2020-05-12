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
        // 用户现在在列表中点击的那个品牌
        nowChoose: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击品牌
        clickcell(e) {
            var pinpai = e.target.dataset.pinpai;
            this.setData({
                nowChoose: pinpai
            })

        },
        // 确定按钮的处理程序
        okHan() {
            this.triggerEvent('ok', {
                pinpai: this.data.nowChoose
            })
        },
        onChange(event) {
            // console.log(event.detail, 'click right menu callback data')
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
                }),
                // Ajax 拉取所有品牌数据
                wx.request({
                    url: 'http://www.aiqianduan.com:56506/allbs',
                    success: (data) => {
                        // 写形式转换程序，因为wxs文件中不能使用for var k in 这样的语法

                        console.log(data.data);
                        var arr = [];
                        for (var zimu in data.data) {
                            // 给每个字母设置一个数字
                            var item_obj = {
                                key: zimu,
                                list: []
                            }
                            arr.push(item_obj)
                            // 再次遍历，往空数组中推入项
                            for (var pinpai in data.data[zimu]) {
                                item_obj.list.push(pinpai)
                            }
                        }
                        console.log(arr);
                        this.setData({
                            allbs: data.data,
                            allbs_zimu: Object.keys(data.data),
                            // 全部车辆数据的数组版本,当然外层还是对象
                            allbs_array: arr
                        })

                    }
                })
        }
    },
})