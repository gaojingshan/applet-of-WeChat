// pages/test2/test2.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        a: 10
    },
    fl_lm() {
        wx.switchTab({
            url: '/pages/category/category',
        })
    },
    add() {
        this.setData({
            a: this.data.a + 1
        })
    }
})