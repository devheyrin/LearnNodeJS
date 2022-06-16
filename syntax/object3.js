let v1 = 'v1';
// 10000줄의 코드 
v1 = 'heyrin';

let v2 = 'v2';

let o = {
    v1: 'v1',
    v2: 'v2',
    f1() {
        console.log(this.v1);
    },
    f2() {
        console.log(this.v2);
    }
}

o.f1();
o.f2();

function f3() {
    console.log(this.v3);
}

o.v3 = 'v3';
o.f3 = f3;

console.log(o)