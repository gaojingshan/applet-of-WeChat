//index.js

Page({
    data: {
        // Ajax获取的数据
        arr: [],
        // 英雄类别
        hero: ['射手', '法师', '坦克', '辅助', '战士', '刺客'],
        // 现在选中的类别
        nowType: '法师'
    },
    onReady() {
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
    radioHan(e) {
        this.setData({
            nowType: e.detail.value
        })

    }
})