// components/showall/showall.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nowc: {
      type: String,
      value: ''
    },
    nowe: {
      type: String,
      value: ''
    },
    nowoptions: {
      type: Array,
      value: []
    },
    current: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight: 0,
    // 当前选中的
    current: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 复选框的选中与取消
    handleFruitChange({
      detail = {}
    }) {
      const index = this.data.current.indexOf(detail.value);
      index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
      this.setData({
        current: this.data.current
      });
    },
    // 点击确定按钮
    okHan() {
      this.triggerEvent('ok', {
        current: this.data.current,
        nowe: this.properties.nowe
      })

    },
    // 点击取消按钮
    closeHan(){
      this.triggerEvent('close')
    }
  },
  // 组件的生命周期
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            windowHeight: res.windowHeight
          })
        },
      });
    }
  },
})