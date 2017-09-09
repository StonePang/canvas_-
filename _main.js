const init = {
    red: 'RedBubble',
    blue: 'BlueBubble',
}

const imagePath = {
    red: 'image/red.png',
    blue: 'image/blue.png',
}

const bubbleName = {
    red: 'redBubble',
    blue: 'blueBubble',
}


var main = function() {
    //定义画布尺寸
    var maxWidth = 800
    var maxHeight = 600
    //定义每秒帧数
    var fps = 60
    //定义速度衰减率
    var as = 0.88
    //定义蓝气泡，红气泡的个数
    var numberBlue = randomBetween(4, 8)
    var numberRed = 1

    //都是数组
    var bubbles = bubble(numberRed, numberBlue, maxWidth, maxHeight)
    var red = bubbles.red
    var blues = bubbles.blue
    var g = new Game(maxWidth, maxHeight, fps, as, red, blues)
    //更新元素位置信息
    g.update = function() {
        g.collide()
        if (g.redDrag == 'no') {
            g.move()
        } else {
            g.move(blues)
        }
        g.setupCenter()
    }

    //定义鼠标相关事件
    g.registerAction('mousedown', function(event) {
        if (event.target.id == 'id-canvas') {
            var x = event.offsetX
            var y = event.offsetY
            g.inCircle(x, y)
        }
    })

    g.registerAction('mousemove', function(event) {
        if (g.redDrag != 'no') {
            var speedX = event.movementX
            var speedY = event.movementY
            g.dragRed(speedX, speedY)
            g.move(red)
        }
    })

    g.registerAction('mouseup', function(event) {
        if (g.redDrag != 'no') {
            g.undragRed()
        }
    })
}

main()
