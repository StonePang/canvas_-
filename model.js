//创建一个气泡的随机位置数据数组
const creatPosition = function(maxWidth, maxHeight) {
    var a = {}
    a.centerX = randomBetween(0, maxWidth)
    a.centerY = randomBetween(0, maxHeight)
    a.diameter = randomBetween(30, 60)
    return a
}

//检测一个位置数据是不是与已有的其他位置数据碰撞
const positionCollide = function(position, array) {
    for (var i = 0; i < array.length; i++) {
        var ele = array[i]
        if (isCollide(position, ele)) {
            return true
        }
    }
    return false
}

//创建制定个数的位置数据，相互之间不碰撞
const creatPositions = function(num, maxWidth, maxHeight) {
    var a = []
    for (var i = 0; i < num; i++) {
        var po
        do {
            po = creatPosition(maxWidth, maxHeight)
        } while (positionCollide(po, a));
    a.push(po)
    }
    return a
}

const newPositions = function(numRed, numBlue, maxWidth, maxHeight) {
    var num = numRed + numBlue
    var a = creatPositions(num, maxWidth, maxHeight)
    var r = []
    var b = []
    for (var i = 0; i < a.length; i++) {
        var ele = a[i]
        if (i < numRed) {
            r.push(ele)
        }else {
            b.push(ele)
        }
    }
    var res = {
        redPositions: r,
        bluePositions: b,
    }
    return res
}

//配置单个气泡的初始化数据
//array格式是[20,30,40],分别代表圆心X坐标，圆心Y坐标，直径
//name是球的名字
//maxWidth,maxHeight表示画布的尺寸
//as是速度递减的百分比
//配置一个气泡的数据
const position = function(obj, name, maxWidth, maxHeight) {
    var p = {}
    p.centerX = obj.centerX
    p.centerY = obj.centerY
    p.diameter = obj.diameter
    p.name = name
    p.maxWidth = maxWidth
    p.maxHeight = maxHeight
    return p
}

//配置一种多个气泡的数据
const positionOneKind = function(obj, name, maxWidth, maxHeight) {
    var res = []
    for (var i = 0; i < obj.length; i++) {
        var ele = obj[i]
        var p = position(ele, name, maxWidth, maxHeight)
        res.push(p)
    }
    return res
}

//配置两种多个气泡的初始化数据
const positions = function(numRed, numBlue, maxWidth, maxHeight) {
    var pos = newPositions(numRed, numBlue, maxWidth, maxHeight)
    var redPositions = pos.redPositions
    var bluePositions = pos.bluePositions
    var redName = bubbleName.red
    var blueName = bubbleName.blue
    var redInit = positionOneKind(redPositions, redName, maxWidth, maxHeight)
    var blueInit = positionOneKind(bluePositions, blueName, maxWidth, maxHeight)
    var res = {
        red: redInit,
        blue: blueInit,
    }
    return res
}

const bubble = function(numRed, numBlue, maxWidth, maxHeight) {
    var r = {}
    var data = positions(numRed, numBlue, maxWidth, maxHeight)
    var keys = Object.keys(data)
    for (var i = 0; i < keys.length; i++) {
        var a = []
        var k = keys[i]
        var ele = data[k]
        for (var j = 0; j < ele.length; j++) {
            var d = ele[j]
            var s = init[k]
            eval(`var res = new ${s}(d)`)
            a.push(res)
        }
        r[k] = a
    }
    return r
}
