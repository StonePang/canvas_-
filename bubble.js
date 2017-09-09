//气泡类，红，蓝两种气泡的父类
//继承至Image类
class Bubble extends Image{
    constructor(path, position) {
        super()
        this.src = path
        this.name = position.name
        //圆心坐标
        this.centerX = position.centerX
        this.centerY = position.centerY
        //直径
        this.diameter = position.diameter
        //canvas画布的尺寸，用于超出边界后的坐标计算
        this.maxWidth = position.maxWidth
        this.maxHeight = position.maxHeight
        //红球被拖动时true
        this.drag =  false
        //瞬时速度
        this.speedX = 0
        this.speedY = 0
        this.setupCenter()
    }

    speed(speedX, speedY) {
        this.speedX = speedX
        this.speedY = speedY
    }

    exchangeSpeed(obj) {
        var tempX = this.speedX
        var tempY = this.speedY
        obj.speed(this.speedX, this.speedY)
        this.speed(tempX, tempY)
    }

    clearSpeed() {
        var speedX = Math.abs(this.speedX)
        var speedY = Math.abs(this.speedY)
        if (speedX < 0.1 && speedY < 0.1) {
            this.speedX = 0
            this.speedY = 0
        }
    }

    showSpeed(str) {
        log(str + this.name , this.speedX, this.speedY)
    }

    //通过速度计算出下一帧的圆心位置
    //as为设置的速度衰减比例
    move(as) {
        if (this.drag) {
            this.centerX += this.speedX
            this.centerY += this.speedY
        } else {
            this.as = as
            this.speedX *= this.as
            this.speedY *= this.as
            this.centerX += this.speedX
            this.centerY += this.speedY
            this.clearSpeed()
        }
    }

    //气泡碰撞后的函数
    collide(obj) {
        var res = isCollide(this, obj)
        if (res) {
            var x = (obj.centerX - this.centerX)
            var y = (obj.centerY - this.centerY)
            var r1 = this.diameter / 2
            var r2 = obj.diameter / 2
            //计算碰撞后的初始速度，确保下一帧两个图形不再碰撞
            var result = trans(x, y, r1, r2)
            //两蓝和不拖动的红色 相互之间的碰撞情况
            if (!this.drag && !obj.drag) {
                this.speed(-result.x / 2, result.y / 2)
                obj.speed(result.x / 2, -result.y / 2)
            }else if (this.drag && !obj.drag) {
                //拖红撞蓝的情况
                obj.speed(result.x, result.y)
                this.speed(0, 0)
                this.drag = false
            }else if (!this.drag && obj.drag) {
                this.speed(result.x, result.y)
                obj.speed(0, 0)
                obj.drag = false
            }
        }
    }
}


//红，蓝气泡类，继承自气泡类，可添加新成员，
//新成员函数是通屏与否的不同规则
class RedBubble extends Bubble {
    constructor(position) {
        super(imagePath.red, position)
    }
    //气泡被画布边缘阻挡
    setupCenter() {
        var width = this.diameter
        var height = this.diameter
        var x = this.centerX - width / 2
        var y = this.centerY - height / 2
        var w = this.maxWidth
        var h = this.maxHeight
        if (x <= 0 || x >= w - width) {
            this.centerX = width / 2
        }
        if (x >= w - width) {
            this.centerX = w - width / 2
        }
        if (y <= 0) {
            this.centerY = height / 2
        }
        if (y >= h - height) {
            this.centerY = h - height / 2
        }
    }
}

class BlueBubble extends Bubble {
    constructor(position) {
        super(imagePath.blue, position)
    }
    //气泡穿透后的坐标计算，实现屏幕互通
    setupCenter() {
        var width = this.diameter
        var height = this.diameter
        var x = this.centerX - width / 2
        var y = this.centerY - height / 2
        var w = this.maxWidth
        var h = this.maxHeight
        if (x <= -width) {
            x = w + width + x
        }
        if (x > w) {
            x = x - w - width
        }
        if (y < -height) {
            y = h + y + height
        }
        if (y > h) {
            y = y - h - height
        }
        this.centerX = x + width / 2
        this.centerY = y + height / 2
    }

}
