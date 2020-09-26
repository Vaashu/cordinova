import { Request, Response, NextFunction } from 'express';
import { ResponseBase } from '../utils/httpType';
import { promise } from '../middleware/promiseHandler';
import  JWT from '../middleware/jwtAuth';
import { Users } from '../model/UserModel';
let err:any;
let data:any;

/**
 * user login api
 * @param req 
 * @param res 
 */
const login = async (req:Request,res:Response) => {
    [err,data] =  await promise(JWT.sign(req.body.userObj));
    if(err){
        let httpRes:ResponseBase = { success: false, message: "jwt token not generated", errors:err, statusCode: 206 };
        res.json(httpRes);
    }else{
        let httpRes:ResponseBase = { success: true, message: "login successfully", response:{...data,...{'role':req.body.userObj.type}}, statusCode: 200 };
        res.json(httpRes);
    }
} 

/**
 * register user api
 * @param req  
 * @param res 
 */
const register = async (req:Request, res:Response) =>{
    const userInstence = new Users(req.body);
    [err,data] =  await promise(userInstence.save());
    if(err){
        let httpRes:ResponseBase = { success: false, message: "Falied to add user", errors:err, statusCode: 206 };
        res.json(httpRes);
    }else{
        let httpRes:ResponseBase = { success: true, message: "User Added successfully", response:data["_id"], statusCode: 200 };
        res.json(httpRes);
    }
}

export default {
    login,
    register
}