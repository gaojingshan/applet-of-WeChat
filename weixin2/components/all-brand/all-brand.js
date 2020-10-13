// components/all_brand/all_brand.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        brand: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        // allbs对象
        allbs: {},
        // allbs键名
        all_zimu: [],
        // 全部车辆数据的数组版本，当然外层还是对象
        allbs_arr: [],
        // 用户现在在列表中点击的那个品牌
        nowChoose: ''

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击单元格的事件
        clickBrandHan(e) {
            var brand = e.target.dataset.brand;
            console.log(brand);
            this.setData({
                nowChoose: brand
            })
        },
        // 确定按钮的处理程序
        okHan() {
            this.triggerEvent('ok', {
                'pinpai': this.data.nowChoose
            })
        },
        // 点击取消按钮
        closeHan() {
            this.triggerEvent('close')
        }
    },
    // 组件的生命周期
    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                },
            });
            // Ajax 拉取所有品牌数据
            wx.request({
                    url: 'http://www.aiqianduan.com:56506/allbs',
                    success: (data) => {
                        // 写形式转换程序，因为wxs中不能使用for var k in 遍历
                        // console.log(data.data);
                        // console.log(Object.keys(data.data));
                        var arr = [];
                        for (var zimu in data.data) {
                            var the_item = {
                                key: zimu,
                                list: []
                            };
                            arr.push(the_item)
                            for (var k in data.data[zimu]) {
                                the_item.list.push(k);
                            }
                        }
                        this.setData({
                            allbs: data.data,
                            all_zimu: Object.keys(data.data),
                            allbs_arr: arr
                        })

                    }
                }),
                this.setData({
                    nowChoose: this.properties.brand
                })
        }
    },
})