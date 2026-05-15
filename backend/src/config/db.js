const express = require("express");
const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://0.0.0.0/practiceChallenge")
        console.log("MongoDB connected...")
    } catch (error) {
        console.log("error in connecting db-", error);
    }
}
module.exports = connectDB;