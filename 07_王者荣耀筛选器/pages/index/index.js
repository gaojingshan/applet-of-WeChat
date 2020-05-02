Page({
    data: {
        typeArr: ['射手', '法师', '坦克', '辅助', '战士', '刺客'],
        arr: [],
        nowType: '战士'
    },
    // 生命周期函数，就是Page的一生
    // 当页面就绪之后
    onReady() {
        // 发出Ajax
        wx.request({
            url: 'http://www.aiqianduan.com:56506/wzry',
            success: (data) => {
                console.log(data.data);
                this.setData({
                    arr: data.data
                })
            }
        })
    },
    // 改变筛选事件
    changeOption(e) {
        this.setData({
            nowType: e.detail.value
        })
    }
})