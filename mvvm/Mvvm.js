/**
 * 双向绑定类
 * @param options 
 */
function Mvvm (options) {
    this.$options = options || {};
    let data = this._data = this.$options.data;
    let self = this;

    Object.keys(data).forEach(function(key){
        self._proxyData(key);
    })
    observe(data, this);
    new Compile(options.el || document.body, this);
}

Mvvm.prototype = {
    constructor: Mvvm,
    //代理
    _proxyData: function (key) {
        let self = this;
        Object.defineProperty(self, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter () {
                return self._data[key];
            },
            set: function proxySetter (newVal) {
                self._data[key] = newVal;
            }
        })
    }
}