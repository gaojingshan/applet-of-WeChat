// pages/cardetail/cardetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: {
            // 写images的原因是为了防止一会儿undefined
            images: {}
        },
        // 形式转换后的result,罗列images里面的key
        result_arr_key: [],
        // 当前所在的相册
        nowalbum: 'view',
        // 当前所在的号码
        nowpicidx: 0,
        // 当前所在的相册的小号码
        nowsmallpicidx: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id);
        const id = options.id || 1000003;
        wx.request({
            url: 'http://www.aiqianduan.com:56506/car/' + id,
            success: (data) => {
                console.log(data.data.result);
                // 形式转换
                var arr = []
                for (let k in data.data.result.images) {
                    arr.push(k)
                }
                this.setData({
                    result: data.data.result,
                    result_arr_key: arr
                })

            }
        })
    },
    // 返回上一页
    goback() {
        wx.navigateBack()
    },
    // 当用户滑动轮播图的时候
    changeHan(e) {
        console.log(e.detail.current);
        // 判断这个e.detail.current位于什么地方
        const images = this.data.result.images
        if (e.detail.current < images.view.length) {
            this.data.nowalbum = 'view';
            this.data.nowsmallpicidx = e.detail.current;
        } else if (e.detail.current < images.view.length + images.inner.length) {
            this.data.nowalbum = 'inner'
            this.data.nowsmallpicidx = e.detail.current - images.view.length;
        } else if (e.detail.current < images.view.length + images.inner.length + images.engine.length) {
            this.data.nowalbum = 'engine'
            this.data.nowsmallpicidx = e.detail.current - images.view.length - images.inner.length;
        } else if (e.detail.current < images.view.length + images.inner.length + images.engine.length + images.more.length) {
            this.data.nowalbum = 'more'
            this.data.nowsmallpicidx = e.detail.current - images.view.length - images.inner.length - images.engine.length;
        }
        this.setData({
            nowpicidx: e.detail.current,
            nowalbum: this.data.nowalbum,
            nowsmallpicidx: this.data.nowsmallpicidx + 1
        })
    },
    // 点击导航
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
    // 当用户点击轮播图的时候
    tapHan() {
        // 遍历出图片链接
        var arr = [];
        for (var i = 0; i < this.data.result_arr_key.length; i++) {
            console.log();
            var arr1 = this.data.result.images[this.data.result_arr_key[i]].map(item => `http://aiqianduan.com:56506/images/carimages/${this.data.result.id}/${this.data.result_arr_key[i]}/` + item);
            arr.push(...arr1);
        }
        
        wx.previewImage({
            // 当前显示图片的http链接
            current: `http://aiqianduan.com:56506/images/carimages/${this.data.result.id}/${this.data.nowalbum}/${this.data.result.images[this.data.nowalbum][this.data.nowsmallpicidx-1]}`,

            // 需要预览的图片http链接列表
            urls: arr
        })
    }
})