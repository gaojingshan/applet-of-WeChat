// components/menu-inner/menu-inner.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        nowmenu: {
            type: String,
            value: ''
        },
        nowo: {
            type: Object,
            value: {}
        },
        nowv: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 当前选中的
        current: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 复选框
        handleFruitChange({
            detail = {}
        }) {
            const index = this.data.current.indexOf(detail.value);
            index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
            this.setData({
                current: this.data.current
            });
        },
    },
    // 组件的生命周期
    lifetimes: {
        // 当组件加载好之后
        attached: function () {
            // 设置properties为data，进行数据的统一
            this.setData({
                current: this.properties.nowv
            })
        }
    },
})