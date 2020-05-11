// 当前页面，这个页码不会直接引发视图更新
var page = 1;
Page({
  data: {
    windowHeight: 0,
    // 存放结果的
    results: [],
    // 是否打开抽屉
    isShowDrawer: false,
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
      'url': 'http://www.aiqianduan.com:56506/cars?page=' + page,
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
      'url': 'http://www.aiqianduan.com:56506/cars?page=' + page,
      success: (data) => {
        this.setData({
          results: [...this.data.results, ...data.data.results]
        })
        wx.hideLoading()
      }
    })
  },
  handleClick() {
    console.log('按我');


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
  }
})