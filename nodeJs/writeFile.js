const fs = require('fs');

const testObj = {
    name: 'John',
    age: 30,
    email:'john@gmail.com',
    address: {
        city: 'New York',
        country: 'USA'
    }

}

const data = JSON.stringify(testObj);
fs.writeFile('test.json', data, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('File is successfully');
    }
})