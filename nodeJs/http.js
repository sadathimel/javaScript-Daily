const http = require('http'); 

const server = http.createServer((req,res)=>{
    console.log(req.url);
    res.end('<h1>Hello NodeJs</h1>');
})
console.log(http)

server.listen(4040,()=>{
    console.log('Server in running port 4040');
})