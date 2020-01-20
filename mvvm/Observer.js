function observe (value, asRootData) {
    if (!value || typeof value !== "object") {
        return;
    }
    return new Observer(value);
}

function Observer (value) {
    this.value = value;
    this.walk(value);
}

Observer.prototype = {
    constructor: Observer,
    walk: function (obj) {
        let self = this;
        Object.keys(obj).forEach((key) => {
            self.observeProperty(obj, key, obj[key])
        })
    },
    observeProperty: function (obj, key, val) {
        let dep = new Dep();
        let childOb = observe(val);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                if (Dep.target) {
                    dep.depend();
                }
                if (childOb) {
                    childOb.dep.depend();
                }
                return val
            },
            set: function (newVal) {
                if (val === newVal || (newVal !== newVal)) {
                    return;
                }
                val = newVal;
                //数据改变, 监听子属性
                childOb = observe(newVal);
                //通知数据变更
                dep.notify();
            }
        })
    }
}

/**
 * @class 依赖类 Dep
 */
let uid = 0;
function Dep () {
    //每个dep实例的id
    this.id = uid++;
    //array 存储Watcher
    this.subs = [];
}
Dep.target = null;
Dep.prototype = {
    constructor: Dep,
    /**
     * [添加订阅者]
     * @param sub 订阅者
     */
    addSub: function (sub) {
        this.subs.push(sub);
    },
    /**
     * [移除订阅者]
     * @param sub 订阅者
     */
    removeSub: function (sub) {
        let index = this.subs.indexOf(sub);
        if (index !== -1) {
            this.subs.splice(index, 1);
        }
    },
    //通知数据变更
    notify: function () {
        this.subs.forEach((sub) => {
            //执行每个订阅者的updata更新函数
            sub.updata();
        })
    },
    // add Watcher
    depend: function () {
        Dep.target.addDep(this);
    }
}