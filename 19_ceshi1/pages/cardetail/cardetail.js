// pages/cardetail/cardetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: {
            // 写images的原因是为了防止一会儿undefined
            images: {}
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id);
        const id = options.id;
        wx.request({
            url: 'http://www.aiqianduan.com:56506/car/' + 1000003,
            success: (data) => {
                console.log(data.data.result);

            }
        })

    },
    // 返回上一页
    goback(){
        wx.navigateBack()
    }


})