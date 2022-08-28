const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const uri = "mongodb+srv://test:test@cluster0.n9meeyd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, connectionParams)
.then(()=>{
    console.log(`Connected to MongoDB`);
}).catch(err=>{
    console.log(`Error is: ${err}`);
})

const userRoutes = require('./routes/Users');
app.use('/users', userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});