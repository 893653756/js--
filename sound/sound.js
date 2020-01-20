import { audioContext } from "./audio_context";
import { Util } from "../mod/util";

/**
 * 音乐模块
 */
export class Sound {
    constructor() {
        // 保存音乐数据
        this.buffer = null;
        // 当前音乐播放完毕回调
        this.onended = null;
        // 保存音乐数据节点
        this.audioBufferSourceNode = null;
        // 音量控制节点
        this.gainNode = null;
    }
    /**
     * 获取音乐时长
     */
    getDuration() {
        if (this.buffer) {
            return this.buffer.duration;
        }
        return 0;
    }
    /**
     * 播放音乐
     * @param {Number} volume [声音大小]
     * @param {Boolean} loop [是否循环]
     */
    play(volume, loop) {
        this.audioBufferSourceNode = audioContext.createBufferSource();
        // 声音控制器
        this.gainNode = audioContext.createGain();
        // 设置声音大小
        this.gainNode.gain.value = volume || 1;
        let node = this.audioBufferSourceNode;
        // 是否循环
        node.loop = loop;
        // 绑定音乐数据
        node.buffer = this.buffer;
        // 链接
        node.connect(this.gainNode);
        this.gainNode.connect(audioContext.destination);
        // 开始播放
        node.start();
        if (loop) {
            return;
        }
        // 播放完毕回调
        node.onended = (ev) => {
            this.destory();
            this.onended && this.onended();
        }
    }
    /**
     * 播放完毕销毁
     */
    destory() {
        this.audioBufferSourceNode.disconnect();
    }
}