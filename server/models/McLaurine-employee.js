/*
    ==================
    Title: mclaurine-composer.js, 
    Author: Trevor McLaurine
    Date: 6/17/2023
    Description: Initializes the composer schema
*/

const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    "name": {
        type: String
    }, 
    "date": {
        type: String
    }, 
    "importance": {
        type: String
    }
})

//initializes the composer Schema
const composerSchema = new mongoose.Schema({
    "name":
    { 
        type: String, 
    },
    "id": 
    {
        type: String, 
        
    }, 
    "position:": {
        type: String
    }, 
    "tasks": {
        type: [tasksSchema]
    }
});

//exports the schema 
module.exports = mongoose.model('Employee', employeeSchema);