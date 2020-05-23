// pages/cardetail/cardetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: {
            // 为了防止images为undefined
            images: {}
        },
        // 形式转换后的result
        result_arr_key: [],
        // 现在展现的是哪个细节
        nowdetail: 'view',
        // 当前展示第几张图片
        nowcurrent: 0,
        // 每一格展示的第几张图片
        nowsmallpicidx: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
    gotoback() {
        wx.navigateBack()
    },
    // 滑动图片
    changeHan(e) {
        console.log();
        const current = e.detail.current;
        const images = this.data.result.images;
        if (current < images.view.length) {
            this.data.nowdetail = 'view';
            this.data.nowsmallpicidx = current;
        } else if (current < images.view.length + images.inner.length) {
            this.data.nowdetail = 'inner';
            this.data.nowsmallpicidx = current - images.view.length;
        } else if (current < images.view.length + images.inner.length + images.engine.length) {
            this.data.nowdetail = 'engine';
            this.data.nowsmallpicidx = current - images.view.length - images.inner.length;
        } else if (current < images.view.length + images.inner.length + images.engine.length + images.more.length) {
            this.data.nowdetail = 'more';
            this.data.nowsmallpicidx = current - images.view.length - images.inner.length - images.engine.length;
        }
        this.setData({
            nowcurrent: current,
            nowdetail: this.data.nowdetail,
            nowsmallpicidx: this.data.nowsmallpicidx + 1
        })
    },
    // 点击导航跳转
    navHan(e) {
        const t = e.target.dataset.t;
        const images = this.data.result.images;
        if (t == 'view') {
            this.data.nowcurrent = 0
        } else if (t == 'inner') {
            this.data.nowcurrent = images.view.length
        } else if (t == 'engine') {
            this.data.nowcurrent = images.view.length + images.inner.length
        } else if (t == 'more') {
            this.data.nowcurrent = images.view.length + images.inner.length + images.engine.length
        }


        this.setData({
            nowdetail: t,
            nowcurrent: this.data.nowcurrent
        })
        console.log(this.data.nowcurrent);
    },
    // 放大图片预览
    bigpic() {
        var arr = [];
        for (var i = 0; i < this.data.result_arr_key.length; i++) {
            console.log();
            var arr1 = this.data.result.images[this.data.result_arr_key[i]].map(item => `http://aiqianduan.com:56506/images/carimages/${this.data.result.id}/${this.data.result_arr_key[i]}/` + item);
            arr.push(...arr1) ;

        }        

        wx.previewImage({
            current: `http://aiqianduan.com:56506/images/carimages/${this.data.result.id}/${this.data.nowdetail}/${this.data.result.images[this.data.nowdetail][this.data.nowsmallpicidx-1]}`, // 当前显示图片的http链接
            urls: arr // 需要预览的图片http链接列表
        })
        console.log(arr);
        

    }


})