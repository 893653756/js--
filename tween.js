/*
 * 缓动函数:
 * Linear：无缓动效果
 * Quadratic：二次方的缓动（t^2）
 * Cubic：三次方的缓动（t^3）
 * Quartic：四次方的缓动（t^4）
 * Quintic：五次方的缓动（t^5）
 * Sinusoidal：正弦曲线的缓动（sin(t)）
 * Exponential：指数曲线的缓动（2^t）
 * Circular：圆形曲线的缓动（sqrt(1-t^2)）
 * Elastic：指数衰减的正弦曲线缓动
 * Back：超过范围的三次方缓动（(s+1)*t^3 - s*t^2）
 * Bounce：指数衰减的反弹缓动
 * 每种缓动函数都由三种变化:
 * 1.In  加速
 * 2.Out 减速
 * 3.InOut  先加速后减速
 * 注:linear 只有一种效果匀速
 * 参考链接： http://easings.net/zh-cn
 */

/**
 * @description 计算缓动的当前值
 * @param t current time, 当前时间
 * @param b beginning value, 初始值 (开始的属性值)
 * @param e ending value, 结束值 (结束的属性值)
 * @param d duration, 持续时间 解释为:运动的总时间
 * @param func select rase function, 选择的缓动函数
 * @example
 */
export const calc = (t, b, e, d, func) => {
    return b + (e - b) * func(t / d);
}


export const linear = (k) => {
    return k;
}
export const quadIn = (k) => {
    return k * k;
}

export const quadOut = (k) => {
    return k * (2 - k);
}

export const quadInOut = (k) => {
    if ((k *= 2) < 1) {
        return 0.5 * k * k;
    }
    return - 0.5 * (--k * (k - 2) - 1);
}

export const cubicIn = (k) => {
    return k * k * k;
}

export const cubicOut = (k) => {
    return --k * k * k + 1;
}

export const cubicInOut = (k) => {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
}

export const quartIn = (k) => {
    return k * k * k * k;
}

export const quartOut = (k) => {
    return 1 - (--k * k * k * k);
}

export const quartInOut = (k) => {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
    }
    return - 0.5 * ((k -= 2) * k * k * k - 2);
}

export const quintIn = (k) => {
    return k * k * k * k * k;
}

export const quintOut = (k) => {
    return --k * k * k * k * k + 1;
}

export const quintInOut = (k) => {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
}

export const sinIn = (k) => {
    return 1 - Math.cos(k * Math.PI / 2);
}

export const sinOut = (k) => {
    return Math.sin(k * Math.PI / 2);
}

export const sinInOut = (k) => {
    return 0.5 * (1 - Math.cos(Math.PI * k));
}

export const expIn = (k) => {
    return k <= 0 ? 0 : Math.pow(1024, k - 1);
}

export const expOut = (k) => {
    return k >= 1 ? 1 : 1 - Math.pow(2, - 10 * k);
}

export const expInOut = (k) => {
    if (k <= 0) {
        return 0;
    }
    if (k >= 1) {
        return 1;
    }
    if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
    }
    return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
}

export const circIn = (k) => {
    return 1 - Math.sqrt(1 - k * k);
}

export const circOut = (k) => {
    return Math.sqrt(1 - (--k * k));
}

export const circInOut = (k) => {
    if ((k *= 2) < 1) {
        return - 0.5 * (Math.sqrt(1 - k * k) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
}

export const elasticIn = (k) => {
    if (k <= 0) {
        return 0;
    }
    if (k >= 1) {
        return 1;
    }
    return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
}

export const elasticOut = (k) => {
    if (k <= 0) {
        return 0;
    }
    if (k >= 1) {
        return 1;
    }
    return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
}

export const elasticInOut = (k) => {
    if (k <= 0) {
        return 0;
    }
    if (k >= 1) {
        return 1;
    }
    k *= 2;
    if (k < 1) {
        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    }
    return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
}

export const backIn = (k, s) => {
    s = s || 1.70158;
    return k * k * ((s + 1) * k - s);
}

export const backOut = (k, s) => {
    s = s || 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
}

export const backInOut = (k, s) => {
    s = (s || 1.70158) * 1.525;
    if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
}

export const bounceIn = (k) => {
    return 1 - bounceOut(1 - k);
}

export const bounceOut = (k) => {
    if (k < (1 / 2.75))
        return 7.5625 * k * k;
    if (k < (2 / 2.75))
        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    if (k < (2.5 / 2.75))
        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
}

export const bounceInOut = (k) => {
    if (k < 0.5) {
        return (1 - bounceOut(1 - k * 2)) * 0.5;
    }
    return bounceOut(k * 2 - 1) * 0.5 + 0.5;
}