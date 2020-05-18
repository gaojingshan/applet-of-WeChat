// pages/soso/soso.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputvalue: '华为P40手机',
        lishiwords: []
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 读取本地存储
        wx.getStorage({
            key: 'lishisousuo',
            success: (res) => {
                if (res.data != undefined && res.data != null) {
                    this.setData({
                        lishiwords: JSON.parse(res.data)
                    })
                }
            }
        })
    },
    // 输入框点击完成按钮时触发
    confirmhan(e) {
        // 存本地存储
        wx.setStorage({
            data: JSON.stringify([...this.data.lishiwords, e.detail.value]),
            key: 'lishisousuo',
        })
        wx.navigateTo({
            url: '/pages/search_result/search_result',
        })
    },
    // 清空垃圾桶，就是清空本地存储
    clearstorage() {
        wx.clearStorage();
        this.setData({
            lishiwords: []
        })
    }
})