//index.js
Page({
    data: {
        mydata: {
            a: 1,
            b: 2
        }
    },
    add() {
        this.setData({
            mydata: {
                ...this.data.mydata,
                a: this.data.mydata.a + 1
            }
        })
    }
})