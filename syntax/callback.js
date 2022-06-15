// function a() {
//     console.log('A');
// }

// 변수의 값으로 함수를 정의한다. 
let a = function () {
    console.log('A');
}

// 굉장히 오랜시간이 걸리는 함수라고 가정  
function slowfunc(callback) {
    console.log('something');
    callback();
}

slowfunc(a);