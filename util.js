/**
 * 下载数据到本地文件
 */
function downLoad(data, name) {
    const str = JSON.stringify(data, null, 2)
    const dataUrl = `data:,${str}`
    const a = document.createElement('a');
    a.download = name;
    a.rel = 'noopener';
    a.href = dataUrl;
    // 模拟点击
    a.dispatchEvent(new MouseEvent("click"));
}

/**
 * 斐波那契数列 [1, 1, 2, 3, 5, 8, 13...]
 * 算法一: 利用迭代器
 */
function* fibonacci() {
    yield 1;
    let [a, b] = [0, 1];
    while (true) {
        [a, b] = [b, a + b];
        yield b;
    }
}
let it = fibonacci();
let arr = Array.from(Array(10), it.next, it).map(x => x.value);
/**
 * 斐波那契数列 [1, 1, 2, 3, 5, 8, 13...]
 * 算法二: 利用数组归并
 */
function fibonacci_2(n) {
    return Array.from(Array(n)).reduce(([a, b], _) => {
        return [b, a + b];
    }, [0, 1])[0];
}
/**
 * 斐波那契数列 [1, 1, 2, 3, 5, 8, 13...]
 * 算法三: 利用动态规划思想
 */
function fibonacci_3(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
}

/**
 * 筛选质数
 */
function* sievePrimes(n) {
    let numbers = Array.from(Array(n - 2), (_, i) => i + 2);
    let p = null;
    while ((p = numbers.shift())) {
        yield p;
        numbers = numbers.filter(x => (x % p != 0))
    }
}

/**
* 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
* @param  {function} func        回调函数
* @param  {number}   wait        表示时间窗口的间隔
* @param  {boolean}  immediate   设置为ture时，是否立即调用函数
* @return {function}             返回客户调用函数
*/
function debounce(func, wait = 50, immediate = false) {
    let timer, context, args
    // 延迟执行函数
    const later = () => setTimeout(() => {
        // 延迟函数执行完毕，清空缓存的定时器序号
        timer = null
        // 延迟执行的情况下，函数会在延迟函数中执行
        // 使用到之前缓存的参数和上下文
        if (!immediate) {
            func.apply(context, args)
            context = args = null
        }
    }, wait)

    // 这里返回的函数是每次实际调用的函数
    return function (...params) {
        // 如果没有创建延迟执行函数（later），就创建一个
        if (!timer) {
            timer = later()
            // 如果是立即执行，调用函数
            // 否则缓存参数和调用上下文
            if (immediate) {
                func.apply(this, params)
            } else {
                context = this;
                args = params;
            }
        }
        // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
        // 这样做延迟函数会重新计时
        else {
            clearTimeout(timer)
            timer = later()
        }
    }
}

/**
 * 方法调用
 */
function call(func, args) {
    if (Array.isArray(args)) {
        switch (args.length) {
            case 0:
                return func();
            case 1:
                return func(args[0]);
            case 2:
                return func(args[0], args[1]);
            case 3:
                return func(args[0], args[1], args[2]);
            case 4:
                return func(args[0], args[1], args[2], args[3]);
            case 5:
                return func(args[0], args[1], args[2], args[3], args[4]);
            case 6:
                return func(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
                return func(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            case 8:
                return func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            default:
                func.apply(undefined, args);
        }
    } else {
        return func(args);
    }
}