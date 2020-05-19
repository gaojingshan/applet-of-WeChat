// pages/index/index.js
const app = getApp();
Page({
    data: {
        xbararr: ['首页', '生鲜', '厨房用品', '食品饮料', '电脑办公', '图书', '手机', '腕表珠宝', '箱包皮具', '男鞋', '男装', '母婴', '医疗健康', '运动'],
        nowcur: '生鲜',
        indexC: 'i0'
    },
    gotososo() {
        wx.navigateTo({
            url: '/pages/soso/soso',
        })
    },
    xxk_click(e) {
        const title = e.target.dataset.title;
        const index = e.target.dataset.index;
        this.setData({
            nowcur: title,
            indexC: 'i' + (index - 1)
        })
    }


})