let arr = [1, 2, 3, 4];

// FlatMap 

const map = arr.map((x)=>[x*2]).flat();
// console.log(map)

const flatMap = arr.flatMap((x)=>[x*2]);
// console.log(flatMap);

const flatMap1 = arr.flatMap((x) => [x, x*2]);
// console.log(flatMap1);


const reducedFlatMap = arr.reduce((acc,cur)=>{
    return acc.concat(cur*2);
},[])
console.log(reducedFlatMap);

const reducedFlatMap1 = arr.reduce((acc, cur) => {
  return acc.concat([cur,cur * 2]);
}, []);
console.log(reducedFlatMap1);