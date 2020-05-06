// mycomponents/test/test.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 我要接收一个自定义属性，就是properties
        // 这个自定义属性是info
        info: {
            // 类型是字符串
            type: 'String',
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        a: 10,
        b: 34,
        c: 3
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addA() {
            this.setData({
                a: this.data.a + 1
            })
        }
    }
})