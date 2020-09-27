import * as mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
	name: string
	price: number
	category: string
};

export const productSchema = new mongoose.Schema({
	name : {  type: String,required: true, trim: true },
	price : {  type: Number,required: true},
	category: { type: String, required: true } 
}, {
    timestamps: true
});

export const Product = mongoose.model<IProduct>("products", productSchema, "products");