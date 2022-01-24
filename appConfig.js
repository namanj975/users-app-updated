/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-28 18:35:54 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-01-24 22:43:26
 */

let config;
export default config = {
    password: {
        student: "student@123",
        admin: "admin@123",
        superAdmin: "superAdmin@123"
    },
    secretKey: "biz2credit@123",
    port: 3000,
    jwt: {
        expireTime: '1800s'
    },
    loggerColor: {
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red',
        custom: ['red', 'underline']
    }
}