// 页面的程序，Page函数是内置函数
Page({
    // 定义数据，定义的数据就可以在wxml中用双大括号进行插入
    data: {
        a: 10
    },
    // 点击加法按钮做的事情
    add() {
        // setData表示更改数据，那么小程序是MVVM模式的
        // 数据变了，视图就自动变化。我们只需要让数据变化即可。
        // 把a改为多少？改为当前的a的值加1
        this.setData({
            a: this.data.a + 1
        })
    },
    // 点击减法按钮做的事情
    minus() {
        this.setData({
            a: this.data.a - 1
        })
    }
})