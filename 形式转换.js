var obj = {
    A:{
        '安徽':1
    },
    H:{
        '湖北':1,
        '湖南':1,
        '河北':1,
        '河南':1
    },
    G:{
        '广西':1,
        '广东':1
    }
};

var arr = [];
for(var k in obj){
    var item = {
        key: k,
        list: []
    }
    arr.push(item);
    for(var zimu in obj[k]){
        item.list.push(zimu)
    }
}
console.log(arr);

