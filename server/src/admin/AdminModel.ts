import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
	email: string
	name: string
	password: string
	status: number
};

export const userSchema = new mongoose.Schema({
	email : {  type: String,required: true, unique: true, trim: true },
	name : {  type: String, required: true, unique: false, trim: true, minlength: 6 },
	password : { type: String, required: true },
	status: {  type: String, required: true, unique: false, default: 1 }
}, {
    timestamps: true
});

export const Users = mongoose.model<IUser>("admin", userSchema, "admin");