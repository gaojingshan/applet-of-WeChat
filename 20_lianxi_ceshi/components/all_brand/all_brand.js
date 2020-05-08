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
        allbs: {},
        all_zimu: [],
        // 用户现在在列表中点击的那个品牌
        nowChoose: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickcell(e) {
            var pinpai = e.target.dataset.pinpai;
            this.setData({
                nowChoose: pinpai
            })

        },
        // 确定按钮的处理程序
        okHan() {
            this.triggerEvent('ok', {
                'pinpai': this.data.nowChoose
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
            });
            // Ajax拉取所有品牌数据
            wx.request({
                url: 'http://www.aiqianduan.com:7897/allbs',
                success: (data) => {
                    console.log(data.data);
                    // console.log(Object.keys(data.data));
                    // 写形式转换程序，因为wxs文件中不能使用for var k in这样的语法
                    var o = {};
                    for (let zimu in data.data) {
                        // 给每个字母设置一个数字
                        o[zimu] = [];
                        // 再次遍历
                        for (let pinpai in data.data[zimu]) {
                            // console.log(pinpai);
                            o[zimu].push(pinpai)
                        }
                    }
                    console.log(o);

                    this.setData({
                        allbs: data.data,
                        all_zimu: Object.keys(data.data),
                        // 全部车辆数据的数组版本，当然外层还是对象
                        allbs_array: o
                    })
                }
            })
        }

    }
})