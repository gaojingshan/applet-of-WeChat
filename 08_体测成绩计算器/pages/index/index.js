Page({
    data: {
        BMI: ['正常', '低体重', '超重', '肥胖'],
        arraySex: ['男', '女'],
        indexSex: 0,
        arrayNj: ['大一', '大二', '大三', '大四'],
        indexNj: 0,
        valueWeight: 0,
        valueHeight: 175,
        valueFhl: 0,
        valueZlqq: 0,
        valueLdty: 0,
        valueRun50: 0,
        valueRun: 0,
        valueYtxs: 0,
    },
    bindPickerChangeSex: function (e) {
        console.log('pickerSex发送选择改变，携带值为', e.detail.value)
        this.setData({
            indexSex: e.detail.value
        })
    },
    bindPickerChangeNj: function (e) {
        console.log('pickerNj发送选择改变，携带值为', e.detail.value)
        this.setData({
            indexNj: e.detail.value
        })
    },
    bindInputWeight(e) {
        this.setData({
            valueWeight: e.detail.value
        })
    },
    bindInputHeight(e) {
        this.setData({
            valueHeight: e.detail.value
        })
    },
    bindInputFhl(e) {
        this.setData({
            valueFhl: e.detail.value
        })
    },
    bindInputZlqq(e) {
        this.setData({
            valueZlqq: e.detail.value
        })
    },
    bindInputLdty(e) {
        this.setData({
            valueLdty: e.detail.value
        })
    },
    bindInputRun50(e) {
        this.setData({
            valueRun50: e.detail.value
        })
    },
    bindInputRun(e) {
        this.setData({
            valueRun: e.detail.value
        })
    },
    bindInputYtxs(e) {
        this.setData({
            valueYtxs: e.detail.value
        })
    },
    bindText() {
        wx.showModal({
            title: '身体质量指数（BMI）',
            content: 'BMI是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。对大学生而言，BMI在（男）17.9~23.9、（女）17.2~23.9之间是正常的。',
            showCancel: false,
            confirmText: '我知道了',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }

})