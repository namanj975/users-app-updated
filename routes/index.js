/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-29 20:37:55 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-02-04 23:15:02
 */
import express from "express"
import listUsers from './listUsers';
import countUsers from './countUsers';
import userLogin from './userLogin';
import bodyParser from 'body-parser';
import verifyToken from './auth'
import dotenv from 'dotenv';
import colors from 'colors';
import { body } from 'express-validator';


let jsonParser = bodyParser.json()
let router = express.Router();
dotenv.config();

console.log("process env", process.env.PORT);
router.use(function timeLog(req, res, next) {
    console.log("hello from app routes");
    console.log('Time: ', Date.now());
    next()
})

router.get('/users', verifyToken, function (req, res) {
    listUsers(req, res);
})

router.get('/users/role/count', verifyToken, function (req, res) {
    countUsers(req, res);
})

router.post('/login', jsonParser, body('email').isEmail().withMessage('Kindly provide the valid mail address!'), body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 chars long').matches(/\d/)
    .withMessage('Password must contain a number')
    , function (req, res) {
        console.log("here request", req.body);
        userLogin(req, res);
    })

router.get('/server/logsColor', function (req, res) {
    if (req.query && req.query.status) {
        switch (req.query.status) {
            case 'enable':
                colors.enable();
                res.send({ success: true, data: { msg: "Successfully enabled logger colors on server" } });
                console.log(colors.info("Successfully enabled logger color on server through API"));
                break;
            case 'disable':
                colors.disable();
                res.send({ success: true, data: { msg: "Successfully disabled logger colors on server" } });
                console.log(colors.info("Successfully disabled logger color on server through API"));
                break;
            default:
                res.sendStatus(400);
                break;
        }
    } else {
        return res.sendStatus(400)
    }
})
export default router