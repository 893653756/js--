/**
 * 
 * @param vm [vm对象]
 * @param expOrFn [属性表达式]
 * @param cb [回调函数(一般用来做view动态更新)]
 */
function Watcher (vm, expOrFn, cb) {
    this.vm = vm;
    expOrFn = expOrFn.trim();
    this.cb = cb;
    this.depIds = {};

    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        this.getter = this.parseGetter(expOrFn);
    }
    this.value = this.get();
}

Watcher.prototype = {
    constructor: Watcher,
    updata: function () {
        this.run();
    },
    run: function () {
        let newVal = this.get();
        let oldVal = this.value;
        if (newVal === oldVal) {
            return;
        }
        this.value = newVal;
        //将newVal, oldVal 挂载到mvvm实例上
        this.cb.call(this.vm, newVal, oldVal);
    },
    get: function() {
        //将当前订阅指向自己
        Dep.target = this;
        //触发getter, 将自身添加到dep中
        let value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },
    //添加Watcher to Dep.subs[]
    addDep: function (dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    },
    parseGetter: function (exp) {
        if (/[^\w.$]/.test(exp)) {
            return;
        }
        let exps = exp.split(".");

        return function (obj) {
            for (let i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
}