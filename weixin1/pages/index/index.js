// 所有栏目的scrollTop的分档点，它没有写到data中，因为这个值的变化不引发视图变化
var allTypeTops = [0];

Page({
  data: {
    windowHeight: 0,
    products: {},
    products_keys: [],
    // 当前在哪个栏目,就是左边栏哪个栏目加cur，哪个栏目是长久的
    nowtype: '健康坚果',
    // 跳转到哪个id去，跳转是一瞬间的事
    nowid: '0'
  },
  // 页面加载完毕
  onReady() {
    // 读取微信的API，可以调用系统信息，从而得到屏幕高度
    wx.getSystemInfo({
      success: (res) => {
        // 设置为自己的data
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    // Ajax
    wx.request({
      url: 'http://www.aiqianduan.com:56506/product',
      success: (data) => {
        // Ajax的数据请求回来了
        console.log(data.data.products);
        const products = data.data.products;

        // 能够引发视图变化的要写到data中，如果不引发视图变化，不用写到data中
        var sum = 0;
        for (let k in products) {
          // 这个栏目的高度就是一个盒子的高度120乘以数量，加上标题40
          sum += 120 * products[k].length + 40;
          allTypeTops.push(sum)
        }
        console.log(allTypeTops);

        // 改变data
        this.setData({
          // 所有产品，对象
          products: products,
          // 提取对象的键名
          products_keys: Object.keys(products)
        });

      }
    })
  },
  // 左边栏的点击事件
  lmTapHan(e) {
    const index = e.target.dataset.index;
    const name = e.target.dataset.name;
    console.log(index);
    console.log(name);

    this.setData({
      nowid: index,
      nowtype: name
    })

  },
  // 右边的卷动事件
  scrollHan(e) {
    const scrollTop = e.detail.scrollTop;
    console.log(scrollTop);
    // 看看介于哪两个之间
    for (let i = 0; i < allTypeTops.length; i++) {
      if (scrollTop >= allTypeTops[i] && scrollTop < allTypeTops[i + 1]) {
        console.log(i);
        this.setData({
          // 设置nowtype，nowtype是中文名字
          nowtype: this.data.products_keys[i]
        })
      }
    }
  }
})