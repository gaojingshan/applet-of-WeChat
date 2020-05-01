Page({
    data: {
        r: 100,
        g: 100,
        b: 100
    },
    // 当用户拖拽红色条的时候做的事情
    changeR(e) {
        this.setData({
            r: e.detail.value
        })
    },
    // 当用户拖拽绿色条的时候做的事情
    changeG(e) {
        this.setData({
            g: e.detail.value
        })
    },
    // 当用户拖拽蓝色条的时候做的事情
    changeB(e) {
        this.setData({
            b: e.detail.value
        })
    }
})