Page({
  data: {
    windowHeight: 0,
    // 接口读取的所有数据
    products: {},
    // 键名
    products_keys: []
  },
  onReady() {
    wx.getSystemInfo({
        success: (res) => {
          console.log(res.windowHeight);
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
          this.setData({
            products: data.data.products,
            products_keys: Object.keys(data.data.products)
          })
        }
      })
  },

})