/**
 * 
 * @param el [element节点] 
 * @param vm [mvvm实例]
 */
function Compile (el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    
    if (this.$el) {
        this.$fragment = this.nodeFragment(this.$el);
        this.compileElement(this.$fragment);
        //将文档碎片放回到真实dom上
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    constructor: Compile,
    compileElement: function (el) {
        let self = this,
            childNodes = el.childNodes;
        [].slice.call(childNodes).forEach(function(node) {
            let text = node.textContent,
                reg = /\{\{((\s|\S)+?)\}\}/;
            //如果是元素节点
            if (self.isElementNode(node)) {
                self.compile(node);
            }
            //如果是文本节点
            else if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, RegExp.$1.trim());
            }
            //此节点还有子节点
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    //文档碎片, 遍历过程中会多次操作dom, 为提高性能我们会将el节点转换为fragment文档碎片解析操作, 解析完后添加到真实don
    nodeFragment: function (el) {
        let fragment = document.createDocumentFragment();
        let child;
        //此处有点疑问？
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    //解析元素指令
    compile: function (node) {
        let nodeAttr = node.attributes,
            self = this;
        [].slice.call(nodeAttr).forEach(function(attr){
            let attrName = attr.name;
            //指令
            if (self.isDirective(attrName)) {
                let exp = attr.value;
                let dir = attrName.substring(2);
                //事件指令
                if (self.isElementDirective(dir)) {
                    compileUtil.eventHandler(node, self.$vm, exp, dir);
                }
                //普通指令
                else {
                    compileUtil[dir] && compileUtil[dir](node, self.$vm, exp)
                }
                node.removeAttribute(attrName);
            }
        });
    },
    //解析 {{text}}
    compileText: function (node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },
    // element节点
    isElementNode: function (node) {
        return node.nodeType === 1;
    },
    // text节点
    isTextNode: function (node) {
        return node.nodeType === 3;
    },
    // x-abc 指令
    isDirective: function (attr) {
        return attr.indexOf("x-") === 0;
    },
    // on- 事件指令
    isElementDirective: function (dir) {
        return dir.indexOf("on") === 0;
    }
}

//定义$elm, 缓存当前执行input事件的input dom对象
let $elm;
let timer = null;

//指令处理部分
const compileUtil = {
    html: function (node, vm, exp) {
        this.bind(node, vm, exp, "html");
    },
    text: function (node, vm, exp) {
        this.bind(node, vm, exp, "text");
    },
    class: function (node, vm, exp) {
        this.bind(node, vm, exp, "class");
    },
    model: function (node, vm, exp) {
        this.bind(node, vm, exp, "model");
        let self = this;
        let val = this._getVmVal(vm, exp);
        //监听input事件
        node.addEventListener('input', function (e) {
            let newVal = e.target.value;
            $elm = e.target;
            if (val === newVal) {
                return;
            }
            // 设置定时器, 完成ui js的异步渲染
            clearTimeout(timer);
            timer = setTimeout(function () {
                self._setVmVal(vm, exp,newVal);
                val = newVal;
            })
        })
    },
    bind: function (node, vm, exp, dir) {
        let updaterFn = updater[dir + "Updater"];
        updaterFn && updaterFn(node, this._getVmVal(vm, exp));

        new Watcher(vm, exp, function (value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue)
        })
    },
    // 事件处理
    eventHandler: function (node, vm, exp, dir) {
        let eventType = dir.split(":")[1];
        let fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false)
        }
    },
    /**
     * [获取挂载在vm实例上的value]
     * @param vm [mvvm实例]
     * @param exp [mvvm定义的key] a || a.b || a.b.c
     */
    _getVmVal: function (vm, exp) {
        let val = vm;
        let exps = exp.split(".");
        exps.forEach(function (key) {
            key = key.trim();
            val = val[key];
        });
        return val;
    },
    /**
     * [设置挂载在vm实例上的newVal]
     * @param vm [mvvm实例]
     * @param exp [mvvm定义的key] a || a.b || a.b.c
     * @param newVal [新值]
     */
    _setVmVal: function (vm, exp, newVal) {
        let val = vm;
        let exps = exp.split(".");
        exps.forEach(function (key, index) {
            key = key.trim();
            if (index < exps.length - 1) {
                val = val[key];
            } else {
                val[key] = newVal;
            }
        });
    }
}

//指令渲染集合
const updater = {
    htmlUpdater: function (node, value) {
        node.innerHTML = typeof value === "undefined" ? "" : value;
    },
    textUpdater: function (node, value) {
        node.textContent = typeof value === "undefined" ? "" : value;
    },
    classUpdater: function () {

    },
    modelUpdater: function (node, value, oldValue) {
        // 不对当前操作input进行渲染操作
        if ($elm === node) {
            return false;
        }
        $elm = undefined;
        node.value = typeof value === "undefined" ? "" : value;
    }
}
