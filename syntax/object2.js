// arr, obj

let f1 = function() {
    console.log(1);
}

let a = [f1];
a[0]();

let o = {
    func: f1
}
o.func();