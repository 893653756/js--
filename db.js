import { Util } from "./util";
import { setTask } from "../task/task_mgr";

/**
 * 保存数据
 */

/**
 * 每个功能类型对用一个对象
 * {
 *     "type_one": {} // 这个 {} 只能是简单的 key--value
 *     "type_tow": {}
 * }
 */
const local = {};

/**
 * 监听列表
 * key : [fun, fun, fun, ...]
 */
const listenTable = {};

/**
 * 等待执行的列表
 */
let waitList = {}

/**
 * 任务量
 */
let taskCount = 0;
/**
 * 插入字段
 */
export const insert = function (type, obj) {
    if (local[type]) {
        throw new Error(`has the same type (${type})`);
    }
    if (!Util.isObject(obj)) {
        throw new Error(`${obj} must be object`);
    }
    local[type] = obj;
};

/**
 * 更新字段
 * @param {String} path [a.b.c.d || a.0]
 * @param {Any} value
 */
export const updata = function (path, newVal) {
    if (!Util.isString(path)) {
        throw new Error(`${path} is not string`);
    }
    let arr = path.split(".");
    let value = local;
    arr.forEach(function (key, index) {
        if (index < arr.length - 1) {
            value = value[key];
        } else {
            value[key] = newVal;
        }
    });
    addListenerToWait(path, newVal);
    if (taskCount === 0) {
        pushWaitToPool();
    }
}

/**
 * 设置监听列表
 */
export const listen = function (path, callback) {
    if (listenTable[path]) {
        listenTable[path].indexOf(callback) >= 0 ? null : listenTable[path].push(callback);
    } else {
        listenTable[path] = [callback];
    }
}

/**
 * 获取对应字段value
 */
export const get = function (path) {
    if (!Util.isString(path)) {
        throw new Error(`${path} is not string`);
    }
    let arr = path.split(".");
    let value = local;
    arr.forEach(function (key) {
        value = value[key];
    });
    return value;
}

/**
 * 把要执行的监听放入等待列表
 */
const addListenerToWait = function (path, newVal) {
    let callbacks = listenTable[path];
    if (!callbacks) {
        return;
    }
    let obj = waitList[path];
    if (obj) {
        if (obj.value === newVal) {
            return;
        }
        obj.value = newVal;
    } else {
        waitList[path] = {
            fun: callbacks,
            value: newVal
        }
    }
};

/**
 * 将等待列表放入任务池
 */
const pushWaitToPool = function () {
    let keys = Object.keys(waitList);
    keys.forEach((k) => {
        let obj = waitList[k];
        taskCount += obj.fun.length;
        obj.fun.forEach((cb) => {
            setTask(function (cb, value) {
                cb && cb(value);
                taskCount--;
                if (taskCount === 0) {
                    console.log("listen is over")
                }
            }, [cb, obj.value], 1);
        })
    });
    waitList = {};
}