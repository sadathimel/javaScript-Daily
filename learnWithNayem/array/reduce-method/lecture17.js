function createPromise(id){
    const randTime = Math.floor(Math.random() *2000 + 100);

    return new Promise((resolve)=>{
        setTimeout(()=> {
            console.log(`Processing ${id} - Time ${randTime}`)
        }, randTime);
    })
}

const ids = [1,2,3,4,5]
// ids.forEach((v)=>{
//     createPromise(v);
// })

const result = ids.reduce((acc,cur)=> {
    return acc.then(()=> {
        return createPromise(cur);
    })
},Promise.resolve())

result.then(()=>{
    console.log('Done!!!');
})