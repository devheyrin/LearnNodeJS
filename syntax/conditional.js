var args = process.argv;
// 실행된 프로그램을 실행한 node 경로, 프로그램 경로, 입력 인자를 배열로 반환한다. 
console.log(args[2]);
console.log('A');
console.log('B');

// node 로 프로그램을 실행할 때 3번째 인자가 '1'인 경우 실행한다. 
if(args[2] === '1') {
    console.log('C1');
} else {
    console.log('C2');
}
console.log('D');