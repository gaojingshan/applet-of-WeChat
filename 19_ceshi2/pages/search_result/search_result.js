// 当前页面，这个页码不会直接引发视图更新
var page = 1;
Page({
  data: {
    windowHeight: 0,
    // 存放结果的
    results: [],
    // 抽屉是否打开
    isShowDrawer: false,
    brand: '',
    // 筛选
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
    page = 1;
    // AJax拉取第一页数据
    wx.request({
      'url': 'http://www.aiqianduan.com:56506/cars?page=' + page + '&brand=' + this.data.brand,
      success: (data) => {
        this.setData({
          results: data.data.results
        })
        // console.log(data.data.results);
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
      'url': 'http://www.aiqianduan.com:56506/cars?page=' + page + '&brand=' + this.data.brand + '&color=' + this.data.color + '&fuel=' + this.data.fuel + '&exhaust=' + this.data.exhaust + '&engine=' + this.data.engine,
      success: (data) => {
        this.setData({
          results: [...this.data.results, ...data.data.results]
        })
        wx.hideLoading()
      }
    })
  },
  // 点击筛选按钮
  handleClick() {
    this.setData({
      isShowDrawer: true
    })
  },
  closeClick() {
    this.setData({
      isShowDrawer: false
    })
  },
  // 筛选
  drawer_inner_ok_han(e) {
    console.log();
    this.setData({
      isShowDrawer: false,
      brand: e.detail.brand,
      color: e.detail.color,
      fuel: e.detail.fuel,
      exhaust: e.detail.exhaust,
      engine: e.detail.engine
    })
    wx.showLoading({
      title: '加载中',
    })
    page = 1;
    // 拉取
    wx.request({
      'url': 'http://www.aiqianduan.com:56506/cars?page=' + page + '&brand=' + e.detail.brand + '&color=' + e.detail.color + '&fuel=' + e.detail.fuel + '&exhaust=' + e.detail.exhaust + '&engine=' + e.detail.engine,
      success: (data) => {
        this.setData({
          results: data.data.results,

        })
        wx.hideLoading()
      }
    })
  },
  deleteHan() {
    this.setData({
      isShowDrawer: false
    })
  }
})