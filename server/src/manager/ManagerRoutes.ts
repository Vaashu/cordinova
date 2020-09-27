import express from 'express';
const managerRouter = express.Router();
import  JWT from '../common/middleware/jwtAuth';
import managerController from './ManagerController';


managerRouter.use(JWT.authManager);

managerRouter.get("/get-product",managerController.getProduct);
export default managerRouter;