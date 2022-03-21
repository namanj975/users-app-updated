/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-28 18:36:00 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-03-11 19:22:16
 */

import User from './db/schema/users';
import Role from './db/schema/role';
import {default as records , users} from './records.js';
let startInitalProcess;

/**
 * @param  (number) roleCount
 * @description  This method is used for inserting the roles document in db if required on the basis of count of documents previously present in the db.
 * @programmers: Naman <namanj975@gmail.com> 
 */
let insertUserRolesIfRequired = (roleCount) => new Promise((resolve,reject) => {
    if(roleCount) {
        console.log("Already present userRoles in Db so no need to insert user roles");
        resolve(true);
    }else {
        try{
            console.log("Now inserting the roles document in the db");
            Role.insertMany(records).then((result)=> {
                console.log("Roles added successfully in db");
                resolve(result);
            });
        }catch(err){
            reject(err);
        }
    }
})

/**
 * @param  (number) usersCount
 * @description  This method is used for inserting the user document in db if required on the basis of count of documents previously present in the db.
 * @programmers: Naman <namanj975@gmail.com> 
 */
let insertUsersIfRequired = (usersCount) => new Promise((resolve,reject) => {
    if(usersCount) {
        console.log("Already present users in Db so no need to insert users");
        resolve(true);
    } else {
        try{
            console.log("Now inserting the users document in the db");
            let allUsers = users.studentUsers.concat(users.adminUsers,users.superAdminUsers);
            User.insertMany(allUsers).then((result)=> {
                console.log("users added successfully in db");
                resolve(result);
            });
        }catch(err){
            reject(err);
        }
    }
})

/**
 * @description  This method is used for performing the initial operations required on server start.
 * @programmers: Naman <namanj975@gmail.com> 
 */
export default startInitalProcess = async () =>{
    try {
        let usersCount = await User.count();
        let roleCount = await Role.count();
        await insertUserRolesIfRequired(roleCount);
        await insertUsersIfRequired(usersCount);
    } catch(err){
        console.error("Error while executing the initial process",err);
    }
}

