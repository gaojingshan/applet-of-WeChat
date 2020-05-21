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
        indexArr: [],
        // 倒计时
        diff_h: '00',
        diff_m: '00',
        diff_s: '00',

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

        } else {
            // 首页
            wx.request({
                url: 'http://192.168.43.106:3000/indexapi',
                success: (data) => {
                    this.setData({
                        indexArr: data.data
                    })
                    // 页面一加载就要开始倒计时
                    this.timeStamp();
                    // 开启定时器，倒计时
                    setInterval(() => {
                        this.timeStamp();

                    }, 1000);

                }
            })


        }
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
    },
    // 获取时间的函数
    timeStamp() {
        // 12:00的时间戳
        var timeStamp12 = Math.ceil(Date.parse(new Date()) / 43200000) * 43200000 - 8 * 60 * 60 * 1000;
        // 0:00时间戳
        var timeStamp0 = Math.ceil(Date.parse(new Date()) / 86400000) * 86400000 - 8 * 60 * 60 * 1000;

        // 当前的时间戳
        var nowtimeStamp = Date.parse(new Date())

        if (new Date().getHours() <= 12) {
            var diff = timeStamp12 - nowtimeStamp
        } else {
            var diff = timeStamp0 - nowtimeStamp
        }

        var diff_h = parseInt(diff / (60 * 60 * 1000));
        var diff_m = parseInt(diff % (60 * 60 * 1000) / (60 * 1000));
        var diff_s = diff % (60 * 1000) / 1000;
        // console.log(diff_h, diff_m, diff_s);
        this.setData({
            diff_h: diff_h.toString().padStart(2, '0'),
            diff_m: diff_m.toString().padStart(2, '0'),
            diff_s: diff_s.toString().padStart(2, '0'),
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