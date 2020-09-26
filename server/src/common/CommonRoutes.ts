import express from 'express';
import commonController from './controller/Controller';
import hash from  './middleware/bcrypt';
const commonRouter = express.Router();

/**
 * Declare all routes, related to AdminController
 */

commonRouter.post('/login',hash.compareHash,commonController.login);
commonRouter.post("/register",hash.generateHash,commonController.register);
export default commonRouter;
