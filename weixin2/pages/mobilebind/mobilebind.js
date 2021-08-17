// pages/mobilebind/mobilebind.js
Page({
  data: {
    mobile: '',
    yzm: '',
    // 倒计时
    countdown: 60
  },
  // 返回上一层
  goback() {
    wx.navigateBack({
      delta: 1,
    })
  },
  // 输入框单向绑定
  inputHan1(e) {
    console.log(e);
    this.setData({
      mobile: e.detail.value
    })
  },
  // 输入验证码的框
  inputHan2(e) {
    this.setData({
      yzm: e.detail.value
    })
  },
  sendsms() {
    // 正则表达式验证
    if (/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(this.data.mobile)) {
      // 通过正则了
      const timer = setInterval(() => {
        this.setData({
          countdown: this.data.countdown - 1
        }, () => {
          if (this.data.countdown == 0) {
            this.setData({
              countdown: 60
            })
            clearInterval(timer)
          }
        })
      }, 1000)
    } else {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })

    }
  }
})