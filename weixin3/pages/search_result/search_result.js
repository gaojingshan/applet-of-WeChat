// pages/search_result/search_result.js
const app = getApp();
Page({


    /**
     * 页面的初始数据
     */
    data: {
        // 车的结果
        results: [],
        windowHeight: app.globalData.windowHeight
    },
    onReady() {
        wx.request({
            url: 'http://www.aiqianduan.com:56506/cars',
            success: (data) => {
                console.log(data.data.results);
                this.setData({
                    results: data.data.results
                })
            }
        })
    }

})