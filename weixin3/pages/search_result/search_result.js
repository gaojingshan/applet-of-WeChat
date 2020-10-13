// 当前页码，这个页码不会直接引发视图更新
var page = 1;

Page({
  data: {
    windowHeight: 0,
    // 存放结果的
    results: [],
    // 是否打开抽屉
    isShowDrawer: false,
    brand: '',
    color: [],
    fuel: [],
    exhaust: [],
    engine: [],
    filters: [{
        'c': '颜色',
        'e': 'color',
        'options': ['白', '黑', '蓝', '灰', '红', '银灰', '绿', '紫', '其他', '香槟', '黄', '咖啡', '橙']
      },
      {
        'c': '尾气标准',
        'e': 'exhaust',
        'options': ['国一', '国二', '国三', '国四', '国五', '国六']
      },
      {
        'c': '燃料',
        'e': 'fuel',
        'options': ['油电混合', '纯电动', '柴油', '汽油']
      },
      {
        'c': '发动机排量',
        'e': 'engine',
        'options': ['1.0L', '1.2L', '1.4L', '1.4T', '1.6L', '1.6T', '1.8L', '1.8T', '2.0L', '2.0T', '3.0L', '3.0T', '5.0L', '5.0T']
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
    // Ajax拉取第1页数据
    wx.request({
      url: 'http://www.aiqianduan.com:56506/cars?page=1',
      success: (data) => {
        this.setData({
          results: data.data.results
        })

      }
    })
  },
  // 滚动到底部时触发
  lowerHan() {
    // 加页码
    page++;
    // 显示loading
    wx.showLoading({
      title: '正在加载中'
    })
    // 拉取
    wx.request({
      url: 'http://www.aiqianduan.com:56506/cars?page=' + page + '&brand=' + this.data.brand+ '&color=' + this.data.color.join('v') + '&fuel=' + this.data.fuel.join('v') + '&exhaust=' + this.data.exhaust.join('v') + '&engine=' + this.data.engine.join('v'),
      success: (data) => {
        this.setData({
          results: [...this.data.results, ...data.data.results]
        })
        // 隐藏loading
        wx.hideLoading();
      }
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
  // 确定按钮的事情
  drawer_inner_okHan(e) {
    page = 1;
    // 显示loading
    wx.showLoading({
      title: '正在加载中'
    })
    // 拉取
    wx.request({
      url: 'http://www.aiqianduan.com:56506/cars?page = 1&brand=' + e.detail.brand + '&color=' + e.detail.color.join('v') + '&fuel=' + e.detail.fuel.join('v') + '&exhaust=' + e.detail.exhaust.join('v') + '&engine=' + e.detail.engine.join('v'),
      success: (data) => {
        this.setData({
          results: data.data.results,
          isShowDrawer: false,
          brand: e.detail.brand,
          color: e.detail.color,
          fuel: e.detail.fuel,
          exhaust: e.detail.exhaust,
          engine: e.detail.engine,
          
        })
        // 隐藏loading
        wx.hideLoading();
      }


    })
  },
  // 关闭按钮做的事情
  drawer_inner_closeHan() {
    this.setData({
      isShowDrawer: false
    })
  }
})