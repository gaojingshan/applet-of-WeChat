// pages/mobilebind/mobilebind.js
Page({
    data: {
        mobile: ''
    },
    // 返回上一页
    goback() {
        wx.navigateBack()
    },
    inputHan1(e) {

        this.setData({
            mobile: e.detail.value
        })
    }
})