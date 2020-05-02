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
    },
    // 删除
    del(e) {
        // e.target表示你点击的元素，dataset表示身上的data-数据集合
        const n = e.target.dataset.n;

        // 问一下用户是不是真的要删除
        wx.showModal({
            title: '动作危险！',
            content: '真的要删除' + this.data.arr[n] + '么?',
            success: (o) => {
                // 如果用户点击的是确定
                if (o.confirm) {
                    // 删除应该用filter，而绝对不能用splice()
                    // 过滤！过滤留下来哪些项呢？留下来index不是n的项
                    this.setData({
                        arr: this.data.arr.filter((item, index) => index != n)
                    });
                    // 调用微信的API，提示
                    wx.showToast({
                        title: '成功删除',
                    })
                }
                // 不用else，因为用户点击了取消什么都不做
            }
        })
    }
})