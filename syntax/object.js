let members = ['a', 'b', 'c'];
console.log(members[1]);

let i = 0;
while (i < members.length){
    console.log(members[i]);
    i++;
}

for (let item of members) {
    console.log(item);
}

let roles = {
    'back-end': 'heyrin',
    'front-end': 'rin',
    'pm': 'ggg'
}
console.log(roles['back-end']);

for (let key in roles) {
    console.log('key: ', key, '|', 'val: ', roles[key]);
}