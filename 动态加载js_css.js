//下列方法只能一个个加载文件，无法多个加载

/**
 * html动态加载js
 * @param {String} path  path地址的后缀名.js
 */
function addJs (path) {
    let head = document.getElementsByTagName("head")[0],
        script = document.createElement("script");
    script.src = path;
    script.type = "text/javascript";
    head.appendChild(script);
}
//此代码可以完成工作中的大部分要求, 缺点: 可能出现重复加载 ()



/**
 * 改进: 每种路径只能加载一次
 * @param {String} path  path地址的后缀名.js
 */
var cacheJs = []; //缓存加载过的路径
function addJs (path) {
    if (cacheJs.indexOf(path) > -1) {
        return;
    }
    let head = document.getElementsByTagName()[0],
        script = document.createElement("script");
    script.src = path;
    script.type = "text/javascript";
    head.appendChild(script);
    cacheJs.push(path);
}
//此代码解决重复加载的问题, 但是当加载的文件过大的时候,会导致还没加载成功，其它地方就开始用了



/**
 * 
 * @param {*} path  path地址的后缀名.js
 * @param {*} callback  文件加载完成时回调函数
 */
var cacheJs = []; //缓存加载过的路径
function addJs (path,callback) {
    if (cacheJs.indexOf(path) > -1) {
        return;
    }
    let head = document.getElementsByTagName()[0],
        script = document.createElement("script");
    script.src = path;
    script.type = "text/javascript";
    head.appendChild(script);
    cacheJs.push(path);
    //判断文件时候加载完成
    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback()
            }
        }
    } else { //标准浏览器
        script.onload = function () {
            callback();
        }
    }
    //还可以判断传入的callback是否为function (自己写写)
}


/**
 * html动态加载css (和加载js基本一样)
 * @param {String} path  path地址的后缀名.css
 */
let cacheCss = []; //缓存加载过的路径
function addCss (path) {
    if (cacheCss.indexOf(path) > -1) {
        return;
    }
    let head = document.getElementsByTagName()[0],
        link = document.createElement("link");
    link.href = path;
    link.type = "text/css";
    link.rel = "stylesheet"
    head.appendChild(link);
    cacheCss.push(path);
}



/*****************************************************html加载js和css汇总*********************************/

~function (window, document) {
    //缓存js、css路径资源
    let cache = {};
    let loadCssJs = function (path, callback) {
        if (path == "") {
            console.log("请输入正确路径");
            return;
        }
        //判断callback
        let callback = Object.prototype.toString.apply(callback) === "[object Function]"? callback:function(){};
        //判断文件后缀
        if (".js" === path.substr(-3)) {
            addJs(path, callback);
        } else if (".css" === path.substr(-4)) {
            addCss(path, callback);
        } else {
            console.log("请输入正确路径");
            return;
        }
    }
    
    //加载js
    function addJs (path,callback) {
        if (cache[path]) {
            return;
        }
        let head = document.getElementsByTagName()[0],
            script = document.createElement("script");
        script.src = path;
        script.type = "text/javascript";
        head.appendChild(script);
        cache[path] = 1;
        //判断文件时候加载完成
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    this.onreadystatechange = null;
                    callback()
                }
            }
        } else { //标准浏览器
            script.onload = function () {
                callback();
            }
        }      
    }

    //加载css
    function addCss (path) {
        if (cacheCss.indexOf(path) > -1) {
            return;
        }
        let head = document.getElementsByTagName()[0],
            link = document.createElement("link");
        link.href = path;
        link.type = "text/css";
        link.rel = "stylesheet"
        head.appendChild(link);
        cache[path] = 1;
        //判断文件时候加载完成
        if (link.readyState) { //IE
            link.onreadystatechange = function () {
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    this.onreadystatechange = null;
                    callback()
                }
            }
        } else { //标准浏览器
            link.onload = function () {
                callback();
            }
        } 
    }

    window.loadCssJs = loadCssJs;
} (window, document)

//只能一个一个加载，如果要保证加载顺序(依赖顺序)只能用嵌套回调:(主要相对js)
    // loadCssJs(path1, function() {
    //     loadCssJs(path2, function () {
    //         loadCssJs(path2, function () {})
    //     })
    // })
    //陷入回调地域

//如何加载多个文件，且解决js相互之间的依赖关系？？ (下回分享)
