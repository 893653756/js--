/**
 * 此模块解析红点配置
 * 绑定监听
 */

let tipCfg = [];

/**
 * 定义运算函数
 */
const arithmetic = {
    ">": function (a, b) {
        return (a > b);
    },
    ">=": function (a, b) {
        return (a >= b);
    },
    "<": function (a, b) {
        return (a < b);
    },
    "<=": function (a, b) {
        return (a <= b);
    },
    "==": function (a, b) {
        return (a == b);
    },
    "!=": function (a, b) {
        return (a != b);
    },
    "in": function (a, b) {
        return (b.indexOf(a) >= 0);
    },
    "out": function (a, b) {
        return (b.indexOf(a) < 0);
    }
}

export class TipFun {
    // 初始化配置, 生成监听列表, 病出发监听
    // {
    //    监听路径
    //    depend: ["exp_fb.total_count", "open_fun.id"], 
    //    比较方法
    //    fun: [
    //        [
    //            [">=", { dkey: "open_fun.id" }, function () {
    //                return function_open["exp_fb"].id;
    //            }
    //            ], ['>', { dkey: `exp_fb.total_count` }, 0]
    //        ]
    //    ],
    //    节点路径
    //    tipKey: "explore.exp_fb.count"
    // }
    static init(cfg) {
        let depend;
        for (let i = 0, length = cfg.length; i < length; i++) {
            depend = cfg[i].depend;
            for (let j = 0, len = depend.length; j < len; j++) {
                TipFun.bindListen(depend[j], cfg[i]);
            }
        }
    }
    // 绑定监听
    static bindListen(k, _cfg) {
        
    }
}
