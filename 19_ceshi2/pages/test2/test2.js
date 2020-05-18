// pages/test2/test2.js
Page({
    data: {
        a: 10
    },
    gotocategory() {
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