/**
 * web audio 音频上下文
 */
export let audioContext = null;
(function (window) {
    if (!audioContext) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        try {
            audioContext = new window.AudioContext();
        } catch (e) {
            console.log("你的浏览器不支持AudioContext");
        }
    }
})(window);