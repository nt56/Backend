const { default: mongoose } = require("mongoose");
const express = require("mongoose");

require("dotenv").config();

exports.connect = () => {

    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log("DB Connected Successfully")
    })
    .catch((err) => {
        console.log("DB Connection Isssue");
        console.error(err);
        process.exit(1);
    });

}