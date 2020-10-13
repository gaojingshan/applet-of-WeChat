Page({
  data: {
    windowHeight: 0,
    // 当前页码
    page: 1,
    // 接口获取到的汽车信息
    results: [],
    // 是否展示弹出层
    isShowDrawer: true,
    // 当前选中的
    now: {
      brand: ''
    },
    // 全部类别
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
  },
  onReady() {
    // 获取窗口高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    this.loadData();
  },
  // 封装获接口数据的函数
  loadData() {
    // 显示加载中字样
    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      url: 'http://www.aiqianduan.com:56506/cars?page=' + this.data.page + '&brand=' + this.data.now.brand,
      success: (data) => {
        this.setData({
          results: [...this.data.results, ...data.data.results]
        })
        // 隐藏loading
        wx.hideLoading();
      }
    })
  },
  // 到底部加载更多车辆
  scrolltolowerHan() {
    this.loadData(() => {}, this.setData({
      page: this.data.page + 1
    }));
  },
  // 单击筛选按钮显示
  showDrawerHan() {
    this.setData({
      isShowDrawer: true
    })
  },
  // 关闭弹出层
  closeDrawerHan() {
    this.setData({
      isShowDrawer: false
    })
  },
  // 抽屉的确定按钮
  drawer_okHan(e) {
    this.setData({
      isShowDrawer: false,
      page: 1,
      results: [],
      now: {
        ...this.data.now,
        brand: e.detail.now.brand
      }
    })
    this.loadData();
  }
})