const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
}

const uri = "mongodb+srv://test:test@cluster0.xjmgd07.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, connectionParams)

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})