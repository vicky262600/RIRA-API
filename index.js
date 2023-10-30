const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("db connection successful"))
    .catch((err)=>{console.log(err);
});

app.listen(5000, () =>{
    console.log("backend server is ready")
})