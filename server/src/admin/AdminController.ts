import { Request, Response } from 'express';
import { Users } from "./AdminModel";
import { ResponseBase } from '../common/utils/httpType';
import { promise } from '../common/middleware/promiseHandler';
import { Service } from './CategoryModel';

let err:any;
let data:any;
const getAll = async (req: Request, res: Response) => {
    [err,data] =  await promise(Users.find());
    if(err){
        let httpRes:ResponseBase = { success: false, message: "Falied to get all user", errors:err, statusCode: 206 };
        res.json(httpRes);
    }
    let httpRes:ResponseBase = { success: true, message: "User Found successfully", response:data, statusCode: 200 };
    res.json(httpRes);
}

const getUserById = async (req: Request, res: Response) => {
    [err,data] =  await promise(Users.findById(req.body._id));
    if(err){
        let httpRes:ResponseBase = { success: false, message: "Falied to get user", errors:err, statusCode: 206 };
        res.json(httpRes);
    }
    let httpRes:ResponseBase = { success: true, message: "User Found successfully", response:data, statusCode: 200 };
    res.json(httpRes);
}

const addUser = async (req: Request, res: Response) => {
    const userInstence = new Users(req.body);
    [err,data] =  await promise(userInstence.save());
    if(err){
      let httpRes:ResponseBase = { success: false, message: "Falied to add user", errors:err, statusCode: 206 };
      res.json(httpRes);
    }
    let httpRes:ResponseBase = { success: true, message: "User Added successfully", response:data, statusCode: 200 };
    res.json(httpRes);
}

const addNewService = async (req: Request, res: Response) => {
    const serviceInstence = new Service(req.body);
    [err,data] =  await promise(serviceInstence.save());
    if(err){
      let httpRes:ResponseBase = { success: false, message: "Falied to add service", errors:err, statusCode: 206 };
      res.json(httpRes);
    }
    let httpRes:ResponseBase = { success: true, message: "Service Added successfully", response:data, statusCode: 200 };
    res.json(httpRes);
}

export default {
    getAll,
    getUserById,
    addUser,
    addNewService
}