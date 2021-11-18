const votes = [
  "c++",
  "java",
  "javaScript",
  "c",
  "R",
  "java",
  "python",
  "javaScript",
];

const result = votes.reduce((acc,cur)=> {
    if(acc[cur]){
        acc[cur]++;
    }else{
        acc[cur] = 1;
    }
    return acc;
},{});

console.log(result);
