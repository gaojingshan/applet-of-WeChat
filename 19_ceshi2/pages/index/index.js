// pages/index/index.js
const app = getApp();
Page({
    data: {
        xbararr: ['首页', '生鲜', '厨房用品', '食品饮料', '电脑办公', '图书', '手机', '腕表珠宝', '箱包皮具', '男鞋', '男装', '母婴', '医疗健康', '运动'],
        // 当前点击的谁
        nowcur: '首页',
        indexC: 'i0',
        windowWidth: app.globalData.windowWidth,
        windowHeight: app.globalData.windowHeight,
        showLoading: true,
        // 小栏目数据，生鲜、厨房用品等
        xlmarr1: [],
        xlmarr2: [],
        // 瀑布流展示
        left_arr: [],
        right_arr: [],
        page: 1,
        // 首页
        indexArr: []

    },
    // 页面一加载
    onReady() {
        // 拉取接口
        this.loadData();
    },
    // 封装一个函数，用于拉取Ajax接口
    loadData() {
        // 拉取后台数据,小栏目接口
        if (this.data.nowcur != '首页') {
            wx.request({
                url: 'http://192.168.43.106:3000/xlm?lm=' + this.data.nowcur,
                success: (data) => {
                    // console.log(data.data);
                    this.setData({
                        xlmarr1: data.data.slice(0, 5),
                        xlmarr2: data.data.slice(5, 10),
                        showLoading: false
                    })

                }
            })
            wx.showLoading({
                title: '正在加载',
            })
            // 拉取Ajax，瀑布流接口
            wx.request({
                url: 'http://192.168.43.106:3000/pbl?lm=' + this.data.nowcur + '&page=' + this.data.page,
                success: (data) => {
                    for (let i = 0; i < data.data.length; i++) {
                        if (i % 2 == 0) {
                            this.data.left_arr.push(data.data[i])
                        } else {
                            this.data.right_arr.push(data.data[i])
                        }
                    }
                    this.setData({
                        left_arr: this.data.left_arr,
                        right_arr: this.data.right_arr,
                    })
                    wx.hideLoading()
                    // console.log(data.data);

                    // console.log(this.data.left_arr, this.data.right_arr);
                }
            })
        } else {
            // 首页
            wx.request({
                url: 'http://192.168.43.106:3000/indexapi',
                success: (data) => {
                    this.setData({
                        indexArr: data.data
                    })

                }
            })
        }


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
            showLoading: true,
            left_arr: [],
            right_arr: []
        }, () => {
            this.loadData()
        })
    },
    // 滚动到底部时触发
    scrolltolower() {
        this.data.page++;
        this.loadData()

    }
})