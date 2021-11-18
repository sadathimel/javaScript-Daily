const arr = [
    [1,2],
    [3,4],
    [5,6],
    [7,8],
];

const result = arr.reduceRight((acc,cur)=>{
    return acc.concat(cur)
},[]);

console.log(result);

const nums = [1,2,3,4];

const sum = nums.reduceRight((acc,cru)=>{
    console.log(`Acc [${acc}] - Cur [${cru}]`)
    return acc + cru
},0);
console.log(sum);