//五个参数  要运动的对象， 要变化的属性集合， 时间， 运动方式， 回调函数
//变化的属性不带单位，，border-radius的值不能为百分号
function timeMove(obj, json, times, fx, fn) {
    //初始化后面三个参数
    //设置默认时间，和默认运动方式
    if (typeof times == 'undefined') {
        times = 400;
        fx = 'linear';
    };
    //当参数不全时（obj, json, fx, fn）
    if (typeof times == 'string') {
        if (typeof fx == 'function') {
            fn = fx;
        };
        fx = times;
        times = 400;
    } else if (typeof times == 'function') { //（obj, json, fn）
        fn = times;
        times = 400;
        fx = 'linear';
    } else if (typeof times == 'number') {
        if (typeof fx == 'function') {
            fn = fx;
            fx = 'linear';
        } else if (typeof fx == 'undefined') {
            fx = 'linear';
        };
    };

    var iCur = {}; //用于存储json传进来到需要变化的属性名
    //遍历json数据，，
    for (var attr in json) {

        iCur[attr] = 0;

        //t透明度单独处理，并将传进来的属性的初始值保存在 iCur 中
        if (attr == 'opacity') {
            iCur[attr] = Math.round(getStyle(obj, attr) * 100);
        } else {
            iCur[attr] = parseInt(getStyle(obj, attr));
        }
    }

    var startTime = now(); //运动的开始时间

    clearInterval(obj.timer);

    obj.timer = setInterval(function() {

        var changeTime = now(); //获取每次定时器重复的当前时间，即运动中的当前时间

        //(startTime - changeTime + times) 变化值为 times ~ 0        
        var t = times - Math.max(0, startTime - changeTime + times); //0到2000

        for (var attr in json) {
            //Tween[运动方式](当前时间, 变化属性的初始值, 属性的变化值, 持续时间)
            //会返回一个计算结果
            var value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);

            if (attr == 'opacity') {
                obj.style.opacity = value / 100;
                obj.style.filter = 'alpha(opacity=' + value + ')';
            } else {
                obj.style[attr] = value + 'px';
            }

        }
        //运动结束,关闭定时器,如果有回调函数,则执行回调函数
        if (t == times) {
            clearInterval(obj.timer);
            if (fn) {
                fn.call(obj); //设置this，让其指向传入的对象obj
            }
        }

    }, 13);

    //获取对象的属性初始值
    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

    //获取当前时间
    function now() {
        return (new Date()).getTime();
    }
}


var Tween = {
    linear: function(t, b, c, d) { //匀速
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) { //加速曲线
        return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) { //减速曲线
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function(t, b, c, d) { //加速减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d) { //加加速曲线
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function(t, b, c, d) { //减减速曲线
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d) { //加加速减减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p) { //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function(t, b, c, d, a, p) { //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 3.70158; //回缩的距离
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
}
