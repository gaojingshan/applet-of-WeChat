//index.js
Page({
    data: {
        windowHeight: 0,
        products: {},
        products_keys: [],
        // 当前在哪个栏目，就是左边栏哪个栏目加cur，
        nowtype: '健康坚果',
        nowid: 0
    },
    onReady() {
        wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        windowHeight: res.windowHeight
                    })
                }
            }),
            // 接口
            wx.request({
                'url': 'http://www.aiqianduan.com:8922/product',
                success: (data) => {
                    console.log(data.data.products);
                    this.setData({
                        products: data.data.products,
                        products_keys: Object.keys(data.data.products)
                    })
                }
            })
    },
    changetype(e) {
        const index = e.target.dataset.index;
        const name = e.target.dataset.name;
        console.log();
        this.setData({
            nowid: index,
            nowtype: name
        })
    },
    // 右边的卷动事件
    scrollHan(e) {
        // console.log(e.detail.scrollTop);
        // console.log(e.detail.deltaY);
        if (e.detail.deltaY < 0) {
            // 如果是向下滚动的
            // 得到下一个盒子
            const query = wx.createSelectorQuery()
            query.select('#t' + (this.data.nowid + 1)).boundingClientRect()
            query.selectViewport().scrollOffset()
            query.exec( (res)=> {
                console.log(res[0].top); // #the-id节点的上边界坐标
                // 超过了
                if (res[0].top <= 0) {
                    this.setData({
                        nowid: this.data.nowid + 1,
                        nowtype: this.data.products_keys[this.data.nowid + 1]
                    })
                }
            })
        }
    }
})