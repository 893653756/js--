/**
 * 主要用于与音乐相关的主题
 * 点击按钮发出一个音符
 */
import { audioContext } from "./audio_context";

// 发出的声音频率数据，表现为音调的高低
let arrFrequency = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];

export const noteSound = function () {
    const index = Math.floor(Math.random() * arrFrequency.length);
    // 创建一个OscillatorNode, 它表示一个周期性波形(振荡), 基本上来说创造一个音调
    let oscillator = audioContext.createOscillator();
    // 创建一个GainNode,它可以控制音频的总音量
    let gainNode = audioContext.createGain();
    // 把音量，音调和终节点进行关联
    oscillator.connect(gainNode);
    // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，
    //一般表示音频渲染设备
    gainNode.connect(audioContext.destination);
    // 指定音调的类型，其他还有square|triangle|sawtooth
    /**
     * sine: 正玄波
     * square: 方形波
     * triangle: 三角波
     * sawtooth: 锯齿波
     */
    oscillator.type = 'sine';
    // 设置当前播放声音的频率，也就是最终播放声音的调调
    oscillator.frequency.value = arrFrequency[index];
    // 当前时间设置音量为0
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    // 0.01秒后音量为1 [线性]
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    // 音调从当前时间开始播放
    oscillator.start(audioContext.currentTime);
    // 1秒内声音慢慢降低，是个不错的停止声音的方法
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
    // 1秒后完全停止声音
    oscillator.stop(audioContext.currentTime + 1);
}

/**
 * 也可以根据自己的意愿设置播放的音符
 * @param {Array} frequency
 */
export const setFrequency = function (frequency) {
    arrFrequency = frequency;
}