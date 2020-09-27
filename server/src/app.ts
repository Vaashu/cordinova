import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import adminRouter from './admin/AdminRoutes';
import managerRouter from './manager/ManagerRoutes';
import commonRouter from './common/CommonRoutes';
import helmet from "helmet";
const mongoUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/pos";
mongoose.set('useCreateIndex', true);  //collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.connect(mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("connected", () => {
   console.log(`MongoDb connected on cloud! ${mongoUrl}`);
});

//on connection error
mongoose.connection.on("error", (err:any) => {
    console.log(err);
});
const app = express();
//middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(helmet());

app.use('/api/auth',commonRouter);
app.use('/api/admin', adminRouter); 
app.use('/api/manager', managerRouter);  
export default app;