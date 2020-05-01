Page({
    data: {
        arr: ['A', 'B', 'C', 'D'],
        content: ''
    },
    // 文本框的双向绑定
    changeContent(e) {
        this.setData({
            content: e.detail.value
        })
    },
    // 插入按钮事件监听
    insert() {
        // 改变数组
        this.setData({
            // arr: [...this.data.arr, this.data.content]
            arr: [this.data.content, ...this.data.arr],
            content: ''
        })
    }
})