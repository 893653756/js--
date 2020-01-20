/**
 * worker 计算线程
 */
import { Util } from "../mod/util";

/**
 * 消息中转
 */
onmessage = function (e) {
    const data = e.data;
    let func = new Function(`return ${data.func}`);
    const r = exec(func(), data.args);
    func = null;
    this.postMessage(r);
};

/**
 * 任务执行
 */
const exec = function (func, args) {
    try {
        const r = Util.call(func, args);
        return { ok: r }
    } catch (ex) {
        return { error: ex }
    }
}