Page({
  data: {
    windowHeight: 0,
    // 存放结果的
    results: [],
    // 是否打开抽屉
    isShowDrawer: false,
    // 当前页码
    page: 1,
    now: {
      brand: '',
      color: ['红'],
      fuel: [],
      exhaust: [],
      engine: [],
    },
    filters: [{
        'c': '颜色',
        'e': 'color',
        'options': ['白', '黑', '蓝', '灰', '红', '银灰', '绿', '紫', '其他', '香槟', '黄', '咖啡', '橙']
      },
      {
        'c': '尾气',
        'e': 'exhaust',
        'options': ['国一', '国二', '国三', '国四', '国五', '国六']
      },
      {
        'c': '燃料',
        'e': 'fuel',
        'options': ['油电混合', '纯电动', '柴油', '汽油']
      },
      {
        'c': '排量',
        'e': 'engine',
        'options': ['1.0L', '1.2L', '1.4L', '1.4T', '1.6L', '1.6T', '1.8L', '1.8T', '2.0L', '2.0T', '3.0L', '3.0T', '5.0L', '5.0T']
      }
    ],
    // 当前正在展开谁的菜单
    nowmenu: 'color'
  },
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
  // 拉取数据
  loadData() {
    // 显示loading
    wx.showLoading({
      title: '正在加载中'
    })
    // Ajax拉取第1页数据
    wx.request({
      url: 'http://www.aiqianduan.com:56506/cars?' +
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
        // 隐藏loading
        wx.hideLoading();
      }
    })
  },
  // 滚动到底部时触发
  lowerHan() {
    // 加页码
    this.setData({
      page: this.data.page + 1
    }, function () {
      // 改完page之后做的事情
      this.loadData();
    })
  },
  // 点击筛选按钮
  showDrawer() {
    this.setData({
      isShowDrawer: true
    });
  },

  onClose() {
    this.setData({
      isShowDrawer: false
    });
  },
  // 当抽屉里面的确定按钮被点击
  drawer_inner_okHan(e) {
    this.setData({
      page: 1,
      // 结果清空在筛选
      results: [],
      isShowDrawer: false,
      now: {
        ...this.data.now,
        brand: e.detail.brand,
        color: e.detail.color,
        fuel: e.detail.fuel,
        exhaust: e.detail.exhaust,
        engine: e.detail.engine,
      }
    }, function () {
      // 改变完之后做的事情
      this.loadData()
    })
  },
  // 关闭按钮做的事情
  drawer_inner_closeHan() {
    this.setData({
      isShowDrawer: false
    })
  },
  //横向筛选器的点击事件
  xxk_tap_han(_e) {
    var e = _e.target.dataset.e;
    this.setData({
      nowmenu: e
    })
  },
  // 关闭菜单
  close_menu() {
    this.setData({
      nowmenu: ''
    })
  }
})