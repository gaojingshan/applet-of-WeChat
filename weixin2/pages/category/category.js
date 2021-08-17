// 所有栏目的scrollTop的分档点，它没有写到data中，因为这个值的变化不引发视图变化。
var allTypeTops = [0]

const app = getApp();

//index.js
Page({
    data: {
        windowHeight: app.globalData.windowHeight,
        products: {},
        products_keys: [],
        // 当前在哪个栏目，就是左边栏哪个栏目加cur
        nowtype: '健康坚果',
        // 跳转到哪个id去
        nowid: 0
    },
    // 页面加载完毕
    onReady() {
        // Ajax 发起 HTTPS 网络请求
        wx.request({
            'url': 'http://www.aiqianduan.com:56506/product',
            success: (data) => {
                // Ajax的数据请求回来了
                console.log(data.data.products);
                const products = data.data.products;
                // 能够引发视图变化的要写到data中，如果不引发视图变化，不用写到data中。
                var sum = 0;
                for (var k in products) {
                    // 这个栏目的高度就是一个盒子的高度120乘以数量，加上标题40
                    sum += 120 * products[k].length + 40;
                    allTypeTops.push(sum)
                }
                console.log('分档点', allTypeTops);

                // 改变data
                this.setData({
                    // 所有产品，对象
                    products: products,
                    // 提取对象的键名
                    products_keys: Object.keys(products)
                })
            }
        })
    },
    // 左边栏的点击事件
    changetype(e) {
        const index = e.target.dataset.index;
        const name = e.target.dataset.name;
        this.setData({
            nowid: index,
            nowtype: name
        })
    },
    // 右边的卷动事件
    scrollHan(e) {
        // e.detail.deltaY可以告诉我们是向上滚动还是向下的
        // console.log(e.detail.deltaY);
        // e.detail.scrollTop是卷动值
        // console.log(e.detail.scrollTop);

        const scrollTop = e.detail.scrollTop;
        // 看看介于哪两个之间
        for (let i = 0; i < allTypeTops.length; i++) {
            if (scrollTop >= allTypeTops[i] && scrollTop < allTypeTops[i + 1]) {
                this.setData({
                    // 设置nowtype，nowtype是中文名字
                    nowtype: this.data.products_keys[i]
                })

            }
        }

        // 这里要看资料https://www.jianshu.com/p/85dac7943be0
        // if (e.detail.deltaY < 0) {
        //     // 如果是向下滚动的
        //     // 得到下一个盒子
        //     const query = wx.createSelectorQuery()
        //     query.select('#t' + (this.data.nowid + 1)).boundingClientRect()
        //     query.selectViewport().scrollOffset()
        //     query.exec( (res)=> {
        //         console.log(res[0].top); // #t-id节点的上边界坐标
        //         // 超过了
        //         if (res[0].top <= 0) {
        //             this.setData({
        //                 nowid: this.data.nowid + 1,
        //                 nowtype: this.data.products_keys[this.data.nowid + 1]
        //             })
        //         }
        //     })
        // }
    }
})