Page({
    data: {
        arr_color: ['黑', '白', '蓝', '灰', '红', '银灰', '橙', '绿', '紫', '其他', '香槟', '黄', '咖啡'],
        arr: [],
        checkNow: []
    },
    onReady() {
        for (var i = 1; i <= 10; i++) {
            wx.request({
                url: 'http://aiqianduan.com:7897/cars',
                data: {
                    page: i
                },
                success: (data) => {
                    // console.log(data.data);
                    this.setData({
                        arr: [...this.data.arr, ...data.data.results]
                    })
                    console.log(this.data.arr)
                }
            })
        }
    },
    checkboxChange: function (e) {
        this.setData({
            checkNow: e.detail.value
        })
        // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },


})