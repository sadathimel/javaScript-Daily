const express = require('express');

const app = express();

app.get('/about', (req, res)=>{
    res.send('I am A About Page');
})


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is Running on PORT ${PORT}`); 
})