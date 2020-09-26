import express from 'express';
import adminUser from './AdminController';
const adminRouter = express.Router();

/**
 * Declare all routes, related to AdminController
 */

//GET requests
adminRouter.get('/', adminUser.getAll);

//POST requests
//adminRouter.post('/add',common.addUser);
adminRouter.post("/getUserById", adminUser.getUserById);

export default adminRouter;
