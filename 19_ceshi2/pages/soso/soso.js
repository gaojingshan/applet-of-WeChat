// pages/soso/soso.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputvalue: '华为P40手机',
        Storage: []
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.getStorage({
            key: 'lishisousuo',
            success: (res) => {
                if (res.data != undefined && res.data != null) {
                    this.setData({
                        Storage: JSON.parse(res.data)
                    })
                }

                // console.log(res.data);
            }
        })
    },
    // 点击input,进入搜索页
    search_han(e) {
        wx.setStorage({
            data: JSON.stringify([...this.data.Storage, e.detail.value]),
            key: 'lishisousuo',
        })
        wx.navigateTo({
            url: '/pages/search_result/search_result',
        })
    },
    // 点击垃圾桶
    ljt_click() {
        wx.clearStorage();
        this.setData({
            Storage: []
        })
    }
})