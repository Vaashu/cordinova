import express from 'express';
import adminController from './AdminController';
import Controller from '../common/controller/Controller';
import  JWT from '../common/middleware/jwtAuth';
const adminRouter = express.Router();

/**
 * Declare all routes, related to AdminController
 */
adminRouter.use(JWT.authAdmin);

adminRouter.post("/add-product",adminController.addProduct);


export default adminRouter;
