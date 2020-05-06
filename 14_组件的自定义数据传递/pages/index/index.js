//index.js
Page({
    data: {
        m: 10
    },
    addM(e) {
        // 儿子引发父亲对自己数据的更改
        this.setData({
            m: this.data.m + e.detail.n
        })
    }
})