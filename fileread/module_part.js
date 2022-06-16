let M = {
    v: 'v',
    f () {
        console.log(this.v);
    }
}
// 약속! 
// module.export = M;
export default M;