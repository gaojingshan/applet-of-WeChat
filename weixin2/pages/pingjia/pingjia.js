// pages/pingjia/pingjia.js
Page({
  data: {
    images: [],
    visible1: false,
    actions1: [{
        name: '删除',
      },
      {
        name: '上移'
      },
      {
        name: '下移'
      }
    ],
    longpressIndex: 0
  },
  // 点击加号上传图片
  chooseimage() {
    wx.chooseImage({
      count: 9 - this.data.images.length,
      success: (res) => {
        this.setData({
          images: [...this.data.images, ...res.tempFilePaths]
        })
      }
    })
  },
  longpressHan(e) {
    var index = e.target.dataset.index;
    this.setData({
      // 打开动作菜单
      visible1: true,
      // 设置长按序号
      longpressIndex: index
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  handleClickItem1(e) {
    const actionSheetIndex = e.detail.index;
    if (actionSheetIndex == 0) {
      this.setData({
        images: this.data.images.filter((item, index) => index != this.data.longpressIndex),
        visible1: false
      })
    }
  },
  // 同步变成异步
  // 提交
  tijiao() {
    var self = this;
    // 上传第n张图片，递归调用n+1
    // 因为小程序只能同时传一张图片
    up(0);

    function up(n) {
      wx.showToast({
        title: '正在上传' + (n + 1) + '/' + self.data.images.length,
        icon: 'loading'
      })
      wx.uploadFile({
        filePath: self.data.images[n],
        name: '',
        url: 'http://127.0.0.1:3000/doup',
        success: () => {
          if (n < self.data.images.length - 1) {
            up(n + 1)
          }
        }
      })
    }

  },
  // 返回
  goback(){
    wx.navigateBack({
      delta: 1,
    })
  }
})