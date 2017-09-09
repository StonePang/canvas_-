//绑定常用函数
const log = console.log.bind(console)

const e = document.querySelector.bind(document)

//计算两点之间的距离
const distance = function(x1, y1, x2, y2) {
    var res = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    return res
}

//返回一个m n 之间的随机整数
const randomBetween = function(m, n) {
    var temp = Math.abs(m - n)
    var t1 = temp * Math.random()
    var res = Math.floor(m + t1)
    return res
}


//判断两个Bubble对象 / 位置数据对象是否相撞
const isCollide = function(b1, b2) {
    var cx1 = b1.centerX
    var cy1 = b1.centerY
    var cx2 = b2.centerX
    var cy2 = b2.centerY
    var r1 = b1.diameter / 2
    var r2 = b2.diameter / 2
    var l1 = distance(cx1, cy1, cx2, cy2)
    var l2 = r1 + r2
    if (l1 < l2) {
        return true
    } else {
        return false
    }
}
const absMax = function(x, y) {
    var absx = Math.abs(x)
    var absy = Math.abs(y)
    if (absx >= absy) {
        return x
    }else {
        return y
    }
}
const absMin = function(x, y) {
    var absx = Math.abs(x)
    var absy = Math.abs(y)
    if (absx <= absy) {
        return x
    }else {
        return y
    }
}

//计算碰撞后速度的函数
//将最大速度设置成两个圆的半径和
const trans = function(x, y, r1, r2) {
    var max = absMax(x, y)
    var min = absMin(x, y)
    var val = r1 + r2
    var rMax = val * Math.abs(max) / max
    var rMin = val / Math.abs(max) * min
    var res = {}
    if (max == x) {
        res = {
            x: rMax,
            y: rMin,
        }
    } else {
        res = {
            x: rMin,
            y:rMax,
        }
    }
    return res
}
