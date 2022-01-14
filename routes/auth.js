/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-30 22:03:57 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-01-05 13:47:30
 */
import jwt from 'jsonwebtoken';

/**
 * @param  {} req
 * @param  {} res
 * @param next(callback)
 * @description  This method is used for authenticating the user by token.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const validateToken = (req, res, next) => {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET_KEY , (err, userRoleId) => {
        console.log("result in jwt -->",err,userRoleId);
        if (err) return res.sendStatus(403)
        req.userRoleId = userRoleId;
        next()
    })
}

export default validateToken;