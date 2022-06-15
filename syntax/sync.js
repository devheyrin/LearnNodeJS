import { readFile } from 'fs';

// readFileSync 동기적 처리 
// console.log('A');
// let result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C');
// A -> result -> C 순서로 출력 

// readFile 비동기적 처리 - NodeJS가 더 선호하는 방식!
console.log('A');
readFile('syntax/sample.txt', 'utf8', function(err, result) {
    console.log(result);
});
// 파일을 읽어오는데, 시간이 좀 걸릴 수 있으니 파일 다 읽으면 function을 네가 알아서 호출하거라.
// function 은 콜백(나중에 호출)함수라고 부른다. 
console.log('C');
// A -> C -> result 순서로 출력