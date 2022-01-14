/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-29 20:37:46 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-01-05 22:39:58
 */
import User from '../db/schema/users';
import Role from '../db/schema/role';
import mongoose from 'mongoose';
/**
 * @param  [] allUsers 
 * @param  [] allRoles
 * @description  This method is used to filtering the users on the basis of their role and assigning new properties on th user document.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const filterUsers = (allUsers, allRoles) => new Promise((resolve, reject) => {
    let filteredUsers = [];
    allUsers.forEach((user) => {
        let newUser = {};
        newUser.firstName = user.first_name ? user.first_name : '';
        newUser.lastName = user.last_name ? user.last_name : '';
        newUser.registeredAt = user.created_at;
        newUser.role = allRoles.filter((role) => {
            return role.role_id.toString() == user.role_id;
        })[0].name;
        filteredUsers[filteredUsers.length] = newUser;
    });
    resolve(filteredUsers);
});

/**
 * @param  [] allUsers
 * @param  '' role
 * @description  This method is used to filtering users on the basis of their role.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const filterUsersByRole = (allUsers, role) => new Promise((resolve, reject) => {
    let filteredUsers = [];
    allUsers.forEach((user) => {
        let newUser = {};
        newUser.firstName = user.first_name ? user.first_name : '';
        newUser.lastName = user.last_name ? user.last_name : '';
        newUser.registeredAt = user.created_at;
        newUser.role = role;
        filteredUsers[filteredUsers.length] = newUser;
    });
    resolve(filteredUsers);
});

/**
 * @param  '' userRoleId
 * @description  This method is used for checking whether the user is authorised or not.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const verifyUserRole = (userRoleId) => new Promise(async (resolve, reject) => {
    let userRole = await Role.findOne({ role_id: mongoose.Types.ObjectId(userRoleId) }).select("name");
    if (userRole.name === 'student') {
        reject(`${userRole.name} is not authorised`);
    } else {
        console.log("User is authorised");
        resolve();
    }
});

/**
 * @param  {} req
 * @param  {} res
 * @description  This method is used for performing operations for listing users.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const listUsers = async (req, res) => {
    try {
        await verifyUserRole(req.userRoleId);
        if (req.query && req.query.role) {
            let requiredUserResult = await Role.aggregate([{ $match: { name: req.query.role } }]).addFields({ roleIdstr: { $convert: { input: "$role_id", to: "string" } } }).lookup({ from: 'users', localField: 'roleIdstr', foreignField: 'role_id', as: 'users' });
            if (requiredUserResult.length) {
                let filteredUsersByRole = await filterUsersByRole(requiredUserResult[0].users, req.query.role);
                return res.json({ success: true, data: { users: filteredUsersByRole } });
            } 
            else return res.status(404).json({ success: false, data: { msg:"No records found for role " + req.query.role} });
        } else {
            let allRoles = await Role.find({}).select("name role_id");
            let allUsers = await User.find({});
            let fiteredUsers = await filterUsers(allUsers, allRoles);
            console.log("all users and all roles", allRoles, allUsers);
            return res.json({ success: true, data: { users: fiteredUsers } });
        }
    } catch (err) {
        res.sendStatus(403);
        console.log("getting error while listing the users...", err);
    }
}

export default listUsers;