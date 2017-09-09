//游戏控制类，实现事件绑定和定时刷新的各项操作
class Game {
    constructor(width, height, fps, as, red, blue) {
        this.canvas = e('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.width = width
        this.height = height
        this.fps = fps
        //速度衰减率
        this.as = as
        this.redDrag = 'no'
        //所有的气泡
        this.red = red
        this.blue = blue
        //事件注册的记录对象
        this.actions = {}
        this.setup()
    }

    setup() {
        this.canvas.style.width = this.width + 'px'
        this.canvas.style.height = this.height + 'px'
        this.element = [...this.red, ...this.blue]
        //得到气泡的两两不重复分组数组，用于碰撞函数
        this.dataPair = this.pair(this.element)
        //绑定拖动事件
        this.events()
        //设置刷新帧的相关操作
        this.auto()
    }

    //得到不重复的两两数组的函数
    pair(array) {
        var a = []
        for (var i = 0; i < array.length; i++) {
            var ele = array[i]
            var index = i + 1
            for (var j = index; j < array.length; j++) {
                var e = array[j]
                var temp = [ele, e]
                a.push(temp)
            }
        }
        return a
    }

    //绑定事件
    events() {
        var that = this
        window.addEventListener('mousedown', function(event) {
            if (that.actions.mousedown != undefined) {
                that.actions.mousedown(event)
            }
        })

        window.addEventListener('mousemove', function(event) {
            if (that.actions.mousemove != undefined) {
                that.actions.mousemove(event)
            }
        })

        window.addEventListener('mouseup', function(event) {
            if (that.actions.mouseup != undefined) {
                that.actions.mouseup(event)
            }
        })
    }

    //注册事件函数，实现在main()中具体设置各事件的回调函数
    registerAction(key, callback) {
        this.actions[key] = callback
    }


    //判断某个点是否在Bubble对象(圆形)里面,在里面的话改变红球的状态
    inCircle(x, y) {
        var red = this.red
        for (var i = 0; i < red.length; i++) {
            var rd = red[i]
            var cX = rd.centerX
            var cY = rd.centerY
            var r = rd.diameter / 2
            var l = distance(cX, cY, x, y)
            if (l <= r) {
                rd.drag = true
                this.redDrag = rd
            }
        }
    }

    dragRed(speedX, speedY) {
        var red = this.redDrag
        red.speed(speedX, speedY)
    }

    undragRed() {
        var red = this.redDrag
        red.drag = false
        red.speed(0, 0)
        this.redDrag = 'no'
    }

    isRedDrag() {
        var red = this.red
        for (var i = 0; i < red.length; i++) {
            var rd = red[i]
            if (rd.drag) {
                return true
            }
        }
        return false
    }

    //在画布上画出传入对象
    drawImage(obj) {
        var d = obj.diameter
        var x = obj.centerX - d / 2
        var y = obj.centerY - d / 2
        //第一次载入需要在onload中
        if (obj.complete) {
            this.context.drawImage(obj, x, y, d, d)
        } else {
            //箭头函数自动绑定this
            obj.onload = () => {
                this.context.drawImage(obj, x, y, d, d)
            }
        }
    }

    //画出所有类中的element对象
    drawImages() {
        var data = this.element
        if (!Array.isArray(data)) {
            this.drawImage(data)
        } else {
            for (var i = 0; i < data.length; i++) {
                var d = data[i]
                this.drawImage(d)
            }
        }
    }

    //设置所有的element的圆心位置，调用其自身的设置成员函数实现
    setupCenter() {
        var data = this.element
        if (!Array.isArray(data)) {
            data.setupCenter()
        } else {
            for (var i = 0; i < data.length; i++) {
                var d = data[i]
                d.setupCenter()
            }
        }
    }

    //气泡的碰撞执行函数，调用气泡类的碰撞成员函数实现
    collide() {
        var pairs = this.dataPair
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i]
            var a = pair[0]
            var b = pair[1]
            a.collide(b)
            if (!this.isRedDrag()) {
                this.redDrag = 'no'
            }
        }
    }

    //通过speed计算出这一帧的圆心位置。从未实现图片的移动
    //考虑到红，蓝气泡的move规则不同，设置一个外传参数
    move(objs) {
        var d = objs || this.element
        if (!Array.isArray(d)) {
            d.move(this.as)
        } else {
            for (var i = 0; i < d.length; i++) {
                var e = d[i]
                e.move(this.as)
            }
        }
    }

    //设置定时函数
    //每一次执行就是一帧
    //先算出每张图片本帧应在的位置，然后清空画布，最后重新draw
    auto() {
        setInterval( () => {
            //update更新各元素的坐标位置
            this.update()
            //clear
            this.context.clearRect(0, 0, this.width, this.height)
            //draw 根据坐标位置画图
            this.drawImages()
        }, 1000 / this.fps)
    }
}
