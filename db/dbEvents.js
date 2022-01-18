import mongooseOrm  from 'mongoose';
import config from './config'

mongooseOrm.connection.on('connecting', result => {
    return console.log(`connecting to the mongodb on host ${config.dbConfig.host} and port ${config.dbConfig.port}`);
});

mongooseOrm.connection.on('connected', result => {
    return console.log(`successfully connected to the mongodb on host ${config.dbConfig.host} and port ${config.dbConfig.port}`);
});

mongooseOrm.connection.on('open', result => {
    return console.log(`successfully connected to the mongo db server and now open for queries`);
});

mongooseOrm.connection.on('disconnecting', result => {
    return console.log(`disconnecting from the mongodb server on host ${config.dbConfig.host} and port ${config.dbConfig.port}`);
});

mongooseOrm.connection.on('disconnecting', result => {
    return console.log(`disconnecting from the mongodb server on host ${config.dbConfig.host} and port ${config.dbConfig.port}`);
});

mongooseOrm.connection.on('disconnected', result => {
    return console.log(`disconnected from the mongodb server on host ${config.dbConfig.host} and port ${config.dbConfig.port}`);
});

mongooseOrm.connection.on('close', result => {
    return console.log(`connection has been successfully closed with the mongodb server on host ${config.dbConfig.host} and port ${config.dbConfig.port}`);
});

mongooseOrm.connection.on('reconnected', result => {
    return console.log(`successfully reconnected to the mongodb server on host ${config.dbConfig.host} and port ${config.dbConfig.port}`);
});

mongooseOrm.connection.on('error', err => {
    return console.log(`Getting the error while connecting to the mongodb server on host ${config.dbConfig.host} and port ${config.dbConfig.port}`,new Error(err));
});

export default mongooseOrm;