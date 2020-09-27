import { Request, Response } from 'express';
import { Product } from "./ProductModel";
import { ResponseBase } from '../common/utils/httpType';
import { promise } from '../common/middleware/promiseHandler';

let err:any;
let data:any;

const addProduct = async(req: Request, res: Response,)=>{
    const userInstence = new Product(req.body);
    [err,data] =  await promise(userInstence.save());
    if(err){
        let httpRes:ResponseBase = { success: false, message: "Falied to add product", errors:err, statusCode: 206 };
        res.json(httpRes);
    }else{
        let httpRes:ResponseBase = { success: true, message: "Product Added successfully", response:data["_id"], statusCode: 200 };
        res.json(httpRes);
    }
}

export default {
    addProduct
}