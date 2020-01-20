//当n过大时，会栈溢出
// function fun (n) {
//     if (n <= 1) return 1;
//     return fun(n-1) + fun(n-2);
// }

// console.log(fun(50));

//优化
function fun (n, a = 1, b = 1) {
    if (n <= 1) return b;
    return fun(n-1, b, a+b);
}

console.log(fun(100));