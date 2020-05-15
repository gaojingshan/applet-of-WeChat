Page({
  data: {
    windowHeight: 0,
    // 存放结果的
    results: [],
    // 是否打开抽屉
    isShowDrawer: false,
    // 当前页面
    page: 1,
    // 默认选中的菜单
    nowmenu: '',
    now: {
      brand: '',
      color: [],
      fuel: [],
      exhaust: [],
      engine: [],
    },
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
  // 当页面被打开的时候  onShow是不会被卸载的
  onShow() {
    // 得到屏幕高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    this.loadData();
  },
  // 封装拉取数据方法
  loadData() {
    wx.showLoading({
      title: '加载中',
    })
    // AJax拉取第一页数据
    wx.request({
      'url': 'http://www.aiqianduan.com:56506/cars?' +
        'page=' + this.data.page +
        '&brand=' + this.data.now.brand +
        '&color=' + this.data.now.color.join('v') +
        '&fuel=' + this.data.now.fuel.join('v') +
        '&exhaust=' + this.data.now.exhaust.join('v') +
        '&engine=' + this.data.now.engine.join('v'),
      success: (data) => {
        this.setData({
          results: [...this.data.results, ...data.data.results]
        })
        wx.hideLoading()
        console.log(this.data.results);
      }
    })
  },
  // 滚动到底部了
  lowerHandler() {
    this.setData({
      // 加页码
      page: this.data.page + 1
    }, function () {
      // 改完page之后做的事情
      this.loadData()
    })
  },
  // 点击筛选按钮打开抽屉
  showDrawer() {
    this.setData({
      isShowDrawer: true,
      nowmenu: ''
    });
  },
  // 点击黑色遮罩，关闭抽屉
  onClose() {
    this.setData({
      isShowDrawer: false
    });
  },
  // 当抽屉里面的确定按钮被点击
  drawer_inner_okHan(e) {
    this.setData({
      // 结果也要清空
      results: [],
      isShowDrawer: false,
      now: {
        ...this.data.now,
        brand: e.detail.brand,
        color: e.detail.color,
        fuel: e.detail.fuel,
        exhaust: e.detail.exhaust,
        engine: e.detail.engine,
      },
      page: 1,
    }, function () {
      // 改变完之后做的事情
      this.loadData()
    })
  },
  // 关闭抽屉
  drawer_inner_close_han() {
    this.setData({
      isShowDrawer: false
    })
  },
  // 选项框切换
  xxk_click_han(_e) {
    var e = _e.target.dataset.e;
    this.setData({
      nowmenu: e
    })
  },
  // 关闭菜单
  close_Han() {
    this.setData({
      nowmenu: ''
    })
  },
  // 菜单的取消
  resetHan() {
    this.setData({
      nowmenu: ''
    })
  },
  // 菜单的确定
  menuokHan(e) {
    this.setData({

      page: 1,
      results: [],
      now: {
        ...this.data.now,
        [this.data.nowmenu]: e.detail.current
      },
      nowmenu: '',
    }, () => {
      this.loadData()
    })
  }
})