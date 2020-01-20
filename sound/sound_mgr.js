import { audioContext } from "./audio_context";
import { Sound } from "./sound";

/**
 * 音乐管理器 (适用于游戏)
 */
export class SoundMgr {
    constructor() {
        // 音乐缓存
        this.sound_res = {};
        this.arr = [];
        this.volum = 0.4 // 音量大小
    }
    /**
     * 播放声音
     * @param obj [资源信息]
     * obj.src : 资源路径
     * obj.loop : 是否循环
     * obj.callback : 播放完毕回调
     */
    play(obj) {
        if (!audioContext) {
            return;
        }
        // 如果有缓存资源, 则直接读取
        if (this.sound_res[obj.src]) {
            // 如果用户播放前调用了stop()则
            if (this.arr.length == 0) {
                let cfg = new SoundCfg(obj);
                cfg.mgr = this;
                this.arr.push(cfg);
                next(cfg, this.sound_res[obj.src]);
                return;
            }
            for (let cfg of this.arr) {
                if (cfg.src == obj.src) {
                    cfg.loop = obj.loop || cfg.loop || false;
                    cfg.callback = obj.callback || cfg.callback;
                    cfg.sound.callback = cfg.callback;
                    //直接播放
                    cfg.sound.play(cfg.mgr.volume, cfg.loop);
                }
            }
        } else {
            // 下载资源
            let cfg = new SoundCfg(obj);
            cfg.mgr = this;
            this.arr.push(cfg);
            // 此次资源加载需要时间, 如果用户点击停止, 应return
            this.loadSound(obj.src, (buffer) => {
                if (cfg.mgr) {
                    cfg = null;
                    return;
                }
                this.sound_res[obj.src] = buffer;
                next(cfg, buffer);
            })
        }
    }
    /**
     * 加载声音资源
     */
    loadSound(url, cb) {
        fetch(url, {
            method: 'get',
            responseType: 'arraybuffer'
        }).then(res => {
            return res.arrayBuffer();
        }).then(arraybuffer => {
            cb(arraybuffer)
        })
    }
    /**
     * 设置音量大小
     */
    setVolum(v) {
        if (v < 0) {
            v = 0;
        }
        if (v > 1) {
            v = 1;
        }
        this.volum = v;
        for (let cfg of this.arr) {
            cfg.sound.gainNode.value = v;
        }
    }
    /**
     * 获取音量大小
     */
    getVolum() {
        return this.volum;
    }
    /**
     * 停止当前管理器所有声音
     */
    allStop() {
        if (this.arr.length == 0) {
            return;
        }
        for (let cfg of this.arr) {
            this.sound_res[cfg.src] = null;
            cfg.mgr = null;
            cfg.src = null;
            cfg.callback = null;
            cfg.loop = null;
            cfg.sound && cfg.sound.destory();
        }
        this.arr = [];
    }
    /**
     * 暂停
     */
    /**
     * 继续播放
     */
}

/**
 * 声音配置器 (本地调用)
 */
class SoundCfg {
    constructor() {
        // 记录被那一个控制器管理
        this.mgr = null;
        // 管理哪一个声音资源
        this.sound = null;
        // 是否循环
        this.loop = obj.loop || false;
        // 是否有回调
        this.callback = obj.callback || null;
        // 资源地址
        this.src = obj.src;
    }
}

function next(cfg, buffer) {
    let s = new Sound();
    s.buffer = buffer;
    s.onended = cfg.callback;
    cfg.sound = s;
    s.play(cfg.mgr.volum, cfg.loop);
}
