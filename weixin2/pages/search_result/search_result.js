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
      color: [],
      fuel: [],
      exhaust: [],
      engine: [],
      series: []
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
    nowmenu: '',
    date1_timestamp: 0,
    date2_timestamp: 0,
    date1: '',
    date2: ''
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
        '&engine=' + this.data.now.engine.join('v') +
        '&series=' + this.data.now.series.join('v') +
        '&' + (this.data.date1_timestamp != 0 && this.data.date2_timestamp != 0 ? 'buydate=' + this.data.date1_timestamp + 'to' + this.data.date2_timestamp : ''),
      success: (data) => {
        this.setData({
          results: [...this.data.results, ...data.data.results]
        })
        console.log(this.data.results);

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
      isShowDrawer: true,
      // 关闭菜单
      nowmenu: ''
    });
  },

  onClose() {
    this.setData({
      isShowDrawer: false
    });
  },
  // 当抽屉里面的确定按钮被点击
  drawer_inner_okHan(e) {
    console.log(e);

    // 将儿子发来的字符串日期改为时间戳 东八区的
    if (e.detail.date1 != '' && e.detail.date2 != '') {
      var date1_timestamp = Date.parse(new Date(e.detail.date1));
      var date2_timestamp = Date.parse(new Date(e.detail.date2));
    } else {
      var date1_timestamp = 0;
      var date2_timestamp = 0;
    }


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
        series: e.detail.series,
      },
      date1_timestamp: date1_timestamp,
      date2_timestamp: date2_timestamp,
      date1: e.detail.date1,
      date2: e.detail.date2,

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
  },
  // 抽屉的取消按钮
  cancelHan() {
    this.setData({
      nowmenu: ''
    })
  },
  // 抽屉的确定按钮
  okHan(e) {
    this.setData({
      now: {
        ...this.data.now,
        [this.data.nowmenu]: e.detail.current
      },
      nowmenu: '',
      page: 1,
      results: [],
    }, () => {
      this.loadData();
    })
  },
  // 返回上一层
  goback() {
    wx.navigateBack({
      delta: 1,
    })
  },
  // 去细节页面
  gotodetail(e) {
    wx.navigateTo({
      url: '/pages/cardetail/cardetail?id=' + e.currentTarget.dataset.id
    })
  }
})