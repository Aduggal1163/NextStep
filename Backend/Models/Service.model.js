import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum: ['decor', 'makeup', 'food', 'photography', 'music', 'transport', 'lighting', 'other'],
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    }
},{timestamps: true});

export const Service = mongoose.model('Service', serviceSchema);
export default Service;