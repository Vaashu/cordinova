import * as mongoose from 'mongoose';
const typeOps = ["admin", "manager"];

export interface IUser extends mongoose.Document {
    username:string
    password:string
    type:string
};

export const userSchema = new mongoose.Schema({
    username : {  type: String, trim: true, minlength: 6, required:true},
    password: {  type: String,trim: true, required:true },
    type : { type : String, enum: typeOps,required:true }
}, {
    timestamps: true
});

export const Users = mongoose.model<IUser>("users", userSchema, "users");

 