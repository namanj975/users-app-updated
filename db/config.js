/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-23 18:20:53 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-01-16 23:02:10
 */
exports.dbConfig = {
    host : '127.0.0.1',
    port : '27017',
    name : 'usersDb',
    dbOptions : {
        appName : "users_app_updated",
        logger: console.log,
        loggerLevel: 'info',
        monitorCommands:true 
    }
};
