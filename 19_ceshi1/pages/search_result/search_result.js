const app = getApp();

Page({
  data: {
    windowHeight: app.globalData.windowHeight,
    // 存放结果的
    results: [],
    // 是否打开抽屉
    isShowDrawer: false,
    // 当前页面
    page: 1,
    date1_timestamp: 0,
    date2_timestamp: 0,
    date1: '',
    date2: '',
    now: {
      brand: '',
      color: [],
      fuel: [],
      exhaust: [],
      engine: [],
      series: []
    },
    // 当前正在展开谁的菜单
    nowmenu: '',
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
        '&engine=' + this.data.now.engine.join('v') +
        "&series=" + this.data.now.series.join('v') +
        (this.data.date1_timestamp != 0 && this.data.date2_timestamp != 0 ? ('&buydate=' + this.data.date1_timestamp + 'to' + this.data.date2_timestamp) : ''),
      success: (data) => {
        this.setData({
          results: [...this.data.results, ...data.data.results]
        })
        wx.hideLoading()
        // console.log(this.data.results);
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
      // 关闭菜单
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
    // 将儿子发来的字符串日期变为时间戳
    var date1_timestamp = 0;
    var date2_timestamp = 0;
    if (e.detail.date1 != '' && e.detail.date2 != '') {
      date1_timestamp = Date.parse(new Date(e.detail.date1));
      date2_timestamp = Date.parse(new Date(e.detail.date2));
    } else {
      date1_timestamp = 0;
      date2_timestamp = 0;
    }

    if (date1_timestamp > date2_timestamp) {
      wx.showToast({
        title: '购买时间，开始日期不能大于结束日期',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        isShowDrawer: true,
      })
    } else {
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
          series: e.detail.series,
        },
        page: 1,
        date1_timestamp: date1_timestamp,
        date2_timestamp: date2_timestamp,
        date1: e.detail.date1,
        date2: e.detail.date2
      }, function () {
        // 改变完之后做的事情
        this.loadData()
      })
    }


  },
  // 关闭抽屉
  drawer_inner_close_han() {
    this.setData({
      isShowDrawer: false
    })
  },
  // 菜单的点击事件
  xxk_click_han(_e) {
    var e = _e.target.dataset.e;
    this.setData({
      nowmenu: e
    })
  },
  // 点击灰色区域关闭菜单
  close_menu() {
    this.setData({
      nowmenu: ''
    })
  },
  // 儿子传回来了取消
  cancelHan() {
    this.setData({
      nowmenu: ''
    })
  },
  // 菜单传回来的ok
  menuokHan(e) {
    this.setData({
      now: {
        ...this.data.now,
        [this.data.nowmenu]: e.detail.current
      },
      nowmenu: '',
      page: 1,
      results: []
    }, () => {
      // 拉取数据
      this.loadData()
    })
  },
  // 返回上一页
  goback() {
    wx.navigateBack()
  },
  // 去细节页面
  gotodetail(e) {
    // currentTarget 表示当前正在触碰的这个
    wx.navigateTo({
      url: '/pages/cardetail/cardetail?id=' + e.currentTarget.dataset.id
    })
  }
})