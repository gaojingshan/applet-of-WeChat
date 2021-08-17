//index.js
//获取应用实例
const app = getApp();
// 分档点高度
const nodeType = [0];

Page({
  data: {
    windowHeight: app.globalData.windowHeight,
    products: {},
    products_keys: [],
    // 选中的栏目
    nowtype: '健康坚果',
    // 滚动到的位置
    index: 0
  },
  onReady() {
    // 读取接口信息
    wx.request({
      url: 'http://www.aiqianduan.com:56506/product',
      success: (data) => {
        const products = data.data.products;
        // 获取分档点的值
        var sum = 0;
        for (var k in products) {
          sum += (120 + 10) * products[k].length + 40;
          nodeType.push(sum)
        }

        this.setData({
          products: products,
          products_keys: Object.keys(products)
        })
      }
    })

  },
  // 点击右侧小栏目
  lmtap(e) {
    const item = e.target.dataset.item;
    const index = e.target.dataset.index;
    this.setData({
      nowtype: item,
      index: index
    })
  },
  // 滑动右侧
  bindscrollHan(e) {
    const scrollTop = e.detail.scrollTop;

    for (var i = 0; i < nodeType.length; i++) {
      if (nodeType[i] <= scrollTop && scrollTop < nodeType[i + 1]) {
        this.setData({
          nowtype: this.data.products_keys[i],
        })
      }
    }


  }
})