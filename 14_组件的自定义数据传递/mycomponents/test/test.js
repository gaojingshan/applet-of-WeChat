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
        },
        m: {
            type: 'Number',
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        a: 10
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addA() {
            this.setData({
                a: this.data.a + 1
            })
        },
        addM() {
            // 触发一个自定义事件,为什么要触发一个自定义事件呢？？
            // 因为要儿子向父亲通信，子组件要改变父组件的properties的时候，就必须使用这个triggerEvent进行自定义事件的发送。父组件用bind:addM来接收这个自定义事件。
            this.triggerEvent('addM', {
                n: 3
            });
        }
    }
})