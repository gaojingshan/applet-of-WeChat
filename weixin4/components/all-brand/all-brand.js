// components/all-brand/all-brand.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        now: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowHeight: 0,
        // 接口得到的数据
        allbs: {},
        // 字母
        allbs_zimu: [],
        // 形式转换程序后的值
        allbs_thunk: [],
        // 当前选择的品牌
        nowChoose: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击品牌的时候
        brandCellHan(e) {
            this.setData({
                nowChoose: e.target.dataset.brand
            })
        },
        // 点击确定按钮的时候
        okHan() {
            this.triggerEvent('ok', {
                brand: this.data.nowChoose
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
            });
            wx.request({
                url: 'http://www.aiqianduan.com:56506/allbs',
                success: (data) => {
                    var allbs_zimu = [];
                    var arr = [];
                    for (let k in data.data) {
                        allbs_zimu.push(k)
                    }
                    for (let zimu in data.data) {

                        var the_item = {
                            key: zimu,
                            list: []
                        }
                        arr.push(the_item)
                        for (var pp in data.data[zimu]) {
                            the_item.list.push(pp)
                        }
                    }
                    console.log(data.data);
                    console.log(arr);
                    this.setData({
                        allbs: data.data,
                        allbs_zimu: allbs_zimu,
                        allbs_thunk: arr
                    })

                }
            });
            this.setData({
                nowChoose: this.properties.now.brand
            })
        }
    },
})