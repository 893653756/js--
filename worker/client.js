import { TaskPool } from "../task/task_pool";
import { setTask } from "../task/task_mgr";
import { Util } from "../mod/util";
let MyWorker = require("worker-loader!./worker.js");
/**
 * 该模块提供任务组, 子线程执行任务
 * 适用于用于执行会影响页面卡顿的逻辑
 */

/**
 * 任务组表
 * 每组任务 {
 *      name: string, 
 *      taskPool: TaskPool,
 *      wait: Worker,
 *      workerCount: number,
 *      count: number,
 *      initWorkerFail: boolean
 *   }
 */
const groupMap = new Map();

/**
 * 创建任务组
 */
export const createTaskGroup = function (groupName, workerCount) {
    let group = groupMap.get(groupName);
    if (group) {
        throw new Error(`group is created, name:${groupName}`);
    }
    group = {
        name: groupName,
        taskPool: new TaskPool(),
        wait: [],
        workerCount: workerCount,
        count: 0,
        initWorkerFail: false
    };
    groupMap.set(groupName, group);
    for (let i = 0; i < workerCount; i++) {
        initWorker(group);
    }
}

/**
 * 初始化子线程
 */
const initWorker = function (group) {
    let worker;
    try {
        worker = new MyWorker();
    } catch (error) {
        group.initWorkerFail = true;
        return;
    }
    const name = `${group.name}:${group.count++}`;
    worker.name = name;
    group.wait.push(worker);
};

/**
 * @param {String} groupName 任务组名
 * @param {Function} func 方法
 * @param {Any} args 参数
 * @param {Number} type 任务类型 立即执行(0) 顺序执行(1)
 * @param {Function} successCB 成功回调
 * @param {Function} errorCB 失败回调
 */
export const request = function(groupName, func, args = [], type, successCB, errorCB) {
    const group = groupMap.get(groupName);
    if (!group) {
        throw new Error(`group not found, name:${groupName}`);
    }
    // 没有worker则加入到任务池
    if (group.initWorkerFail) {
        setTask(function (args, func, successCB, errorCB) {
            try {
                let r = Util.call(func, args);
                successCB && successCB(r);
            } catch (error) {
                errorCB && errorCB(error)
            }
        }, [args, func, successCB, errorCB], type);
        return;
    }
    // 放入子线程
    group.taskPool.push(func, [args, successCB, errorCB], type);
    exec(group);
}

/**
 * 消息中转站
 */
const exec = function (group) {
    let worker;
    const arr = group.wait;
    const len = arr.length - 1;
    if (len < 0) {
        return;
    }
    let task = group.taskPool.pop();
    if (!task) {
        return;
    }
    worker = arr[len];
    arr.length = len;
    worker.onmessage = currFirst(message, group, worker, task.args);
    worker.postMessage({
        func: task.func.toString(), // 传递字符串
        args: task.args[0],
    })
}

/**
 * 处理接收到的结果
 */
const message = function (e, group, worker, args) {
    const data = e.data;
    let task = group.taskPool.pop();
    if (task) {
        worker.onmessage = currFirst(message, group, worker, task.args);
        worker.postMessage({
            func: task.func.toString(), // 传递字符串
            args: task.args[0],
        })
    } else {
        group.wait.push(worker);
    }
    if (data.error) {
        return args[2] && args[2](data.error);
    }
    args[1] && args[1](data.ok);
}

// 柯里化
const currFirst = function(func, arg1, arg2, arg3, arg4) {
    return function (arg) {
        return func(arg, arg1, arg2, arg3, arg4);
    }
}