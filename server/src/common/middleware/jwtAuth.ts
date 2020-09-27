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

const authAdmin =  async (req: Request, res: Response, next: NextFunction) => {
   let token: string | undefined = req.headers.authorization;

   if (typeof token === 'undefined') {
       res.status(403);
       res.json({ msg: "Failed to Authenticate" });
       return;
   }
   
   token = token.split(' ')[1];

   jwt.verify(token, config.ACCESS_TOKEN_SECRET,(err:any, user:any) => {
       if (err || user == undefined || user.type !== 'admin') {
           console.log(err);
           res.status(403);
           res.json({ msg: "Failed to Authenticate" });
           return;
       }
       next();
   });

}
const authManager =  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers.authorization;
 
    if (typeof token === 'undefined') {
        res.status(403);
        res.json({ msg: "Failed to Authenticate" });
        return;
    }
    
    token = token.split(' ')[1];
 
    jwt.verify(token, config.ACCESS_TOKEN_SECRET,(err:any, user:any) => {
        if (err || user == undefined || user.type !== 'manager') {
            console.log(err);
            res.status(403);
            res.json({ msg: "Failed to Authenticate" });
            return;
        }
        next();
    });
 
 }
export default {
    sign,
    authAdmin,
    authManager
}