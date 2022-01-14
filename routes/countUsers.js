/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-30 01:38:28 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-01-05 22:54:51
 */

import User from '../db/schema/users';
import Role from '../db/schema/role';
import mongoose from 'mongoose';

/**
 * @param  [] allUsersByRoleCount
 * @param  [] roles
 * @description  This method is used to filter users count on the basis of their role.
 * @programmers: Naman <namanj975@gmail.com> 
 */
 const getUsersFilteredCount = (allUsersByRoleCount, roles) => new Promise((resolve, reject) => {
    let usersCountDoc = {};
    allUsersByRoleCount.forEach((userCount) => {
        roles.forEach((role) => {
            if(role.role_id.toString() == userCount._id)
            usersCountDoc[role.name] = userCount.roleCount 
        })
    })
    resolve(usersCountDoc);
});

/**
 * @param  '' userRoleId
 * @description  This method is used for checking whether the user is authorised or not.
 * @programmers: Naman <namanj975@gmail.com> 
 */
 const verifyUserRole = (userRoleId) => new Promise(async (resolve,reject) =>{
    let userRole = await Role.findOne({role_id : mongoose.Types.ObjectId(userRoleId)}).select("name");
    if(userRole.name === 'student'){
        reject(`${userRole.name} is not authorised`);
    }else{
        console.log("User is authorised");
        resolve();
    }
});

/**
 * @param  {} req
 * @param  {} res
 * @description  This method is used to count the users on the basis of role.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const countUsers = async (req,res) =>{
    try {
        await verifyUserRole(req.userRoleId);
        let roles = await Role.find({}).select("name role_id");
        let allUsersByRoleCount = await User.aggregate([{ $group: { _id: '$role_id', roleCount: { $sum : 1 }}}]);
        let usersCount = await getUsersFilteredCount(allUsersByRoleCount,roles);
        console.log("all users count", allUsersByRoleCount)

        return res.json({success: true, data: usersCount})
    }catch (err){
        res.sendStatus(403);
        console.log("getting error while counting the users...",err);
    }
}

export default countUsers;