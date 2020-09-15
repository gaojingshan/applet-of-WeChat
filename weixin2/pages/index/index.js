// 计算所有栏目的净位置
var the_type_scrollTop = [0]
Page({
  data: {
    windowHeight: 0,
    products: {},
    products_keys: [],
    nowtype: '健康坚果',
    nowid: 0
  },
  onReady() {
    wx.getSystemInfo({
        success: (res) => {
          // console.log(res.windowHeight);
          this.setData({
            windowHeight: res.windowHeight
          })
        }
      }),
      wx.request({
        url: 'http://www.aiqianduan.com:56506/product',
        success: (data) => {
          console.log(data.data.products);
          console.log(Object.keys(data.data.products));
          const products = data.data.products;
          var sum = 0;
          for (var k in products) {
            sum += 120 * products[k].length + 40;
            the_type_scrollTop.push(sum)
          }


          this.setData({
            products: data.data.products,
            products_keys: Object.keys(data.data.products)
          })

        }
      })
  },
  // 点击栏目
  lmHan(e) {
    const index = e.target.dataset.index;
    const name = e.target.dataset.name;
    this.setData({
      nowtype: name,
      nowid: index
    })
  },
  // 右侧滚动
  scrollHan(e) {
    console.log(e.detail.scrollTop);
    var scrollTop = e.detail.scrollTop;
    for (let i = 0; i < the_type_scrollTop.length; i++) {
      if (scrollTop >= the_type_scrollTop[i] && scrollTop < the_type_scrollTop[i + 1]) {
        this.setData({
          nowtype: this.data.products_keys[i]
        })
      }
    }

  }
})