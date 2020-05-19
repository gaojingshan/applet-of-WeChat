// pages/index/index.js
const app = getApp();
Page({
    data: {
        xbararr: ['首页', '生鲜', '厨房用品', '食品饮料', '电脑办公', '图书', '手机', '腕表珠宝', '箱包皮具', '男鞋', '男装', '母婴', '医疗健康', '运动'],
        nowcur: '生鲜',
        indexC: 'i0',
        windowHeight: app.globalData.windowHeight,
        showLoading: true,
        // 小栏目数据，生鲜、厨房用品等
        xlmarr1: [],
        xlmarr2: []

    },
    // 页面一加载
    onReady() {

        // 拉取后台数据
        wx.request({
            url: 'http://192.168.43.106:3000/xlm?lm=' + this.data.nowcur,
            success: (data) => {
                console.log(data.data);
                this.setData({
                    xlmarr1: data.data.slice(0, 5),
                    xlmarr2: data.data.slice(5, 10),
                    showLoading: false
                })

            }
        })

    },
    gotososo() {
        wx.navigateTo({
            url: '/pages/soso/soso',
        })
    },
    // 点击栏目的时候
    xxk_click(e) {
        const title = e.target.dataset.title;
        const index = e.target.dataset.index;
        this.setData({
            nowcur: title,
            indexC: 'i' + (index - 1),
            showLoading: true
        })
        if (title != '首页') {
            // 拉取后台数据
            wx.request({
                url: 'http://192.168.43.106:3000/xlm?lm=' + title,
                success: (data) => {
                    console.log(data.data);
                    this.setData({
                        xlmarr1: data.data.slice(0, 5),
                        xlmarr2: data.data.slice(5, 10),
                        showLoading: false
                    })

                }
            })
        }

    }


})