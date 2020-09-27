import { Request, Response } from 'express';
import { Product } from "../admin/ProductModel";
import { ResponseBase } from '../common/utils/httpType';
import { promise } from '../common/middleware/promiseHandler';
let err:any;
let data:any;
const getProduct = async(req: Request, res: Response,)=>{
    [err,data] =  await promise(Product.find({}).lean());
    if(err){
        let httpRes:ResponseBase = { success: false, message: "Falied to fetch product", errors:err, statusCode: 206 };
        res.json(httpRes);
    }else{
        let httpRes:ResponseBase = { success: true, message: "Product fetched successfully", response:data, statusCode: 200 };
        res.json(httpRes);
    }
}

export default {
  getProduct
}