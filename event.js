/**
 * 事件模块 (单例模式)
 */
export class EventEmitter {
    constructor() {
        if (typeof EventEmitter.instance === 'object') {
            return EventEmitter.instance;
        }
        this._events = new Map();
        EventEmitter.instance = this;
    }
    // 添加
    addListener(type, fun) {
        if (typeof fun !== 'function') {
            throw new Error('fun is not an function');
        }
        let events = this._events;
        let handle = events.get(type);
        if (!handle) {
            events.set(type, [fun]);
        } else if (Array.isArray(handle)) {
            event.set(type, handle.concat(fun));
        }
    }
    // 触发
    emit(type, ...arg) {
        let events = this._events;
        let handle = events.get(type);
        if (!handle) {
            return false;
        }
        handle.forEach(fun => {
            fun.apply(this, arg)
        });
    }
    // 移除单个
    removeListener(type, fun) {
        if (typeof fun !== 'function') {
            throw new Error('fun is not an function');
        }
        let events = this._events;
        let handle = events.get(type);
        if (!handle) {
            return false;
        }
        for (let i = 0; i < handle.length; i++) {
            let v = handle[i]
            if (v === fun) {
                handle.splice(i, 1)
                break
            }
        }
        return true;
    }
    // 删除所有
    removeAllListener() {
        let events = this._events;
        let keys = events.keys();
        if (!keys) {
            return false;
        }
        keys.forEach(k => {
            events.delete(k);
        });
        return true;
    }
    // 只触发一次的
    addOnce(type, fun) {
        //用完即焚
        let wrapper = (...arg) => {
            fun.apply(this, arg);
            this.removeListener(type, wrapper);
        }
        this.addListener(type, wrapper);
    }
}