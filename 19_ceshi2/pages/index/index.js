// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    
    // 点击进入搜索页
    click_soso() {
        wx.navigateTo({
            url: '/pages/soso/soso'
        })
    }
})