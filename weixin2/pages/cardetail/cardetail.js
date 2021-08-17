// pages/cardetail/cardetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // picnav: [{
        //         k: 'view',
        //         v: '外观'
        //     },
        //     {
        //         k: 'inner',
        //         v: '内饰'
        //     },
        //     {
        //         k: 'engine',
        //         v: '发动机'
        //     },
        //     {
        //         k: 'more',
        //         v: '细节'
        //     },
        // ],
        result: {
            // 写images的原因是为了防止一会儿undefined
            images: {}
        },
        // 当前所在的相册
        nowalbum: 'view',
        // 当前所在的号码
        nowpicidx: 0,
        // 当前所在相册的小号码
        nowsmallpicidx: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad生命周期能够得到?带进来的参数
    onLoad: function (options) {
        console.log(options);
        const id = options.id || 1000003;
        wx.request({
            url: 'http://www.aiqianduan.com:56506/car/' + id,
            success: (data) => {
                console.log(data.data.result);
                this.setData({
                    result: data.data.result
                })

            }
        })
    },
    // 返回上一层
    goback() {
        wx.navigateBack({
            delta: 1,
        })
    },
    // 当用户滑动轮播图的时候
    changeHan(e) {
        // console.log(e);
        const images = this.data.result.images;
        // 判断e.detail.current位于什么地方
        // 利用跳楼现象
        if (e.detail.current < images.view.length) {
            this.data.nowalbum = 'view';
            this.data.nowsmallpicidx = e.detail.current + 1;
        } else if (e.detail.current < images.view.length + images.inner.length) {
            this.data.nowalbum = 'inner';
            this.data.nowsmallpicidx = e.detail.current - images.view.length + 1;
        } else if (e.detail.current < images.view.length + images.inner.length + images.engine.length) {
            this.data.nowalbum = 'engine';
            this.data.nowsmallpicidx = e.detail.current - images.view.length - images.inner.length + 1
        } else if (e.detail.current < images.view.length + images.inner.length + images.engine.length + images.more.length) {
            this.data.nowalbum = 'more';
            this.data.nowsmallpicidx = e.detail.current - images.view.length - images.inner.length - images.engine.length + 1
        }
        this.setData({
            nowpicidx: e.detail.current,
            nowalbum: this.data.nowalbum,
            nowsmallpicidx: this.data.nowsmallpicidx
        })
    },
    // 点击按钮的时候
    changeAlbum(e) {
        console.log(e.target.dataset.t);
        var t = e.target.dataset.t;
        const images = this.data.result.images;
        if (t == 'view') {
            this.data.nowpicidx = 0
        } else if (t == 'inner') {
            this.data.nowpicidx = images.view.length
        } else if (t == 'engine') {
            this.data.nowpicidx = images.view.length + images.inner.length
        } else if (t == 'more') {
            this.data.nowpicidx = images.view.length + images.inner.length + images.engine.length
        }
        this.setData({
            nowalbum: t,
            nowpicidx: this.data.nowpicidx
        })
    },
    // 点击轮播图
    tapHan() {
        console.log('我点击了');
        var arr1 = this.data.result.images.view.map(item => `http://www.aiqianduan.com:56506/images/carimages_small/${this.data.result.id}/view/` + item);
        var arr2 = this.data.result.images.inner.map(item => `http://www.aiqianduan.com:56506/images/carimages_small/${this.data.result.id}/inner/` + item);
        var arr3 = this.data.result.images.engine.map(item => `http://www.aiqianduan.com:56506/images/carimages_small/${this.data.result.id}/engine/` + item);
        var arr4 = this.data.result.images.more.map(item => `http://www.aiqianduan.com:56506/images/carimages_small/${this.data.result.id}/more/` + item);

        wx.previewImage({
            current: `http://www.aiqianduan.com:56506/images/carimages_small/${this.data.result.id}/${this.data.nowalbum}/${this.data.result.images[this.data.nowalbum][this.data.nowsmallpicidx-1]}`, // 当前显示图片的http链接
            urls: [...arr1, ...arr2, ...arr3, ...arr4] // 需要预览的图片http链接列表
        })
    }
})