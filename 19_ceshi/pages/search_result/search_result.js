// 当前页面，这个页码不会直接引发视图更新
var page = 1;
Page({
  data: {
    windowHeight: 0,
    // 存放结果的
    results: [],
    // 是否打开抽屉
    isShowDrawer: true,
    brand: '',
    filters: [{
        'c': '颜色',
        'e': 'color',
        'options': ['红', '黄', '蓝', '绿', '黑', '白', '银灰', '咖啡', '香槟', '橙', '灰']
      },
      {
        'c': '燃料',
        'e': 'fuel',
        'options': ['汽油', '柴油', '油电混合', '纯电动']
      },
      {
        'c': '尾气',
        'e': 'exhaust',
        'options': ['国一', '国二', '国三', '国四', '国五']
      },
      {
        'c': '排量',
        'e': 'engine',
        'options': ['1.0L', '1.2L', '1.4L', '1.4T', '1.6L', '1.6T', '1.8L', '1.8T', '2.0L', '2.0T', '2.2L', '2.2T', '3.0L', '3.0T', '4.0L', '4.0T', '5.0L', '5.0T']
      }
    ]
  },
  onReady() {
    // 得到屏幕高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    // AJax拉取第一页数据
    wx.request({
      'url': 'http://www.aiqianduan.com:56506/cars?page=' + page + '&brand=' + this.data.brand,
      success: (data) => {
        this.setData({
          results: data.data.results
        })
        console.log(data.data.results);
      }
    })
  },
  // 滚动到底部了
  lowerHandler() {
    // 加页码
    page++;
    wx.showLoading({
      title: '加载中',
    })
    // 拉取
    wx.request({
      'url': 'http://www.aiqianduan.com:56506/cars?page=' + page + '&brand=' + this.data.brand,
      success: (data) => {
        this.setData({
          results: [...this.data.results, ...data.data.results]
        })
        wx.hideLoading()
      }
    })
  },
  // 点击筛选按钮打开抽屉
  showDrawer() {
    this.setData({
      isShowDrawer: true
    });
  },
  // 点击黑色遮罩，关闭抽屉
  onClose() {
    this.setData({
      isShowDrawer: false
    });
  },
  drawer_inner_okHan(e) {
    this.setData({
      brand: e.detail.brand,
      isShowDrawer: false
    })
    wx.showLoading({
      title: '加载中',
    })
    page = 1;

    // 拉取
    wx.request({
      'url': 'http://www.aiqianduan.com:56506/cars?page=1&brand=' + this.data.brand,
      success: (data) => {
        this.setData({
          results: data.data.results,
        })
        wx.hideLoading()
      }
    })
  },
  // 关闭抽屉
  drawer_inner_close_han() {
    this.setData({
      isShowDrawer: false
    })
  }
})