Page({
    data: {
        nowred: [10, 15, 19, 33],
        nowblue: 4
    },
    // 点击红球
    handleClickRed(e) {
        const n = e.target.dataset.n;
        // 点击要做什么？？如果小球已经在数组中了，删除
        if (this.data.nowred.includes(n)) {
            this.setData({
                nowred: this.data.nowred.filter(item => item != n)
            })
        } else {
            // 如果不在数组中，加入
            // 判断是否已经够6个了
            if (this.data.nowred.length < 6) {
                this.setData({
                    nowred: [...this.data.nowred, n]
                })
            } else {
                wx.showToast({
                    title: '最多只能选6个小球',
                    icon: 'none'
                })
            }
        }
    },
    // 随机红球
    sjRed() {
        // 考验你的算法，随机样本算法，不重复随机
        var arr = [];
        while (arr.length < 6) {
            let a = parseInt(Math.random() * 33 + 1);
            if (!arr.includes(a)) {
                arr.push(a)
            }
        };
        this.setData({
            nowred: arr
        })
    },
    // 点击蓝球
    handleClickBlue(e) {
        const n = e.target.dataset.n;
        if (this.data.nowblue != n) {
            this.setData({
                nowblue: n
            })
        } else {
            this.setData({
                nowblue: ''
            })
        }

    },
    // 随机蓝球
    sjBlue() {
        const n = parseInt(Math.random() * 16 + 1);
        this.setData({
            nowblue: n
        })
    }
})