// 배열 선언 
let arr = ['a', 'b', 'c', 'd'];

// 배열 읽기
console.log('Read Array');
console.log(arr[0]);
console.log(arr[3]);
console.log(arr[arr.length-1]);

// 배열 수정
console.log('Update Array');
arr[2] = 'C';
console.log(arr);

// 배열에 값 추가 
console.log('Add Array');
arr.push('E');
console.log(arr);

// 배열에서 값 제거 
console.log('Delete Array');
arr.pop(); // 맨 마지막 값을 제거 
console.log(arr);
delete arr[1]; // 특정 인덱스의 값 제거, undefind로 대체  
console.log(arr); 

console.log('for loop - array');
for (let i=0; i < arr.length; i++) {
    console.log(arr[i]);
}

console.log('while loop - array');
let i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++;
}

// 배열을 활용해 합계 구하기 
let nums = [1, 2, 3, 4, 5];
let j = 0;
let total = 0;
while (j < nums.length) {
    total += nums[j];
    j++;
}
console.log(total);