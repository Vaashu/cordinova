import * as mongoose from 'mongoose';
export interface IService extends mongoose.Document {
	name: string
	enabled: boolean
    order: number
    parent: string
};

export const categorySchema = new mongoose.Schema({
        name: { type: String,required: false,unique: false, trim: true },
        enabled: { type: Boolean, required: false, default: false },
        order: { type: Number },
        parent: { type: String, ref: "categories", default: null }
     }, {
        timestamps: true
});

categorySchema.virtual('children',{
    ref: 'categories',      // the model to use
    localField: '_id',      // find children where 'localField' 
    foreignField: 'parent', // is equal to foreignField
    justOne: false,
    options: { sort: { order: 1 }}
});

categorySchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'category',
    justOne: false,
    options: { sort: { order: 1 }}
  });

export const Service = mongoose.model<IService>("categories", categorySchema, "categories");

