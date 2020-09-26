import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { Users } from '../model/UserModel';
import { promise } from './promiseHandler';
import { ResponseBase } from '../utils/httpType';
let err:any;
let data:any;
const saltRounds = 10; 

const generateHash =  async (req:Request, res:Response,next:NextFunction) => {
          [err,data] =  await promise(Users.find({username:req.body.username}).lean());
          console.log(req.body.password);
          if(data.length > 0){
               let httpRes:ResponseBase = { success: false, message: "Username already taken!", errors:err, statusCode: 206 };
               res.json(httpRes);
          }else{
               req.body.password = await bcrypt.hash(req.body.password, saltRounds);
               next();
          }
}

const compareHash = async (req:Request, res:Response,next:NextFunction) => {
          [err,data] =  await promise(Users.find({username:req.body.username}).lean());
          if(err){
               let httpRes:ResponseBase = { success: false, message: "mongodb error!", errors:err, statusCode: 206 };
               res.json(httpRes);
          }else if(data.length){
               bcrypt.compare(req.body.password, data[0]['password'], (err, result)=> {
                    if(result){
                         req.body.userObj = data[0];
                         next();
                    }else{
                         let httpRes:ResponseBase = { success: false, message: "Invalid credentials!", errors:err, statusCode: 206 };
                         res.json(httpRes);
                    }
               });
          }else{
               let httpRes:ResponseBase = { success: false, message: "Invalid credentials!", errors:err, statusCode: 206 };
               res.json(httpRes);
          }
}

export default {
     generateHash,
     compareHash
}