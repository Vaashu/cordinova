import { Request,Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import { ResponseBase } from '../utils/httpType';


const sign = (payload:any) => {
    return new Promise((resolve, reject)=>{
       let token = jwt.sign(payload,config.ACCESS_TOKEN_SECRET);
       if(token){
          let data = {ACCESS_TOKEN:token};
          resolve(data);
       }else{
          reject(true);
       } 
    });   
}

const authUser = (req:Request,res:Response,next:NextFunction) =>{
   let token:any = req.get('authorization');
   if(token){
      jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err:any, user:any) => {
         if(err){
               let httpRes:ResponseBase = { success: false, message: err.message, errors:err.name, statusCode: 401 };
               res.json(httpRes);
         }else{
               next();
         }
      })
   }else{
      let httpRes:ResponseBase = { success: false, message: "Falied to authentication user!", errors:"invalid token!", statusCode: 401 };
      res.json(httpRes);
   }
}

export default {
    sign,
    authUser
}