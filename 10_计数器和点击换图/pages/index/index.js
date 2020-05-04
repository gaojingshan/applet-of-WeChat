Page({
    data: {
        a: 10,
        m: 1
    },
    add(e) {
        const n = Number(e.target.dataset.n);
        this.setData({
            a: this.data.a + n
        })
    },
    prev() {
        this.setData({
            m: this.data.m - 1
        })
    },
    next(e) {
        // const n = e.target.dataset.n;
        this.setData({
            // m: n+1,
            m: this.data.m + 1,
        })
    },
    changem(e) {
        const index = e.target.dataset.index;
        this.setData({
            m: index
        })
    }
})