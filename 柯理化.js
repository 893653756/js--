/**
 * 返回一个函数
 */
var curry = function (fun) {
    let slice = Array.prototype.slice,
        arg = slice.call(arguments,1);
    return function () {
        let new_arg = slice.call(arguments);
        return fun.apply(null, arg.concat(new_arg));
    }
}
var add = curry(function(){
    console.log([...arguments].join("-"));
},1,2,3);
add(4);

//函数柯理化用处不大