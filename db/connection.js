/*
 * @Author: naman jain (namanj975@gmail.com)
 * @Date: 2021-12-23 18:25:43 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-01-12 01:43:14
 */

const { dbConfig } = require('./config');
const mongoose = require('mongoose');
const connectUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;


/**
 * @description  This method is used for establishing a connection to database through Mongoose.
 * @programmers: Naman <namanj975@gmail.com> 
 */
async function connectDb() {
    try{
        await mongoose.connect(connectUrl);
        return {success: true , msg : "successfully connected to the database"};
    }catch(err){
        console.log("error while connection to data base", err);
        throw new Error(err);
    }
};


module.exports = {connectDb};

